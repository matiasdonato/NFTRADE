// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import sendMail from '../emails'

export default async function payDescription(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { query } = req
    try {
      if (query.topic === 'payment') {
        const url = `https://api.mercadopago.com/v1/payments/${
          query.id as string
        }`
        const payment = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.ACCES_TOKEN_SELLER}`,
          },
        })
        if (payment.data.status_detail) {
          const arrCoins = payment.data.additional_info.map(
            (el: any) => el.quantity,
          )
          const arrAmount = payment.data.additional_info.items.map(
            (el: any) => el.unit_price,
          )
          const totalCoin = arrCoins.reduce((a: number, b: number) => a + b, 0)
          const totalAmount = arrAmount.reduce(
            (a: number, b: number) => a + b,
            0,
          )

          const data = await prisma.buys.create({
            data: {
              buyId: query.id as string,
              userId: payment.data.additional_info.items[0].id as string,
              date: payment.data.charges_details[0].date_created as string,
              coins: Number(totalCoin),
              status: payment.data.status as string,
              amount: Number(totalAmount),
            },
          })

          await prisma.notify.create({
            data: {
              typeNotify: 'buy',
              ordenId: query.id as string,
              userId: payment.data.additional_info.items[0].id as string,
              coins: Number(totalCoin),
              status: payment.data.status as string,
              amount: Number(totalAmount),
            },
          })

          const userCoins = await prisma.user.findUnique({
            where: {
              id: data.userId as string,
            },
            select: {
              coins: true,
            },
          })
          if (data.status === 'approved') {
            if (!userCoins) {
              res.status(400).send('An user is neccesary')
            } else {
              const totalUserCoins: number =
                data?.coins + Number(userCoins?.coins)
              const user = await prisma.user.update({
                where: {
                  id: data.userId?.toString(),
                },
                data: {
                  coins: totalUserCoins,
                },
              })
              const msg = {
                text: 'The coins were loaded succesfully.',
                data: user,
              }
              sendMail(req, res, query.id as string, 'buy Coins')
              res.status(205).json(msg)
            }
          } else {
            sendMail(req, res, query.id as string, 'buy Rejected')
          }
          res.status(200).send('recived')
        }
        res.status(200).send('recived')
      }
    } catch (error: any) {
      console.log(error.message)
    }
  } else if (req.method === 'GET') {
    const { user } = req.query
    // console.log('🚀 ~ file: index.ts ~ line 71 ~ user', user)

    const notifyBuys = await prisma.buys.findMany({
      where: {
        userId: user?.toString(),
      },
    })
    const notifyCompBuyNfts = await prisma.buyNfts.findMany({
      where: {
        compradorId: user?.toString(),
      },
    })
    const notifyVendBuyNfts = await prisma.buyNfts.findMany({
      where: {
        vendedorId: user?.toString(),
      },
    })

    const commnetUser = await prisma.comment.findMany({
      where: {
        userId: user?.toString(),
      },
      select: {
        nft: {
          select: {
            name: true,
            owner: {
              select: {
                name: true,
              },
            },
          },
        },
        createdAt: true,
        content: true,
      },
    })

    const notify = [
      ...commnetUser,
      ...notifyBuys,
      ...notifyCompBuyNfts,
      ...notifyVendBuyNfts,
    ]

    // const notify = await prisma.notify.findMany({
    //   where: {
    //     userId: user?.toString(),
    //   },
    // })

    notify.sort(
      (a: { createdAt: any }, b: { createdAt: any }) =>
        b.createdAt - a.createdAt,
    )

    res.json({ notify: notify.slice(0, 10), total: notify.length })
  }
}
