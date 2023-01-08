import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const userEmailScope = 'https://www.googleapis.com/auth/userinfo.email';
const userProfileScope = 'https://www.googleapis.com/auth/userinfo.profile';
const userCalendarScope = 'https://www.googleapis.com/auth/calendar';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: [userEmailScope, userProfileScope, userCalendarScope].join(
            ' '
          ),
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(userCalendarScope)) {
        return '/register/connect-calendar?error=permissions';
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
