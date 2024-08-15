import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Extend the Session type to include accessToken
  }
}
