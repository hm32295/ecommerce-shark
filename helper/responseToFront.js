const responseToFront = (message, status, data = null, count) => {
    if(!count)return { message , status ,data  }
    if(count)return { message , status ,data ,count  }
}
module.exports = responseToFront