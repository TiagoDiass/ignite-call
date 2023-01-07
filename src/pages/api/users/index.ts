// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const payload = req.body;

  const createdUser = await prisma.user.create({
    data: {
      name: payload.name,
      username: payload.username,
    },
  });

  return res.status(201).json(createdUser);
}
