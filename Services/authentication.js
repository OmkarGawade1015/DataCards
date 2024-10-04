let JWT = require('jsonwebtoken');


let secret = "ShivShambhu1630/1689";

function createTokenUser(user){
    let payload ={
        _id : user._id,
        Email : user.email,
        ProfileImage : user.ProfileImage,
        Role : user.Role,
    };
    let token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    let payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenUser,
    validateToken,
};