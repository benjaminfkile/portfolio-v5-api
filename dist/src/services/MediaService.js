"use strict";
const mediaService = {
    streamChunks: (s3, io, socketId, key, byteRange) => {
        const chunkSize = process.env.STREAM_CHUNK_SIZE ? parseInt(process.env.STREAM_CHUNK_SIZE) : 999999;
        const range = byteRange ? byteRange : `${0}-${chunkSize}`;
        const params = { Bucket: process.env.S3_BUCKET_NAME, Key: key, Range: `bytes=${range}` };
        s3.getObject(params, (err, data) => {
            if (!err) {
                io.to(socketId).emit("receive-file-chunks", data);
                const length = parseInt(data.ContentRange.split("/")[1]);
                const a = parseInt(range.split("-")[0]) + chunkSize + 1;
                const b = parseInt(range.split("-")[1]) + chunkSize + 1;
                const diff = length - a;
                const newRange = `${diff >= chunkSize ? a : length - diff}-${diff >= chunkSize ? b : length}`;
                if (diff > 0) {
                    mediaService.streamChunks(s3, io, socketId, key, newRange);
                }
            }
            else {
                console.log({ media: data, err: err });
            }
        });
    }
};
module.exports = mediaService;
