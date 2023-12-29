const response = (statusCode, data, message, res) => {
    res.status(statusCode).json( {
        payload: 
            data,
            message
        ,
        
        metadata: {
            prev: "",
            next: "",
            max: ""
        }
    })
}

module.exports = response;