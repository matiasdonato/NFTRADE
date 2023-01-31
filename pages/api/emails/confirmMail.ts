import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
export default async function emailVerification(
  req: NextApiRequest,
  res: NextApiResponse,
  mail: string,
  code: string,
  name: string,
) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'nftrade2022@gmail.com',
      pass: 'brrlzontwvkikdzr',
    },
  })
  const mailOptions = {
    from: 'NFTrade',
    to: mail as string,
    subject: 'Confirm Mail',
    html: `
    <h1>VERIFICATION CODE: ${code}</h1>
    <div style="width: 100%; text-align: center;"> 
      <h2>Hello ${name}:</h2>
      <h3>Please verify your account with this code: ${code}</h3>
    </div>
    `,
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err.message)
    } else {
      console.info('Passed. Email sent.' + info)
    }
  })
}
