import dayjs, { Dayjs } from "dayjs"

const skippy = {
    tokenType: "API token",
    admin: {
      id: -1,
      f_name: "Skippy",
      l_name: "Skipperson",
      email: "Skippy@gmail.com",
      created: "2023-03-06T13:08:23-07:00",
      modified: null,
      deleted: null
    },
    created: dayjs().format(),
    iat: Date.now(),
    exp: 33235043936//expires in 1000 years
  }

  module.exports = skippy