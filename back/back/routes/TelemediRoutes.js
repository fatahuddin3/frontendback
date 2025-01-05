const express = require('express');
const router = express.Router();
const Consultation = require('../models/Telemedicine');  // Import Consultation model
const Doctor = require('../models/Doctor');  // Import Doctor model

// POST Route for Booking Consultation

/*
router.post('/consu', async (req, res) => {
    try {
        const {
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            prescription,
            appointment_time,
            duration,
            notes,
            start_time,
            end_time,
           
        } = req.body;

        // 1. Find if there's any existing consultation with the same doctor and overlapping time
        const conflictingConsultation = await Consultation.findOne({

            status: 'pending',
            $or: [
                { start_time: { $lt: end_time, $gt: start_time } },  // Time conflicts with another
                { end_time: { $lt: end_time, $gt: start_time } }
            ]
        });

        if (conflictingConsultation) {
            return res.status(400).json({ message: 'Doctor is unavailable in the given time range.' });
        }

        // 2. Check status
        if (req.body.status === 'cancelled') {

            const newConsultation = new Consultation({
                patient_id,
                doctor_id,
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                appointment_time,
                duration,
                notes,
                start_time,
                end_time,
               
            });

            await newConsultation.save();
            return res.status(400).json({
                message: 'sorry,we cannot let you in now,but you are in pending.',
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                duration,
                notes,
               
            });
        }

        if (req.body.status === 'completed') {
            const newConsultation = new Consultation({
                patient_id,
                doctor_id,
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                appointment_time,
                duration,
                notes,
                start_time,
                end_time,
                
            });

            await newConsultation.save(); 
            return res.status(400).json({
                message: 'Ok, be patient. There are pending patients.', 
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                duration,
                notes,
                 });
        }

        // 3. Check if time is during "Off time" (1AM to 7AM, 2PM to 4PM)
        const startHour = new Date(start_time).getHours();
        const endHour = new Date(end_time).getHours();

        if (
            (startHour >= 1 && startHour < 7) || (endHour >= 1 && endHour < 7) ||  // 1 AM - 7 AM
            (startHour >= 14 && startHour < 16) || (endHour >= 14 && endHour < 16)  // 2 PM - 4 PM
        ) {
            return res.status(400).json({ message: 'Off time.' });
        }

        // 4. Create new consultation with updated status as 'completed'
        const newConsultation = new Consultation({
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            prescription,
            status: 'completed',
            appointment_time,
            duration,
            notes,
            start_time,
            end_time,
            link
        });

        await newConsultation.save();  // Save the new consultation in the DB

        // 5. Return success response with relevant details
        return res.status(200).json({
            message: 'Booked successfully.',
            symptoms,
            diagnosis,
            prescription,
            status: 'completed',
            duration,
            notes,
            link
        });

    } catch (error) {
        console.error('Error booking consultation:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

*/

