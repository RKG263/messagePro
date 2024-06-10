import { resend } from "@/lib/resend";
import VerificationEmail from './../../emails/VerificationEmail';
import { ApiResponse } from "@/types/ApiResponse";
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
  const resp=  await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'thisisrkg@gmail.com',
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
   console.log( resp);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}