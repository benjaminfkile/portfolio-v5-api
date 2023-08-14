const mediaService = {
    
    streamChunks: (s3: any, key: string, byteRange?: string) => {

        const chunkSize = process.env.STREAM_CHUNK_SIZE ?  parseInt(process.env.STREAM_CHUNK_SIZE) : 999999
        const range = byteRange ? byteRange : `${0}-${chunkSize}`
        const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: key, Range: `bytes=${range}` }
        console.log(range)
        s3.getObject(params, (err: any, data: any) => {
            if (!err) {
                mediaService.emit(data)
                const length = parseInt(data.ContentRange.split("/")[1])
                const a = parseInt(range.split("-")[0]) + chunkSize + 1
                const b = parseInt(range.split("-")[1]) + chunkSize + 1
                const diff = length - a
                const newRange = `${diff >= chunkSize ? a : length - diff}-${diff >= chunkSize ? b : length}`
                if (diff > 0) {
                    mediaService.streamChunks(s3, key, newRange)
                }
            } else {
                console.log({ media: data, err: err })
            }
        })
    },
    emit: (data: any) => {
        console.log(data)
    }
}

module.exports = mediaService