// POST Route for Booking Consultation
/*router.post('/consu', async (req, res) => {
    try {
        const {
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            prescription,
            appointment_time,
            duration,
            notes,
            start_time,
            end_time,
            
        } = req.body;

        // 1. Check if the patient has a valid status of 'pending'
       *//* const patient = await Patient.findById(patient_id);
        if (!patient) {
            return res.status(400).json({ message: 'Invalid patient ID' });
        }*//*

        const existingConsultation = await Consultation.findOne({
            patient_id,
            status: 'completed'
        });

        if (!existingConsultation) {
            return res.status(400).json({ message: 'You showed us wrong status, we will never let you in. Thanks.' });
        }

        // 2. Fixing the overlapping consultation logic for the same doctor
        const conflictingConsultation = await Consultation.findOne({
            doctor_id,
            status: 'pending',
            $or: [
                {
                    $and: [
                        { start_time: { $lte: end_time } },
                        { end_time: { $gte: start_time } }
                    ]
                }
            ]
        });

        if (conflictingConsultation) {
            return res.status(400).json({ message: 'Doctor is unavailable in the given time range.' });
        }

        // 3. Fixing the "Off-time" logic
        const startHour = parseTimeToHours(start_time); // Helper function to get hours from 12-hour format
        const endHour = parseTimeToHours(end_time);

        if (
            (startHour >= 1 && startHour < 7) || (endHour >= 1 && endHour < 7) ||  // 1 AM - 7 AM
            (startHour >= 14 && startHour < 16) || (endHour >= 14 && endHour < 16)  // 2 PM - 4 PM
        ) {
            return res.status(400).json({ message: 'Off time.' });
        }

        // 4. Handle status based on the consultation's status
        if (req.body.status === 'cancelled') {
            const newConsultation = new Consultation({
                patient_id,
                doctor_id,
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                appointment_time,
                duration,
                notes,
                start_time,
                end_time,
                link
            });

            await newConsultation.save();
            return res.status(400).json({
                message: 'Sorry, we cannot let you in now, but you are in pending.',
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                duration,
                notes
            });
        }

   

        // 5. If all checks are passed, create the consultation and mark it as 'completed'
        const newConsultation = new Consultation({
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            prescription,
            status: 'completed',
            appointment_time,
            duration,
            notes,
            start_time,
            end_time,
            link
        });

        await newConsultation.save();

        // 6. Return success response with relevant details
        return res.status(200).json({
            message: 'Booked successfully.',
            symptoms,
            diagnosis,
            prescription,
            status: 'completed',
            duration,
            notes,
            link
        });

    } catch (error) {
        console.error('Error booking consultation:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Helper function to convert 12-hour time format (e.g., "2:00pm") to 24-hour format (14:00)
function parseTimeToHours(timeStr) {
    const [time, modifier] = timeStr.split(/(am|pm)/);
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'pm' && hours < 12) {
        hours += 12;
    }
    if (modifier === 'am' && hours === 12) {
        hours = 0;
    }

    return hours;
}*/

/*router.post('/consu', async (req, res) => {
    try {
        const {
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            prescription,
            appointment_time,
            statuss,
            duration,
            notes,
            start_time,
            end_time,

        } = req.body;

        // 1. Check if the patient has a valid status of 'pending'
        *//* const patient = await Patient.findById(patient_id);
         if (!patient) {
             return res.status(400).json({ message: 'Invalid patient ID' });
         }*//*

        const existingConsultation = await Consultation.find({
           
            status: statuss,
            statuss: 'completed'
        });

        if (!existingConsultation) {
            return res.status(400).json({ message: 'You showed us wrong status, we will never let you in. Thanks.' });
        }

        // 2. Fixing the overlapping consultation logic for the same doctor
        const conflictingConsultation = await Consultation.findOne({
            doctor_id,
            status: 'pending',
            $or: [
                {
                    $and: [
                        { start_time: { $lte: end_time } },
                        { end_time: { $gte: start_time } }
                    ]
                }
            ]
        });

        if (conflictingConsultation) {
            return res.status(400).json({ message: 'Doctor is unavailable in the given time range.' });
        }

        // 3. Fixing the "Off-time" logic
        const startHour = parseTimeToHours(start_time); // Helper function to get hours from 12-hour format
        const endHour = parseTimeToHours(end_time);

        if (
            (startHour >= 1 && startHour < 7) || (endHour >= 1 && endHour < 7) ||  // 1 AM - 7 AM
            (startHour >= 14 && startHour < 16) || (endHour >= 14 && endHour < 16)  // 2 PM - 4 PM
        ) {
            return res.status(400).json({ message: 'Off time.' });
        }

        // 4. Handle status based on the consultation's status
        if (req.body.status === 'cancelled') {
            const newConsultation = new Consultation({
                patient_id,
                doctor_id,
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                appointment_time,
                duration,
                notes,
                start_time,
                end_time,
                
            });

            await newConsultation.save();
            return res.status(400).json({
                message: 'Sorry, we cannot let you in now, but you are in pending.',
                symptoms,
                diagnosis,
                prescription,
                status: 'pending',
                duration,
                notes
            });
        }



        // 5. If all checks are passed, create the consultation and mark it as 'completed'
        const newConsultation = new Consultation({
            patient_id,
            doctor_id,
            symptoms,
            diagnosis,
            prescription,
            status: 'completed',
            appointment_time,
            duration,
            notes,
            start_time,
            end_time,
            link
        });

        await newConsultation.save();

        // 6. Return success response with relevant details
        return res.status(200).json({
            message: 'Booked successfully.',
            symptoms,
            diagnosis,
            prescription,
            status: 'completed',
            duration,
            notes,
            link
        });

    } catch (error) {
        console.error('Error booking consultation:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
*/
// Helper function to convert 12-hour time format (e.g., "2:00pm") to 24-hour format (14:00)
/*function parseTimeToHours(timeStr) {
    const [time, modifier] = timeStr.split(/(am|pm)/);
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'pm' && hours < 12) {
        hours += 12;
    }
    if (modifier === 'am' && hours === 12) {
        hours = 0;
    }

    return hours;
}*/



