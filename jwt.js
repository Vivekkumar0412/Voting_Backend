let jwt = require('jsonwebtoken');
const secret = "vivek";

const verifyJwtTokenMiddleware = async function(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization){
        res.status(401).json({msg : "No token found !"})
        return next("auth error")
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const Data = jwt.verify(token,secret);
        req.decodedData = Data;
        // res.status(201).json({decodedData : Data})
        next();
    } catch (error) {
        res.status(401).json({msg : error})
        next();
    }
};

const generateJwtToken = function(userPayLoad){
    try {
        console.log(userPayLoad,"userPayLoad")
        const token = jwt.sign(userPayLoad, secret);
        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = {generateJwtToken , verifyJwtTokenMiddleware};


