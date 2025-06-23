const express = require('express')
const app = express()
const multer =require('multer')
const path = require('path')
const {v2:cloudinary}=require('cloudinary')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'uploads/')
//     },
//     filename:(req,file,cb)=>{
//         const fileName = Date.now()+'-'+file.originalname
//         cb(null,fileName)
//     }
// })

// const upload = multer({storage:storage})

// app.post('/upload',upload.single('myfile'),(req,res)=>{
//     res.json({
//         msg:"File uploaded successfully",
//         filedetails:req.file
//     })
// })

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"uploads",
        allowed_formats:['jpg','jpeg','png','webp'],
        transformations:[{ width: 500, height: 500, crop: 'limit' }]
    }
})

const upload = multer({storage:storage})

app.post('/upload',upload.single('image'),(req,res)=>{
    res.json({
        msg:"file uploaded successfully",
        file:req.file
    })
})



app.listen(3000,()=> console.log('server runnign on 3000'))