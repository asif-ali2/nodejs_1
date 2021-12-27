const { createUser ,getUsers, getUserByUserId, updateUsers, deleteUser,login }  =require("../controller/user.controller")
const router = require("express").Router();
const { checkToken } = require('../middleware/token.validate')

router.post("/",checkToken,createUser);
router.get("/",checkToken,getUsers);
router.get("/:id",checkToken,getUserByUserId);
router.patch("/",checkToken,updateUsers);
router.delete("/",checkToken,deleteUser);
router.post('/login',login);

module.exports = router;