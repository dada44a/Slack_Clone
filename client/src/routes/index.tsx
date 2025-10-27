import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton mode='modal'/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
