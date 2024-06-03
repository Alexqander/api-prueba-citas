import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import { handleRoutesErrors } from '../utils/utils.js';
import { accessLogStream, assignId, morganFormat } from '../config/morgan.js';
import morgan from 'morgan';
export default async ({ app }) => {
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    })
  );
  app.use(express.json());

  // ? Morgan config
  morgan.token('id', (req, res) => {
    return req.id;
  });
  app.use(assignId);
  app.use(morgan(morganFormat, { stream: accessLogStream }));
  app.use(morgan(morganFormat));

  app.use('/api-appointments/1.0', indexRoutes);
  app.use(handleRoutesErrors);
  app.use((err, req, res, next) => {
    console.log('❌ Error detectado en el servidor:');
    console.error(err.stack);
    // * Configurar cabeceras
    res.set({
      'Content-Type': 'application/json',
      'X-Error-Message': 'Ocurrió un error en el servidor',
      'Cache-Control': 'no-store'
    });
    // * Enviar respuesta
    res.status(500).send({
      error: err.message || 'Error en el servidor'
    });
  });
};
