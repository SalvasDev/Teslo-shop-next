
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "@/database";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email:', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },

      },
      async authorize(credentials) {
        console.log({ credentials });
        // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

        //TODO: Validar contra base de datos
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  //Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },


  //Callbacks

  jwt: {

  },

  session: {
    maxAge: 2592000,///30d
    strategy: 'jwt',
    updateAge: 86400,//Cada día
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // console.log(token, account, user);

      if (account) {
        token.accesToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            //TODO: crear o verificar si existe usuario en mi DB
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log({ session, token, user });

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  }

}

export default NextAuth(authOptions)
