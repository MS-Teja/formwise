import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { 
        email: { label: "Email", type: "email" }, 
        password: { label: "Password", type: "password" } 
      },
      async authorize(creds) {
        // Mock claimant — replace with a real check or seeded list later
        if (creds?.email === "judge@formwise.test") {
          return { id: "1", name: "Jane Claimant", email: creds.email as string };
        }
        return null;
      },
    }),
  ],
  pages: { 
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET || "fallback_secret_for_local_dev_only_replace_in_prod",
});
