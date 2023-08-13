import { mailer } from '@/serviceProvider/utils/nodemailer'

export const sendVerificationMail = async (mail: any) => {
  mailer
    .sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    })
    .then((response) => {
      console.log('email sent successfully', response)
    })
    .catch((err) => {
      console.log('Error in sending email: ' + err)
    })
}
