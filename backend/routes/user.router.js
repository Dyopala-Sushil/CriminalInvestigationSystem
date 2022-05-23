var router = require('express').Router();
const UserController = require('../controller/user.controller');
const multer = require('multer');

const userController = new UserController();

function imageFilter(req, file, cb){
  
    const type = file.mimetype.split('/')[0];
    if(type !== 'image'){
      // not image
      cb(null, false);
    } else {
      // image
      cb(null, true);
    }
  }
  
  const mystorage = multer.diskStorage({
      filename: function(req, file, cb){
          const file_name = Date.now()+file.originalname;
          cb(null, file_name);
      },
      destination: function(req, file, cb){
        cb(null, process.cwd()+"/temp");
      }
  });
  
  const uploader = multer({
    storage: mystorage,
    fileFilter: imageFilter
  })
 

router.route('/members').get(userController.getAllMembers)
router.route('/members/register').post(uploader.single('profile'), userController.registerMember)
router.route('/members/login').post(userController.login)


module.exports = router;