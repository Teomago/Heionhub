import axios from 'axios'
import { EmailAdapter, SendEmailOptions } from 'payload'

const brevoAdapter = (): EmailAdapter => {
  const adapter = () => ({
    name: 'Brevo',
    defaultFromAddress: process.env.BREVO_SENDER_EMAIL as string,
    defaultFromName: process.env.BREVO_SENDER_NAME as string,
    sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
      if (process.env.BREVO_EMAILS_ACTIVE !== 'true') {
        console.log('Emails disabled, logging to console')
        console.log(message)
        return
      }
      try {
        const res = await axios({
          method: 'post',
          url: 'https://api.brevo.com/v3/smtp/email',
          headers: {
            'api-key': process.env.BREVO_API_KEY as string,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          data: {
            sender: {
              name: process.env.BREVO_SENDER_NAME as string,
              email: process.env.BREVO_SENDER_EMAIL as string,
            },
            to: [
              {
                email: message.to,
              },
            ],
            subject: message.subject,
            htmlContent: message.html,
          },
        })

        console.log('Email sent successfully')
        return res.data
      } catch (error) {
        console.error('Error sending email with Brevo:', error)
        throw error
      }
    },
  })

  return adapter
}

export default brevoAdapter
