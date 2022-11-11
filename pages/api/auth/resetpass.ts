// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import { hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
//
//
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    if (!req.body.email) {
      try {
        let generador = ''
        const characters =
          '0123456789abcdfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.?,;-_!*%&$/(){}|@><'
        for (let i = 0; i < 8; i++) {
          const aleatorio = Math.floor(Math.random() * characters.length)
          generador += characters.charAt(aleatorio)
        }
        //// STRING A ENVIAR POR EMAIL ""PASSWORD"" ////
        const newPass = `Mdg84${generador}*`
        /////////////////////////////////////////////////
        // escriba su codigo aca ivo
        //
        //
        //
        //
        ////////////////////////////////////////////////
        const passHash = await hash(newPass, 5)
        await prisma.user.update({
          where: {
            email: req.body.email,
          },
          data: {
            passwordHash: passHash,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
