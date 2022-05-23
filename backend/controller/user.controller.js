const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const User = require('../model/user.model');

class UserController{
    getAllMembers = async(req, res, next) => {
        User.find()
            .then((users) => {
                res.status(200).json({
                    members: users,
                    message: "All data fetched successfully"
                })
            })
            .catch((error) => {
                next(JSON.stringify(error))
            })
    };

    registerMember = async(req, res, next) => {
        const user = new User(req.body);
        if(req.file){
            var profile = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: 'CIS/department_members',
                    width: 200, 
                    height: 200, 
                    crop: "fill",
                    public_id : req.file.filename
                }
            )
            user.profile.public_id = profile.public_id;
            user.profile.url = profile.secure_url;
        }
        user.password = await bcrypt.hash(req.body.password, 10);

        user.save()
            .then((user) => {
                res.status(200).json({
                    data: user,
                    message: "Successfully Registered"
                })
            })
            .catch((error) => {
                next(JSON.stringify(error));
            })
    }

    login = async(req, res, next) => {
        const {username, password} = req.body;
        // console.log(req) 

        const user = await User.findOne({$username: username}).select("+password")
        if(user){
            const pass = await bcrypt.compare(password, user.password)
            if(pass){
                res.status(200).json({
                    user : user,
                    message : "Success"
                })
            }else{
                res.status(404).json({
                    user : user,
                    message : "Invalid Credentials"
                })
            }
        }else{
            res.status(404).json({
                user : user,
                message : "Invalid Credentials"
            })
        }
    }
}

module.exports = UserController;