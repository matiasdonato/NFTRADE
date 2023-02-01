import type { NextApiRequest, NextApiResponse } from 'next'
import emailVerification from '../emails/confirmMail'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { mail, code, name } = req.body
  try {
    emailVerification(req, res, mail, code, name)
    return res.status(200).json({
      msg: 'email sended',
    })
  } catch (err) {
    console.log(err)
  }
}
