"use strict";
const socketService = {
    init: (io) => {
        io.on("connection", (socket) => {
            const id = socket.conn.id;
            console.log(id);
        });
    }
};
module.exports = socketService;
