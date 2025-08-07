import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendRecoveryEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const resetLink = `http://localhost:8080/api/sessions/reset-password/${token}`;

  await transporter.sendMail({
    from: 'Recuperación de contraseña <no-reply@tuapp.com>',
    to: email,
    subject: 'Restablecer tu contraseña',
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Hacé clic en el siguiente enlace para restablecer tu contraseña. El enlace es válido por 1 hora.</p>
      <a href="${resetLink}" style="padding:10px 15px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Restablecer contraseña</a>
    `
  });
};
