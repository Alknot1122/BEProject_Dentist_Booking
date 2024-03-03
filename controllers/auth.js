const User = require('../models/User');
const Blacklist = require('../models/BlackList');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const url = mongoose.createConnection(process.env.MONGO_DB_URL, { useNewUrlParser: true });


const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const option = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, option).json({
        success: true,
        token
    })
}

exports.register = async (req, res, next) => {
    try {
        const {name, email, password, tel, role} = req.body;

        const user = await User.create({
            name,
            email,
            password,
            tel,
            role
        });
        sendTokenResponse(user, 200, res);
    } catch(err) {
        res.status(400).json({success: false});
        console.log(err.stack);
    }
}

exports.updateProfile = async (req, res,next) => {
    const file = req.file
    const user = await User.findByIdAndUpdate(req.user.id,{image:file.filename});
    res.status(201).json({success:"true",file:file,user:user})
  }

exports.getProfile = async(req,res,next) =>{
    try {
        const imageBucket = new GridFSBucket(url, {
            bucketName: "photos",
        })
        const user = await User.findById(req.user.id);
        let downloadStream = imageBucket.openDownloadStreamByName(
            user.image
        )
        downloadStream.on("data", function (data) {
            return res.status(200).write(data)
        })
      
        downloadStream.on("error", function (data) {
            return res.status(404).send({ error: "Image not found" })
        })
      
        downloadStream.on("end", () => {
            return res.end()
        })
      } catch (error) {
        console.log(error)
        res.status(500).send({
          message: "Error Something went wrong",
          error,
        })
      }
}

exports.login = async (req, res, next) => {
    
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            msg: 'Please provide an email and password'
        });
    }
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentails'
        });
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid credentails'
        });
    }

    // const token = user.getSignedJwtToken();
    // res.status(200).json({success: true, token});
    sendTokenResponse(user, 200, res);
}

exports.logout = async (req, res, next) => {
    try {
      const authHeader = req.headers['cookie']; // get the session cookie from request header
      if (!authHeader) return res.sendStatus(204); // No content
      const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
      const accessToken = cookie.split(';')[0];
      const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
      // if true, send a no content response.
      if (checkIfBlacklisted) return res.sendStatus(204);
      // otherwise blacklist token
      const newBlacklist = new Blacklist({
        token: accessToken,
      });
      await newBlacklist.save();
      // Also clear request cookie on client
      res.setHeader('Clear-Site-Data', '"cookies"');
      res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
    res.end();
  }

exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({success: true, data: user});
}