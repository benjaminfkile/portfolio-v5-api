type TokenTypes = {
    tokenType: string,
    user: {
        id: number,
        f_name: string,
        l_name: string,
        email: string,
    },
    created: string,
    iat: number,
    exp: number
}