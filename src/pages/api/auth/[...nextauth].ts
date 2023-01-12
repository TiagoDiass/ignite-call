import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { PrismaAdapter } from '../../../lib/auth/prisma-adapter';

const userEmailScope = 'https://www.googleapis.com/auth/userinfo.email';
const userProfileScope = 'https://www.googleapis.com/auth/userinfo.profile';
const userCalendarScope = 'https://www.googleapis.com/auth/calendar';

export const buildNextAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): AuthOptions => {
  return {
    adapter: PrismaAdapter(req, res),

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
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          };
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
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res));
}
