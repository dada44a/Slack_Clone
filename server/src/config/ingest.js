import { Inngest } from "inngest";
import db from "../config/db.js";
import { users } from "../db/schema.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "stack-clone" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "user.created" },
    async ({ event }) => {
        try {
            const { id, email_addresses, first_name, last_name, image_url } = event.data;

            // Normalize timestamps to integers (epoch ms). Adjust as needed for your schema.
            const now = Date.now();

            const newUser = {
                name: `${first_name || ""} ${last_name || ""}`.trim() || "<Name>",
                age: 0,
                email: email_addresses?.[0]?.email_address || "<email@unknown>",
                image: image_url || "",
                clerkId: id,
                createdAt: Math.floor(now / 1000),
                updatedAt: Math.floor(now / 1000),
            };

            await db.insert(users).values(newUser);
            console.log("User synced:", newUser);
        } catch (err) {
            console.error("Failed to sync user:", err);
        }
    }
);

const deleteUser = inngest.createFunction(
    { id: "delete-user" },
    { event: "user.deleted" },
    async ({ event }) => {
        try {
            const { id } = event.data;
            await db.delete(users).where(users.clerkId.eq(id));
            console.log(`Deleted user with clerkId=${id}`);
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    }
);

export const functions = [syncUser, deleteUser];