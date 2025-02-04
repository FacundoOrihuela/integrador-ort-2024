import { contact } from '../utils/mailer.js';

const contactController = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  try {
    await contact(email, `Nombre: ${firstName} ${lastName}\nTeléfono: ${phone}\nMensaje: ${message}`);

    res.status(200).json({ success: true, message: 'Mensaje enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ success: false, message: 'Hubo un error al enviar el mensaje.' });
  }
};

export { contactController };
