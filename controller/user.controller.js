const {create , getUsers, getUserByUserId, updateUsers, deleteUser, getUserByUserEmail} = require('../model/user.service');
const {hashSync,genSaltSync,compareSync} = require('bcrypt');
const { sign } = require("jsonwebtoken");
const Joi = require('joi');

module.exports = {
    createUser:(req,res)=>{
        const body = req.body;
        const verifyEmail=body.email;

        // console.log(verifyEmail)
        const schema = Joi.object({
            verifyEmail: Joi.string().email()
        });
        

            let result=schema.validate({verifyEmail});
            if(result.error){
                console.log(result.error);
                res.send(result.error.details[0].message);
                return;
            } 

        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database not connected"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUserByUserId:(req,res)=>{
        const id = req.params.id;
        getUserByUserId(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });

            }
            return res.json({
                success:1,
                data:results
            })
        })
    },
    getUsers:(req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        })
    },
    updateUsers:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password= hashSync(body.password,salt);
        updateUsers(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Failed to update"
                })
            }
            return res.json({
                success:1,
                message: "updated successful"
            })
        })
    },
    deleteUser:(req,res)=>{
        const data = req.body;
        deleteUser(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                })
            }
            return res.json({
                success:1,
                message:"User deleted succesfully"
            });
        })
    },
    login:(req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    data:"Invalid Email or password"
                });
            }
            const result = compareSync(body.password,results.password);
            if(result){
                body.password=undefined;
                console.log(body);
                const jsontoken = sign(body,"qwe1234",{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"Login Successfully",
                    token:jsontoken
                });
            }else{
                return res.json({
                    success:0,
                    data:"Invalid email or password "
                })
            }
        })
    }


}