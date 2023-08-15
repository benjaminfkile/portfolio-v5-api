import * as AWS from "aws-sdk"
import { S3ReadStream } from "s3-readstream"

export default async function createAWSStream(key: string): Promise<S3ReadStream> {
    return new Promise((resolve, reject) => {
        const bucketParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        }

        try {
            const s3 = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            })
            //@ts-ignore
            s3.headObject(bucketParams, (error, data) => {
                if (error) {
                    throw error
                }

                const options = {
                    parameters: bucketParams,
                    s3,
                    maxLength: data.ContentLength,
                    byteRange: 1024 * 1024 * 5
                }
                //@ts-ignore
                const stream = new S3ReadStream(options)

                resolve(stream)
            })
        } catch (error) {
            reject(error)
        }
    })
}