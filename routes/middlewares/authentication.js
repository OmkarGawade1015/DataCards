const { validateToken } = require("../Services/authentication");

function checkauthenticationcookie(cookieName){
    return (req, res, next)=> {
        let tokencookieValue = req.cookies[cookieName]
        if(!tokencookieValue){
          return  next();
        }

        try{
        let userPayload = validateToken(tokencookieValue);
        req.user = userPayload;
        
        }
        catch(error){    
        }
        return next();

    }
}

module.exports ={
    checkauthenticationcookie,
};