import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_APP_PASSWORD, // Contraseña de la app o del correo
    },
});

// Enviar correo de verificación
export const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `http://localhost:${process.env.PORT_FRONT}/verifyEmail?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verifica tu cuenta',
        text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${verificationUrl}`,
        html: `<a href="${verificationUrl}">Verifica tu cuenta</a>`, // versión HTML
    });
};

// Enviar correo de recuperación de contraseña
export const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `http://localhost:${process.env.PORT_FRONT}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recupera tu contraseña',
        text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${resetUrl}`,
        html: `<a href="${resetUrl}">Recupera tu contraseña</a>`, // versión HTML
    });
};

// Función para enviar correo con los datos del formulario de contacto
export const contact = async (email, message) => {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,  // Correo al que se envían los mensajes de contacto
      subject: `Contacto de ${email}`,
      text: `Nuevo mensaje de contacto:\n\n${message}`,
      html: `<p><strong>Nuevo mensaje de contacto:</strong></p><p>${message}</p>`,
    });
  };


  