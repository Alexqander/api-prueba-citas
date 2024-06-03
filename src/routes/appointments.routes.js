import { Router } from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointment
} from '../controller/appointment.controller.js';

const router = new Router();

router.get('/', getAllAppointments);
router.get('/find', getAppointment);
router.post('/', createAppointment);

export default router;