/*router.post('/consulat', async (req, res) => {
    const { doctorId, patientId, status, start_time, end_time } = req.body;

    try {
        // Check if status is 'pending' to process further logic
        if (status === 'pending') {
            // Find existing consultations for the patient
            const existingConsultations = await Consultation.find({ patient_id: patientId });

            // Check if there are any previous consultations
            if (existingConsultations.length > 0) {
                // Loop through the consultations to check their status
                for (let consultation of existingConsultations) {
                    if (consultation.status === 'completed') {
                        // If there's a completed consultation, return an error message
                        return res.status(400).json({
                            message: 'sorry you provide us false information'
                        });
                    } else if (consultation.status === 'pending') {
                        // If there's a pending consultation, mark it as completed
                        consultation.status = 'completed';
                        await consultation.save();

                        // Return the updated consultation details
                        return res.status(200).json({
                            message: 'Consultation status updated to completed',
                            consultation: {
                                doctorId: consultation.doctor_id,
                                patientId: consultation.patient_id,
                                status: consultation.status,
                                start_time: consultation.start_time,
                                end_time: consultation.end_time,
                            }
                        });
                    }
                }
            }

            *//*  // If no previous consultation exists, proceed to create a new one
              if (isTimeInOffTimeRange(start_time, end_time)) {
                  return res.status(400).json({ message: 'Off time' });
              }
  
              const newStartTime = convertTimeToMinutes(start_time);
              const newEndTime = convertTimeToMinutes(end_time);
  
              // Check for doctor's existing appointments for overlapping times
              const existingAppointments = await Consultation.find({
                  doctor_id: doctorId,
              });
  
              for (let appointment of existingAppointments) {
                  const existingStartTime = convertTimeToMinutes(appointment.start_time);
                  const existingEndTime = convertTimeToMinutes(appointment.end_time);
  
                  if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                      return res.status(400).json({
                          message: `Doctor is already booked from ${appointment.start_time} to ${appointment.end_time}. Please choose a different time slot.`
                      });
                  }
              }
  
              // Create new appointment
              const newAppointment = new Consultation({
                  patient_id: patientId,
                  doctor_id: doctorId,
                  status,
                  start_time,
                  end_time,
              });
  
              await newAppointment.save();
  
              // Respond with success and appointment details
              return res.status(201).json({
                  message: 'Appointment booked successfully!',
                  appointment: {
                      doctorId,
                      patientId,
                      status,
                      start_time: convertMinutesTo12HourFormat(newStartTime),
                      end_time: convertMinutesTo12HourFormat(newEndTime),
                  }
              });
          } else {
              // If status is not 'pending', handle accordingly
              return res.status(400).json({ message: 'Invalid status' });
          }*//*

        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});
*/
function convertTimeToMinutes(time) {
    const [_, hours, minutes, modifier] = time.match(/(\d{1,2}):(\d{2})(am|pm)/i);
    let h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);

    if (modifier.toLowerCase() === 'pm' && h !== 12) h += 12;
    if (modifier.toLowerCase() === 'am' && h === 12) h = 0;

    return h * 60 + m;
}
const convertTo24HourFormat = (time) => {
    const [timeStr, modifier] = time.toLowerCase().split(/(am|pm)/);
    let [hours, minutes] = timeStr.trim().split(":").map(Number);

    // Handle PM times
    if (modifier === "pm" && hours < 12) hours += 12;
    // Handle midnight cases
    if (modifier === "am" && hours === 12) hours = 0;

    // Ensure the conversion is correct
    const convertedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    console.log(`Converted ${time} to 24-hour format: ${convertedTime}`);
    return convertedTime;
};
// Convert minutes since midnight to "hh:mm am/pm" format
function convertMinutesTo12HourFormat(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;
    return `${hours}:${mins}${ampm}`;
}

