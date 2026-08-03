const responseToFront = (message, status, data = null)=>{
    return {
        message , status ,data
    }
}
module.exports = responseToFront