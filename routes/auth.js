const express = require('express');
const {register, login, getMe,logout, updateProfile,getProfile} = require('../controllers/auth');
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")


const url = process.env.MONGO_DB_URL
const storage = new GridFsStorage({
    url ,
    file: (req, file) => {
        console.log("hi")
      //If it is an image, save to photos bucket
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        return {
          bucketName: "photos",
          filename: `${Date.now()}_${file.originalname}`,
        }
      } else {
        //Otherwise save to default bucket
        return `${Date.now()}_${file.originalname}`
      }
    },
  })
  
  // Set multer storage engine to the newly created object
  const upload = multer({ storage })


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
router.post('/profile',protect,upload.single('image'), updateProfile);
router.get('/profile',protect,getProfile);
module.exports = router;