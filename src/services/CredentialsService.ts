const as = require("../services/AuthService")
const skippy = require("../utils/Skippy")

const credService = {
    async checkCredentials(token: TokenTypes) {
        const shouldSkip = process.env.SKIP_AUTH === "true" ? true : false
        if (!shouldSkip) {
            try {
                const decodedToken = as.decodeToken(token)
                return { authenticated: true, decodedToken: decodedToken }
            } catch (err) {
                return { authenticated: false, err: err }
            }
        } else {
            return { authenticated: true, decodedToken: skippy }//fake token
        }
    }
}

module.exports = credService