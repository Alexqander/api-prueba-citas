import { getMessage } from '../utils/messages.js';
import { prisma } from '../loaders/database.js';

export const findAllApointments = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        processType: true,
        appointmentStatus: true,
        branchOffice: true,
        citizen: true
      }
    });
    return getMessage(false, appointments, 'Ok');
  } catch (error) {
    return getMessage(true, [], 'Error');
  }
};
export const findAppointment = async (folio) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        folio
      },
      include: {
        processType: true,
        appointmentStatus: true,
        branchOffice: true,
        citizen: true
      }
    });
    return getMessage(false, appointment, 'Ok');
  } catch (error) {
    return getMessage(true, [], 'Error');
  }
};
export const saveAppointment = async (appointmentDto) => {
  try {
    const {
      folio,
      date,
      processType,
      appointmetStatusses,
      branchOffice,
      citizen
    } = appointmentDto;

    const appointmentExist = await prisma.appointment.findUnique({
      where: {
        folio
      }
    });

    if (appointmentExist) {
      return getMessage(true, null, 'Appointment already exist');
    }

    const appointment = await prisma.appointment.create({
      data: {
        folio: folio,
        date: new Date(date),
        appointmentStatus: {
          connectOrCreate: {
            where: { status: appointmetStatusses },
            create: { status: appointmetStatusses }
          }
        },
        processType: {
          connectOrCreate: {
            where: { id: processType.idProcessType },
            create: {
              id: processType.idProcessType,
              name: processType.name,
              description: processType.description,
              documents: processType.docments
            }
          }
        },
        branchOffice: {
          connectOrCreate: {
            where: { id: branchOffice.idbranch_office },
            create: {
              id: branchOffice.idbranch_office,
              name: branchOffice.name,
              address: branchOffice.address
            }
          }
        },
        citizen: {
          connectOrCreate: {
            where: { id: citizen.idCitizen },
            create: {
              id: citizen.idCitizen,
              name: citizen.name,
              lastname: citizen.lastname,
              middleName: citizen.middleName,
              username: citizen.username,
              phone: citizen.phone,
              gender: citizen.gender,
              dni: citizen.dni,
              emergencyContact: citizen.emergencyContact,
              birthdate: new Date(citizen.birthdate),
              profilePicture: citizen.profilePicture,
              nationality: citizen.nationality,
              region: citizen.region,
              country: citizen.counttry
            }
          }
        }
      }
    });
    return getMessage(false, appointment, 'Ok');
  } catch (error) {
    console.log('❌Error: ', error);
    return getMessage(true, [], 'Error');
  }
};
