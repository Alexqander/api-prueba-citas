import {
  findAllApointments,
  findAppointment,
  saveAppointment
} from '../service/appointments.service.js';
import { Response200, Response500 } from '../utils/response.js';

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await findAllApointments();
    appointments.error
      ? Response500(res, appointments.message)
      : Response200(res, appointments.data);
  } catch (error) {
    Response500(res, 'Error');
  }
};
export const getAppointment = async (req, res) => {
  try {
    const { folio } = req.query;
    const appointment = await findAppointment(folio);
    appointment.error
      ? Response500(res, appointment.message)
      : Response200(res, appointment.data);
  } catch (error) {
    Response500(res, 'Error');
  }
};
export const createAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    const newAppointment = await saveAppointment(appointment);
    newAppointment.error
      ? Response500(res, newAppointment.message)
      : Response200(res, newAppointment.data);
  } catch (error) {
    Response500(res, 'Error');
  }
};
