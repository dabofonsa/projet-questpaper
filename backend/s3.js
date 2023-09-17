require('dotenv').config()

var S3 = require('aws-sdk/clients/s3');

const fs = require('fs') 



//bucket config data
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accesskeyId = process.env.AWS_ACCESS_KEY_ID
const secretAcesskey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new S3({
     region,
     accesskeyId,
     secretAcesskey
})


//upload de fichier vers amazon s3


 const uploadFile = (file) =>{
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}


exports.uploadFile= uploadFile;




//upload de fichier vers amazon s3Telechargement de fichier depuis amazon s3\

