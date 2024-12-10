const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Configuración de Twilio
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.json());

app.post('/solicitar-cita', (req, res) => {
  const { tipoDocumento, numeroDocumento, fechaHora, medico, motivo } = req.body;
  
  // Lógica para manejar la solicitud de cita (guardar en la base de datos, etc.)
  
  // Enviar mensaje de confirmación por WhatsApp
  client.messages.create({
    from: 'whatsapp:+14155238886', // Número de Twilio
    to: 'whatsapp:+521XXXXXXXXXX', // Número del cliente
    body: `Su solicitud de cita ha sido recibida para el ${fechaHora}. Recibirá una confirmación pronto.`
  }).then(message => console.log(message.sid))
    .catch(err => console.error(err));

  res.send({ message: 'Solicitud de cita recibida' });
});

// Más rutas y lógica...

app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
