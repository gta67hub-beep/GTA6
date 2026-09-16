import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { API_BASE_URL } from "../constants";

export function useUserSync() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      syncUser(user);
    }
  }, [isSignedIn, user]);
}

async function syncUser(user: {
  id: string;
  emailAddressAddresses?: Array<{ emailAddress: string }>;
  username?: string | null;
  imageUrl?: string | null;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clerkId: user.id,
        email: user.emailAddressAddresses?.[0]?.emailAddress || "",
        username: user.username,
        imageUrl: user.imageUrl,
      }),
    });

    if (!response.ok) {
      console.error("Failed to sync user");
    }
  } catch (error) {
    console.error("Error syncing user:", error);
  }
}
