// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import emailCollection from '../emails/collectionBuy'
/* this endpoint is for testing purposes */
export default async function buyCollection(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { collection, nfts, comprador } = req.body
  try {
    const comp = await prisma.user.findUnique({
      where: {
        id: comprador.id as string,
      },
      select: {
        id: true,
        coins: true,
        name: true,
      },
    })

    await prisma?.collection.update({
      where: {
        id: collection.id as string,
      },
      data: {
        owner: { connect: { id: comprador.id } },
        published: false,
      },
    })

    nfts.forEach(async (el) => {
      try {
        await prisma.nft.update({
          where: {
            id: el.id as string,
          },
          data: {
            owner: { connect: { id: comprador.id } },
            published: false,
          },
        })
      } catch (error) {
        console.log(error)
        return res.status(401)
      }
    })

    const collectionComp = await prisma?.collection.findUniqueOrThrow({
      where: {
        id: collection.id,
      },
      select: {
        id: true,
        name: true,
        owner: true,
        ownerId: true,
      },
    })

    await prisma.user.updateMany({
      where: {
        id: comprador.id,
      },
      data: {
        coins: comp.coins - collection.price,
      },
    })

    const vendedor = await prisma.user.findUnique({
      where: {
        id: collection.owner.id as string,
      },
      select: {
        id: true,
        coins: true,
        name: true,
      },
    })

    await prisma?.user.updateMany({
      where: {
        id: vendedor.id,
      },
      data: {
        coins: vendedor.coins + collection.price,
      },
    })

    await prisma.notify.create({
      data: {
        userId: vendedor.id,
        typeNotify: 'buyNft',
        nftId: collection.id,
        nameNft: collectionComp.name,
        ownerId: collectionComp.owner.id,
        owner: collectionComp.owner.name,
        compradorId: comp.id,
        coins: collection.price,
        nameComprador: comp.name,
        vendedorId: vendedor.id,
        nameVendedor: vendedor.name,
      },
    })
    const date = await prisma?.notify.findMany({
      where: {
        userId: vendedor?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const datebuy = date?.shift()
    emailCollection(
      req,
      res,
      comprador.id,
      collection.id,
      vendedor?.name,
      collection.price,
      datebuy?.createdAt,
      'comprador',
    )
    emailCollection(
      req,
      res,
      vendedor.id,
      collection.id,
      comprador.id,
      collection.price,
      datebuy?.createdAt,
      'vendedor',
    )

    return res.status(200).json({
      msg: 'collection succesfully purchased.',
    })
  } catch (err) {
    console.log(err)
    return res.status(400)
  }
}
