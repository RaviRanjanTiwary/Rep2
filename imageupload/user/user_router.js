var express = require('express');
var multer = require('multer');
var path = require('path');
var routes = express.Router();
var user_controller = require('./user_controller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

routes.post('/signup',user_controller.signup);
routes.get('/signin',user_controller.signin);
routes.put('/imageupdate',upload.single('img'),user_controller.imageupdate);

module.exports= routes;