const isTimeInOffTimeRange = (timefrom, timeto) => {
    const startTime = new Date(`1970-01-01T${convertTo24HourFormat(timefrom)}`).getTime();
    const endTime = new Date(`1970-01-01T${convertTo24HourFormat(timeto)}`).getTime();

    // Convert off-time periods to 24-hour format for comparison
    const offTime1Start = new Date("1970-01-01T01:00").getTime();  // 1:00am
    const offTime1End = new Date("1970-01-01T07:00").getTime();    // 7:00am
    const offTime2Start = new Date("1970-01-01T14:00").getTime();  // 2:00pm
    const offTime2End = new Date("1970-01-01T16:00").getTime();    // 4:00pm

    // Check if the time falls within the off-time ranges
    const isInFirstOffTime = startTime < offTime1End && endTime > offTime1Start;
    const isInSecondOffTime = startTime < offTime2End && endTime > offTime2Start;

    return isInFirstOffTime || isInSecondOffTime;
};
router.post('/creat', async (req, res) => {
    const { doctorId, patientId, start_time, end_time, symptoms, diagnosis, prescription } = req.body;
    //req.body te variable gula frontend er submit er jaigagulai same hoite hobe.
    try {
        // Check if the doctor exists
        
        if (isTimeInOffTimeRange(start_time, end_time)) {
            return res.status(400).json({ message: 'Off time' });
        }
        const newStartTime = convertTimeToMinutes(start_time);
        const newEndTime = convertTimeToMinutes(end_time);
        const existingAppointments = await Consultation.find({
            doctor_id: doctorId,
        });
        for (let appointment of existingAppointments) {
            const existingStartTime = convertTimeToMinutes(appointment.start_time);
            const existingEndTime = convertTimeToMinutes(appointment.end_time);

            if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                return res.status(400).json({
                    message: `Doctor is already booked from ${appointment.start_time} to ${appointment.end_time}. Please choose a different time slot.`
                });
            }
        }        
        const cons = await Consultation.create({
            doctor_id: doctorId,
            patient_id: patientId,
            start_time,
            end_time,
            status: 'pending',
            symptoms,
            diagnosis,
            prescription
        });
        await cons.save();
        return res.status(201).json({ message: 'Consultation status updated to pending', cons});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal code error' });
    }
});



