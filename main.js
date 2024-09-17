const { SerialPort } = require('serialport');
const fs = require('fs');

const port = new SerialPort({ path: 'COM4', baudRate: 9600 });

const logFile = fs.createWriteStream('temperaturas.txt', { flags: 'a' });

// Leer los datos que llegan por el puerto serie
port.on('data', (data) => {
  const dataSerialPort = data.toString();
  const dataSplit = dataSerialPort.split("|");

  const now = new Date();
  const formattedDate = formatDate(now);

  const message = `[${formattedDate}] Temperatura: ${dataSplit[0]} C - Humedad: ${dataSplit[1]} %`;

  console.log(message);

  logFile.write(message + '\n');
});




// Manejo de errores en el puerto serie
port.on('error', function (err) {
  console.error('Error en el puerto serie:', err.message);
});



function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0'); // Día con dos dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos (getMonth() empieza en 0)
  const year = date.getFullYear(); // Año en formato completo
  const hours = String(date.getHours()).padStart(2, '0'); // Horas con dos dígitos
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos con dos dígitos
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Segundos con dos dígitos

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}