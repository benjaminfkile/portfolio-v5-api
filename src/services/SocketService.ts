
const socketService = {
    intit(io: any, /*db: any*/) {
        io.on("connection", (socket: any) => {
            // const id = socket.conn.id
            // socket.on("send-page-data", (keys: string[]) => {
            //     io.emit("receive-page-data", this.getPageData(io, db))
            // })
        })
    },
}

module.exports = socketService
