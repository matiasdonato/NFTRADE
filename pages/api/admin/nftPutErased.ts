import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateNft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { id, boolean, collectionId } = req.body

      if (collectionId) {
        const nft = await prisma.nft.update({
          where: {
            id: id?.toString(),
          },
          data: {
            erased: boolean,
          },
        })
        const oldCollection = await prisma.collection.findUniqueOrThrow({
          where: {
            id: collectionId as string,
          },
          include: {
            nfts: true,
          },
        })

        const newCollection = await prisma.collection.update({
          where: {
            id: collectionId as string,
          },
          data: {
            nfts: {
              disconnect: {
                id: id as string,
              },
            },
            price: Math.round(
              oldCollection.price -
                nft.price * (1 - oldCollection.discount / 100),
            ),
          },
        })
        const msg = {
          text: 'The NFT was successfully updated.',
          data: nft,
        }
        res.status(205).json(msg)
      } else {
        const nft = await prisma.nft.update({
          where: {
            id: id?.toString(),
          },
          data: {
            erased: boolean,
          },
        })
        const msg = {
          text: 'The NFT was successfully updated.',
          data: nft,
        }
        res.status(205).json(msg)
      }
    }
  } catch (e: any) {
    console.log(e.message)
  }
}