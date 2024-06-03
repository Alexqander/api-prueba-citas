import { Router } from 'express';
import { Response404 } from './response.js';
const router = new Router();

// ? Manejo de errores de rutas
export const handleRoutesErrors = router.all('*', (req, res) => {
  return Response404(res);
});

// * Funcion para remover la extension de un archivo
export const removeExtensionFromFile = (file) => {
  return file.split('.').slice(0, -2).join('.').toString();
};

export const parseCsvFecha = (fechaStr) => {
  // Dividir la fecha en partes
  const partes = fechaStr.split('/');
  const fecha = new Date(partes[2], partes[1] - 1, partes[0]);
  fecha.setHours(0, 0, 0, 0); // Ajustar a medianoche

  // Agregar horas para los límites de mes
  const esInicioMes = parseInt(partes[0], 10) === 1;
  const esFinMes =
    new Date(partes[2], partes[1], 0).getDate() === parseInt(partes[0], 10);

  if (esInicioMes) {
    // Si es el inicio del mes, adelantar unas horas para asegurarse de que se cuenta como el día correcto
    fecha.setHours(23, 59, 59, 999);
  } else if (esFinMes) {
    // Si es el fin de mes, retrasar unas horas para evitar que se cuente como el día siguiente
    fecha.setHours(0, 0, 0, 0);
  }

  fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset()); // Ajustar por zona horaria
  return fecha;
};

// * Funcion para parsear fechas
export const parseDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};
