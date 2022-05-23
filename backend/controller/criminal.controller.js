const Criminal = require("../model/criminal.model");
const cloudinary = require('cloudinary').v2;


class CriminalController{
    getAllCriminals = (req, res, next) => {
        Criminal.find()
            .then((criminal) => {
                res.json({
                    data: criminal,
                    message: "Criminal fetched successfully"
                })
            })
            .catch((error) => {
                next("Something went wrong")
            })
    };

    registerCriminal = async(req, res, next) => {
        const criminal = new Criminal(req.body);
        var images = [];
        // console.log(criminal);
        if(req.files){
            for(var i in req.files){
                var arr = {};
                const response =await cloudinary.uploader.upload(
                    req.files[i].path,
                    {
                        folder: 'CIS/criminals',
                        crop: "fill",
                        public_id : req.files[i].filename
                    }
                )
                arr['public_id'] = response['public_id'];
                arr['url'] = response['secure_url'];
                images.push(arr);
            }
        }
        criminal['images'] = images;
        criminal.save()
            .then((res) => {
                res.status(200).json({
                    data: criminal,
                    message: "Criminal register successfully"
                })
            })
            .catch((error) => {
                next(JSON.stringify(error))
            })
    }

}


module.exports = CriminalController