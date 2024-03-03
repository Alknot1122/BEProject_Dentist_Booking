const express = require('express');
const {register, login, getMe,logout} = require('../controllers/auth');


/**
*   @swagger
*   tags:
*       name: Authentication
*       description: The authentication function
*/

/**
* @swagger
* /auth/login:
*   post:
*      summary: Authenticate user and obtain JWT token
*      tags: [Authentication]
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                email:
*                  type: string
*                  format: email
*                password:
*                  type: string
*      responses:
*        '200':
*          description: Token retrieved successfully
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  token:
*                    type: string
*        '401':
*          description: Unauthorized
*/

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', protect,logout);

module.exports = router;