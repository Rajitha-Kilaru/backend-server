const { Router } = require("express");
const { createUser, userLogin, getAllUsers, updateUser, deleteUser } = require("../controllers/AuthControllers")

const router = Router();

router.post('/register', createUser)
router.post('/login', userLogin)
router.get('/users', getAllUsers)
router.put('/updateUser', updateUser)
router.delete('/deleteUser', deleteUser)

module.exports = router;


