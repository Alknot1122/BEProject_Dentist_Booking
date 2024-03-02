const express = require('express');
const {getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointments');

/**
* @swagger
* components:
*   schemas: 
*       Appointment:
*           type: object
*           required:
*               - bookingDate
*               - user
*               - dentist
*           properties:
*               id:
*                   type: string
*                   format: uuid
*                   description: The auto-generated id of the appointment
*               bookingDate:
*                   type: Date
*                   description: The day the user made an appointment to meet with the dentist
*               user:
*                   type: string
*                   format: ObjectId
*                   description: The Id of the user
*               dentist:
*                   type: string
*                   format: ObjectId
*                   description: The Id of the dentist
*               createdAt:
*                   type: Date
*                   description: The date that this appointment created
*           example:
*               id:             609bda561452242d88d36e37
*               bookingDate:    2024-02-23
*               user:           654esy688154648y57s64y54
*               dentist:        656ers348964589r48a15h78
*               createdAt:      2024-02-19
*/

/**
*   @swagger
*   tags:
*       name: Appointments
*       description: The appointments managing API
*/

/**
* @swagger
* /appointments:
*   get:
*       summary: Returns the list of all the appointments
*       tags: [Appointments]
*       responses:
*           200:
*               description: The list of the appointments
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Appointment'
*/

/**
* @swagger
* /appointments/{id}:
*   get:
*       summary: Get the appointment by id
*       tags: [Appointments]
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*             description: The appointment id
*       responses:
*           200:
*               description: The appointment description by id
*               contents:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Appointment'
*           404:
*               description: The appointment was not found
*/

/**
* @swagger
* /appointments:
*   post:
*       summary: Create a new appointment
*       tags: [Appointments]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Appointment'
*       responses:
*           201:
*               description: The appointment was successfully created
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Appointment'
*           500:
*               description: Some server error
*/

/**
* @swagger
* /appointments/{id}:
*  put:
*       summary: Update the appointment by the id
*       tags: [Appointments]
*       parameters:
*           - in: path
*             name: id
*             schema:
*               type: string
*             required: true
*             description: The appointment id
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Appointment'
*       responses:
*           200:
*               description: The appointment was updated
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Appointment'
*           404:
*               description: The appointment was not found
*           500:
*               description: Some error happened
*/

/**
* @swagger
* /appointments/{id}:
*   delete:
*       summary: Remove the appointment by id
*       tags: [Appointments]
*       parameters:
*        - in: path
*          name: id
*          schema:
*               type: string
*          required: true
*          description: The appointment id
* 
*       responses:
*           200:
*               description: The appointment was deleted
*           404:
*               description: The appointment was not found
*/

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getAppointments)
    .post(protect, authorize('admin', 'user'), addAppointment);
router.route('/:id')
    .get(protect, getAppointment)
    .put(protect, authorize('admin', 'user'), updateAppointment)
    .delete(protect, authorize('admin', 'user'), deleteAppointment);
module.exports = router;