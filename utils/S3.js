import { v4 as uuidv4 } from 'uuid'
import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
  params: { Bucket: process.env.AWS_BUCKET_NAME },
  region: process.env.AWS_REGION
})

export const uploadFile = async file => {
  const params = {
    Body: file,
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuidv4()}-${file.name}`
  }

  return await myBucket.upload(params).promise()
}
