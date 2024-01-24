const { response } = require('express');
const {userSchemaModel} = require('../models/AuthModel')

const createUser = async (request, response) => {
    const { name, email, password, mobile } = request.body;
    try {
       const user = await userSchemaModel.create({name, email, password, mobile})
        console.log('8== controller', user);
        // const all_data = await userSchemaModel.find()
        return response.send(user);
    } catch(error) {
        console.error('21==', error.message);
        if(error?.message.includes("email_1 dup")) {
            return response.status(400).json({error: "User already exist, Please login"}); 
        }
        return response.status(400).json({error: error.message});
    }
}

const userLogin = async (request, response) => {
    const {email, password} = request.body;
    try {
        if(!email || !password ) {
            throw new Error("Please fill all fields");
        }
        const result = await userSchemaModel.findOne({email: email});
        if(!result) {
            throw new Error("User not found");
        }
        console.log('26== loginuser', result, result?.password, password);
        if(result?.password !== password) {
            throw new Error("Password not matched");
        }
        return response.send(result);
    } catch(error) {
        console.error('40==', error.message);
        return response.status(400).json({error: error.message});
    }
}

const getAllUsers = async (req,res) => {
    try {
        const allUsers = await userSchemaModel.find();
        console.log('40== allUsers', allUsers);
       return res.send(allUsers);
    } catch(error) {
        console.log('47==', error);
        return res.status(400).json({error: "Failed to fetch all users data"})
    }
}

const updateUser = async (req,resp) => {
    try{
    const { id, data } = req.body;
    const result = await userSchemaModel.findOneAndUpdate({_id: id}, data, {new: true})
    const modifiedData = await userSchemaModel.find()
    if(!result) {
        throw new Error("Somthing went wrong")
    }
    return resp.send(modifiedData)
    } catch(error) {
        return resp.status(400).json({error: error.message })
    }
}

const deleteUser = async (req, resp) => {
    const {id} = req.body
    try {
        const result = await userSchemaModel.findOneAndDelete({_id: id})
        if(!result) {
            throw new Error("User not found")
        }
        const updatedData = await userSchemaModel.find()
        return resp.send(updatedData)
    } catch(error) {
        return resp.status(400).json({error: error.message})
    }
}

module.exports = {createUser, userLogin, getAllUsers, updateUser, deleteUser}