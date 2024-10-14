// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import nodemailer from 'nodemailer'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {params} = context;
    const {email, otp_value} = params;
    const sender_email = context.app.get("sender_email");
    const password = context.app.get("password");
    //console.log(email, otp_value);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: sender_email,
        pass: password
      },
    })

    const mailOptions = {
      from: 'abirbanerjee793@gmail.com', 
      to: email, 
      subject: 'Your OTP Code', 
      text: `Your OTP code is: ${otp_value}`,
      html: `<p>Your OTP code for GC server auth is: ${otp_value}<p>`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
    return context;
  };
};