//this router.put is the main code well we can update the pending to pending in another time.  then 
//creating another router.post where Doctor can turn to completed from pending.or below code wise turn from 
//pending to completed
router.put('/consulat', async (req, res) => {
    const { doctorId, patientId, status, start_time, end_time } = req.body;


    try {
        // Check if status is 'pending' to process further logic
        if (status === 'pending') {
            // Find existing consultations for the patient
            const existingConsultations = await Consultation.find({ patient_id: patientId });

            // Check if there are any previous consultations
            if (existingConsultations.length > 0) {
                // Loop through the consultations to check their status
                for (let consultation of existingConsultations) {
                    if (consultation.status === 'cancelled') {
                        // If there's a completed consultation, return an error message
                        return res.status(400).json({
                            message: 'Sorry, you provided us false information.'
                        });
                    } else if (consultation.status === 'pending') {
                        // If there's a pending consultation, mark it as completed

                        if (isTimeInOffTimeRange(start_time, end_time)) {
                            return res.status(400).json({ message: 'Off time' });
                        }
                        const newStartTime = convertTimeToMinutes(start_time);
                        const newEndTime = convertTimeToMinutes(end_time);

                        const existingAppointments = await Consultation.find({
                            doctor_id: doctorId,

                        });

                        for (let appointment of existingAppointments) {
                            const existingStartTime = convertTimeToMinutes(appointment.start_time);
                            const existingEndTime = convertTimeToMinutes(appointment.end_time);

                            if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                                return res.status(400).json({
                                    message: `Doctor is already booked from ${appointment.start_time} to ${appointment.end_time}. Please choose a different time slot.`
                                });
                            }
                        }

                        const newAppointment = new Consultation({
                            doctor_id: consultation.doctor_id,
                            patient_id: consultation.patient_id,
                            status: 'completed',
                            start_time,
                            end_time,
                            link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',
                            symtoms: consultation.symtoms,
                            diagnosis: consultation.diagnosis,
                            prescription: consultation.prescription,

                        });

                        await newAppointment.save();

                        // Return the updated consultation details
                        return res.status(200).json({
                            message: 'Consultation status updated to completed',
                            consultation: {
                                doctorId: consultation.doctor_id,
                                patientId: consultation.patient_id,
                                status: 'completed',
                                start_time,
                                end_time,
                                link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',
                                symtoms: consultation.symtoms,
                                diagnosis: consultation.diagnosis,
                                prescription: consultation.prescription,
                            }
                        });
                    } else if (consultation.status === 'completed') {
                        const newAppointment = new Consultation({
                            doctorId,
                            patientId,
                            status: 'pending',
                            start_time,
                            end_time,
                            link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',
                           

                        });

                        await newAppointment.save();

                        // Return the updated consultation details
                        return res.status(200).json({
                            message: 'Consultation status updated to pending',
                            consultation: {
                                doctorId,
                                patientId,
                                status: 'pending',
                                start_time,
                                end_time,
                                link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',
                               
                            }
                        });
                    }
                }
            } else {
                // If no previous consultation exists, return a message
                return res.status(404).json({
                    message: 'No previous consultations found for this patient.'
                });
            }
        } else if (status === 'completed') {


            return res.status(400).json({ message: 'complete status. congrats' });


        }


    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});
