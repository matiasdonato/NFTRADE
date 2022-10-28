// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postNft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { creatorId, name, image, description, price } = req.body
    if (!creatorId || !name || !image || !price) {
      res.status(400).send('Faltans datos')
    } else {
      const nfts = await prisma.nft.create({
        data: {
          creatorId,
          ownerId: creatorId,
          name,
          image,
          description,
          price,
          published: true,
        },
      })
      const msg = {
        text: 'Nft creado correctamente!',
        data: nfts,
      }
      res.status(201).json(msg)
    }
  }
}