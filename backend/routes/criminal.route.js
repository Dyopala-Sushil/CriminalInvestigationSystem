const router = require('express').Router();
const CriminalController = require('../controller/criminal.controller');
const criminalController = new CriminalController();
const multer = require('multer')

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

router.route('/').get(criminalController.getAllCriminals);
router.route('/register').post(uploader.array('images'), criminalController.registerCriminal);


module.exports = router;