import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { User as NextAuthuser, Account, Profile } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: NextAuthuser; account: Account | null; profile?: Profile }) {
      await dbConnect();

      const existingUser = await User.findOne({ github_id: user.id });

      try {
        if (!existingUser) {
          await User.create({
            github_id: user.id,
            github_username: user.name || '',
            wallet_address: '', 
            pending_amount: '0',
            locked_amount: '0',
          });
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
      
      return true;
    },
    
    async jwt({ token, account, profile }: { token: any; account: Account | null; profile?: Profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      if (profile) {
        token.profile = profile;
      }
      return token; 
    },

    async session({session, token} : {session: any; token: any}){
      session.accessToken = token.accessToken;
      session.user.profile = token.profile;
      return session;
    },
    
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
