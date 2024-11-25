"use server";
import { signOut } from "@/lib/auth"
 
export default async function SignOutComponent() {
  return (
    <form
      action={async () => {
        await signOut()
      }}
    >
      <button type="submit">signOut with Google</button>
    </form>
  )
} 