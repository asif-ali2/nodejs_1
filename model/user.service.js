 const pool = require("../config/db");
 const Joi = require("joi");

module.exports = {
    create:(data,callback)=>{

    //    const schema=Joi.object({
    //        firstname: Joi.string()
    //    })  
    // //    console.log(firstname)   

        pool.query(
            `insert into registration(firstname,lastname,gender,email,password,number)
            values(?,?,?,?,?,?)`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error,results,field)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);

        
            }
        );
    },
    getUsers: callBack =>{
        pool.query(
            `select id,firstname,lastname,gender,email,number from registration `,
            [],
            (error,results,field)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getUserByUserId: (id,callBack)=>{
        pool.query(
            `select id,firstname,lastname,gender,email,number from registration where id = ?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },
    updateUsers: (data,callBack)=>{
        pool.query(
            `update registration set firstName=?, lastname=?, gender=?,email=?,password=?,number=? where id=?`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    deleteUser: (data,callBack)=>{
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },
    getUserByUserEmail:(email,callBack)=>{
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error,results,fields)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    }
}