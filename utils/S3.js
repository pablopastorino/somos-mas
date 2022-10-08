import { v4 as uuidv4 } from 'uuid'
import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: 'AKIAQCNAUO4PD2O7HV5K',
  secretAccessKey: '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'
})

const myBucket = new AWS.S3({
  params: { Bucket: 'somos-mas' },
  region: 'us-east-1'
})

export const uploadFile = async file => {
  const params = {
    Body: file,
    Bucket: 'somos-mas',
    Key: `uploads/${uuidv4()}-${file.name}`
  }

  return await myBucket.upload(params).promise()
}
