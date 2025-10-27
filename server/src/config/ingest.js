import { Inngest } from "inngest";
import db from "./db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "stack-clone" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const database = db;
        const { id, email_addresses, first_name, image_url, created_at, updated_at } = event.data;
        const newUser = {
            name: `${first_name} ${last_name}`,
            age: 0,
            email: email_addresses[0]?.email_address || "<Email>",
            image: image_url || "<Image>",
            clerkId: id,
            createdAt: created_at,
            updatedAt: updated_at
        };
        try {
            await database.insert(users).values(newUser);
            console.log("User synced:", newUser);
        } catch (err) {
            console.error("Failed to sync user:", err);
        }

    }
);

const deleteUser = inngest.createFunction(
    { id: "delete-user" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const database = db;
        const { id } = event.data;
        await database.delete(users).where(users.clerkId.eq(id));
    }
);
export const functions = [syncUser, deleteUser];