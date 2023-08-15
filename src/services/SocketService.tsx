
const socketService = {
    init: (io: any) => {
        io.on("connection", (socket: any) => {
            const id = socket.conn.id
            console.log(id)		
        })
    }
}

module.exports = socketService