//this router..post has many problem if possible ignore this
router.post('/consulatio', async (req, res) => {
    const { doctorId, patientId, status, start_time, end_time } = req.body;


    try {
        // Check if status is 'pending' to process further logic
        if (status === 'pending') {
            // Find existing consultations for the patient
            const existingConsultations = await Consultation.find({ patient_id: patientId });

            // Check if there are any previous consultations
            if (existingConsultations.length > 0) {
                // Loop through the consultations to check their status
                for (let consultation of existingConsultations) {
                    if (consultation.status === 'cancelled') {
                        // If there's a completed consultation, return an error message
                        return res.status(400).json({
                            message: 'Sorry, you provided us false information.'
                        });
                    } else if (consultation.status === 'pending' && consultation.doctor_id.equals(doctorId)) {
                        // If there's a pending consultation, mark it as completed

                        if (isTimeInOffTimeRange(start_time, end_time)) {
                            return res.status(400).json({ message: 'Off time' });
                        }


                        const newAppointment = new Consultation({
                            doctor_id: consultation.doctor_id,
                            patient_id: consultation.patient_id,
                            status: 'completed',
                            start_time,
                            end_time,
                            link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',
                            symtoms: consultation.symtoms,
                            diagnosis: consultation.diagnosis,
                            prescription: consultation.prescription,

                        });

                        await newAppointment.save();

                        // Return the updated consultation details
                        return res.status(200).json({
                            message: 'Consultation status updated to completed',
                            consultation: {
                                doctorId: consultation.doctor_id,
                                patientId: consultation.patient_id,
                                status: 'completed',
                                start_time,
                                end_time,
                                link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',
                                symtoms: consultation.symtoms,
                                diagnosis: consultation.diagnosis,
                                prescription: consultation.prescription,
                            }
                        });
                    } else if (consultation.status === 'completed') {
                        const newAppointment = new Consultation({
                            doctorId,
                            patientId,
                            status: 'pending',
                            start_time,
                            end_time,
                            link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',


                        });

                        await newAppointment.save();

                        // Return the updated consultation details
                        return res.status(200).json({
                            message: 'Consultation status updated to pending',
                            consultation: {
                                doctorId,
                                patientId,
                                status: 'pending',
                                start_time,
                                end_time,
                                link: 'https://www.youtube.com/watch?v=TGtWWb9emYI',

                            }
                        });
                    }
                }
            } else {
                // If no previous consultation exists, return a message
                return res.status(404).json({
                    message: 'No previous consultations found for this patient.'
                });
            }
        } else if (status === 'completed') {


            return res.status(400).json({ message: 'complete status. congrats' });


        }


    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});
/*router.get('/status/patients/:patient_id' , async (req, res) => {
    const { patient_id } = req.params;

    try {
        const bill = await Consultation.findOne({ patient_id });
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        return res.status(200).json(bill);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});*/
router.get('/status/patients/:patient_id', async (req, res) => {
    const { patient_id } = req.params;

    try {
        // Find one consultation by patient_id
        const consultation = await Consultation.findOne({ patient_id });
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        return res.status(200).json(consultation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//below code is for finding just single consultation and above for all in mongodb
router.get('/status/patient/:patient_id', async (req, res) => {
    const { patient_id } = req.params;

    try {
        const bill = await Consultation.find({ patient_id });
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        return res.status(200).json(bill);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
//below code for cancelling patient appoint by patient
router.put('/status/patient/:patient_id', async (req, res) => {
    try {
        const { patient_id } = req.params;  // Extract patient_id from URL params
        const { status } = req.body;  // Expecting new status in the request body

        // Find the consultation by patient_id
        const consultation = await Consultation.findOne({ patient_id });

        if (!consultation) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update the status
        consultation.status = status;

        // Save the updated consultation document
        await consultation.save();

        return res.status(200).json({ message: 'Status updated successfully', consultation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating consultation status', error });
    }
});
/*router.put('/status/patient/:patient_id', async (req, res) => {
    try {
        const { patient_id } = req.params;  // Extract patient_id from URL params
        const { status } = req.body;  // Expecting new status in the request body

        // Find the consultation by patient_id
        const consultation = await Consultation.findOne({ patient_id });

        if (!consultation) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update the status
        consultation.status = status;

        // Save the updated consultation document
        await consultation.save();

        return res.status(200).json({ message: 'Status updated successfully', consultation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating consultation status', error });
    }
});*/
//below code for cancelling patient appoint by doctor
router.put('/status/doctor/:patient_id', async (req, res) => {
    try {
        const { patient_id } = req.params;  // Extract patient_id from URL params
        const { status } = req.body;  // Expecting new status in the request body

        // Find the consultation by patient_id
        const consultation = await Consultation.findOne({ patient_id });

        if (!consultation) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update the status
        consultation.status = status;

        // Save the updated consultation document
        await consultation.save();

        return res.status(200).json({ message: 'Status updated successfully', consultation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating consultation status', error });
    }
});

//below code for cancelling patient appoint but it will not in real document,but will in another document
router.put('/stat', async (req, res) => {
    const { patient_id, status } = req.body;

    try {
        // Check if the patient exists based on patient_id field
        const patient = await Consultation.findOne({ patient_id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        } patient.status = status;
        const cons = await Consultation.create({

            patient_id,
            start_time,
            end_time,
            status: patient.status,
        });
        // Update status

        await cons.save();

        return res.status(200).json(cons);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal code error' });
    }
});


/*router.post('/consulat', async (req, res) => {
    const { doctorId, patientId,status, start_time, end_time } = req.body;

    try {
        if (isTimeInOffTimeRange(start_time, end_time )) {
            return res.status(400).json({ message: 'Off time' });
        }
        const newStartTime = convertTimeToMinutes(start_time);
        const newEndTime = convertTimeToMinutes(end_time);

        const existingAppointments = await Consultation.find({
            doctor_id: doctorId,
            
        });

        for (let appointment of existingAppointments) {
            const existingStartTime = convertTimeToMinutes(appointment.start_time);
            const existingEndTime = convertTimeToMinutes(appointment.end_time);

            if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                return res.status(400).json({
                    message: `Doctor is already booked from ${appointment.timefrom} to ${appointment.timeto}. Please choose a different time slot.`
                });
            }
        }

        const newAppointment = new Consultation({
            patient_id: patientId,
            doctor_id: doctorId,
           status,
            start_time,
            end_time,
           
        });

        await newAppointment.save();

        // JSON response with proper 12-hour format
        res.status(201).json({
            message: 'Appointment booked successfully!',
            appointment: {
               
                patientId,
                doctorId,
                status,
                 // Format the date as string
                start_time: convertMinutesTo12HourFormat(newStartTime),
                end_time: convertMinutesTo12HourFormat(newEndTime),
               
            }
        });

    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});*/


module.exports = router;
/*router.put('/consulat', async (req, res) => {
    const { doctorId, patientId, status, start_time, end_time } = req.body;


    try {
        // Check if status is 'pending' to process further logic
        if (status === 'pending') {
            // Find existing consultations for the patient
            const existingConsultations = await Consultation.find({ patient_id: patientId });

            // Check if there are any previous consultations
            if (existingConsultations.length > 0) {
                // Loop through the consultations to check their status
                for (let consultation of existingConsultations) {
                    if (consultation.status === 'completed') {
                        // If there's a completed consultation, return an error message
                        return res.status(400).json({
                            message: 'Sorry, you provided us false information.'
                        });
                    } else if (consultation.status === 'pending') {
                        // If there's a pending consultation, mark it as completed

                        if (isTimeInOffTimeRange(start_time, end_time)) {
                            return res.status(400).json({ message: 'Off time' });
                        }
                        const newStartTime = convertTimeToMinutes(start_time);
                        const newEndTime = convertTimeToMinutes(end_time);

                        const existingAppointments = await Consultation.find({
                            doctor_id: doctorId,

                        });

                        for (let appointment of existingAppointments) {
                            const existingStartTime = convertTimeToMinutes(appointment.start_time);
                            const existingEndTime = convertTimeToMinutes(appointment.end_time);

                            if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
                                return res.status(400).json({
                                    message: `Doctor is already booked from ${appointment.start_time} to ${appointment.end_time}. Please choose a different time slot.`
                                });
                            }
                        }

                        const newAppointment = new Consultation({
                            doctor_id: consultation.doctor_id,
                            patient_id: consultation.patient_id,
                            status: 'completed',
                            start_time: consultation.start_time,
                            end_time: consultation.end_time,

                        });

                        await newAppointment.save();

                        // Return the updated consultation details
                        return res.status(200).json({
                            message: 'Consultation status updated to completed',
                            consultation: {
                                doctorId: consultation.doctor_id,
                                patientId: consultation.patient_id,
                                status: 'completed',
                                start_time: consultation.start_time,
                                end_time: consultation.end_time,
                            }
                        });
                    }
                }
            } else {
                // If no previous consultation exists, return a message
                return res.status(404).json({
                    message: 'No previous consultations found for this patient.'
                });
            }
        } else if (status === 'completed') {


            return res.status(400).json({ message: 'complete status. congrats' });


        }


    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});*/


