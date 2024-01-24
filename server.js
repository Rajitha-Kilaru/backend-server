const express = require("express");
const cors = require("cors");
require('./DBConnection')
const authRoutes = require("./routes/AuthRoutes")

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRoutes)

const registerUsersData = []
let userId = 0;
// app.post("/register", async (request, response) => {
//     const { name, email, password, mobile } = request.body;
//     try {
//         if (name && email && password && mobile) {
//             userId++;
//             if(registerUsersData.filter((user) => user.email.includes(email)).length === 0){
//                 registerUsersData.push({...request.body, id: userId})
//             } else {
//                 throw new Error("User already exist, Please login")
//             }
//             console.log('19== register:', registerUsersData);
//             return response.status(200).json(registerUsersData);
//         }
//         throw new Error("Please fill all fields");
//     } catch(error) {
//         console.error('21==', error.message);
//         return response.status(400).json({error: error.message});
//     }
// });

// app.post("/login", async (request, response) => {
//     const {email, password} = request.body;
//     try {
//         if (email && password) {
//             if(registerUsersData.filter((user) => user.email.includes(email)).length){
//                 return response.status(200).json(registerUsersData.find((val) => val.email === email));
//             } else {
//                 throw new Error("New user, Create an Account")
//             }
//         }
//         throw new Error("Please fill all fields");
//     } catch(error) {
//         console.error('40==', error.message);
//         return response.status(400).json({error: error.message});
//     }
// });

// app.get("/users", async (req,res) => {
//     try {
//         return res.status(200).json(registerUsersData)
//     } catch(error) {
//         return res.status(400).json({error: "Failed to fetch users data"})
//     }
// })

// app.put('/updateUser', async (req,resp) => {
//     const { name, email, password, mobile, id } = req.body;
//     try {
//         if(name && email && password && mobile) {
//             if(registerUsersData.find((item) => item.id === id)) {
//                 registerUsersData[registerUsersData.findIndex(val => val.id === id)] = req.body
//                 console.log('61==', registerUsersData)
//                 return resp.status(200).json(registerUsersData)
//             }
//         } else {
//             throw new Error("Fill required fields")
//         }
//     } catch(error) {
//         return resp.status(400).json({error: error.message })
//     }
// })

app.delete('/deleteUser', async (req, resp) => {
    try {
        if(registerUsersData.find((item) => item.id === req.body.id)) {
            registerUsersData.splice(registerUsersData.findIndex(val => val.id === req.body.id), 1)
            console.log('77==', registerUsersData);
            return resp.status(200).json(registerUsersData)
        }
        throw new Error('something went wrong')
    } catch(error) {
        return resp.status(400).json({error: error.message})
    }
})

app.listen(3214, () => {
    console.log("29== Server is running on port 3214", registerUsersData);
});
