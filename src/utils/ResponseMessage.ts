const responseMessage = (success: boolean, data: any, message: any) => {
    return {
        success: success,
        data: data,
        message: message
    }
}

export default responseMessage