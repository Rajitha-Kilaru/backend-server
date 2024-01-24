const mongoose = require("mongoose")

const MONGODB_URL = "mongodb+srv://krajitha061:KilaruRajitha21@rajitha-database.pz6uc3c.mongodb.net/"

mongoose.connect(MONGODB_URL).then(() => {
    console.log('DATABASE CONNECTED....')
}).catch((err) => {
    console.log('DB CONNECTED ISSUE', err)
})