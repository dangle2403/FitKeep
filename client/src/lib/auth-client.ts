import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  fetchOptions: {
    credentials: "include", // Include cookies for session validation
  },
});

export const { signUp, signIn, signOut, getSession, useSession } = authClient;
