const express = require('express');
const {getDentists, getDentist, createDentist, updateDentist, deleteDentist} = require('../controllers/dentists');

/**
* @swagger
* components:
*   schemas: 
*       Dentist:
*           type: object
*           required:
*               - name
*               - specialty
*           properties:
*               id:
*                   type: string
*                   format: uuid
*                   description: The auto-generated id of the dentist
*               name:
*                   type: string
*                   description: Dentist name
*               specialty:
*                   type: string
*                   description: specialty of the dentist
*               available_days:
*                   type: string
*                   description: Working Day of the dentist
*               start_time:
*                   type: string
*                   description: Start working time
*               end_time:
*                   type: string
*                   description: Finish working time
*           example:
*               id:             609bda561452242d88d36e37
*               name:           Dr. Smith
*               specialty:      Orthodontist
*               available_days: Monday,Wednesday,Friday
*               start_time:     09:00:00
*               end_time:       17:00:00
*/

/**
*   @swagger
*   tags:
*       name: Dentists
*       description: The dentists managing API
*/

/**
* @swagger
* /dentists:
*   get:
*       summary: Returns the list of all the dentists
*       tags: [Dentists]
*       responses:
*           200:
*               description: The list of the dentists
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Dentist'
*/

/**
* @swagger
* /dentists/{id}:
*   get:
*       summary: Get the dentist by id
*       tags: [Dentists]
*       parameters:
*           - in: path
*             name: id
*             schema:
*                 type: string
*             required: true
*             description: The dentist id
*       responses:
*           200:
*               description: The dentist description by id
*               contents:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Dentist'
*           404:
*               description: The dentist was not found
*/

/**
* @swagger
* /dentists:
*   post:
*       summary: Create a new dentist
*       tags: [Dentists]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Dentist'
*       responses:
*           201:
*               description: The dentist was successfully created
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Dentist'
*           500:
*               description: Some server error
*/

/**
* @swagger
* /dentists/{id}:
*  put:
*       summary: Update the dentist by the id
*       tags: [Dentists]
*       parameters:
*           - in: path
*             name: id
*             schema:
*               type: string
*             required: true
*             description: The dentist id
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Dentist'
*       responses:
*           200:
*               description: The dentist was updated
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Dentist'
*           404:
*               description: The dentist was not found
*           500:
*               description: Some error happened
*/

/**
* @swagger
* /dentists/{id}:
*   delete:
*       summary: Remove the dentist by id
*       tags: [Dentists]
*       parameters:
*        - in: path
*          name: id
*          schema:
*               type: string
*          required: true
*          description: The dentist id
* 
*       responses:
*           200:
*               description: The dentist was deleted
*           404:
*               description: The dentist was not found
*/

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');
+
router.route('/').get(getDentists).post(protect, authorize('admin'), createDentist);
router.route('/:id').get(getDentist).put(protect, authorize('admin'), updateDentist).delete(protect, authorize('admin'), deleteDentist);

module.exports = router;