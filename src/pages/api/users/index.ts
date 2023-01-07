import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const payload = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  if (userExists) {
    return res.status(400).json({
      message: 'Username already taken',
    });
  }

  const createdUser = await prisma.user.create({
    data: {
      name: payload.name,
      username: payload.username,
    },
  });

  const SEVEN_DAYS = 60 * 60 * 24 * 7;

  setCookie(
    {
      res,
    },
    '@ignitecall:userId',
    createdUser.id,
    {
      maxAge: SEVEN_DAYS,
      path: '/',
    }
  );

  return res.status(201).json(createdUser);
}
