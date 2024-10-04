let {Router} = require('express');
let User = require('..//models/user');
// let{token} = require('..//Services/authentication');
let router = Router();

router.get("/signina",(req,res)=>{
    return res.render("signina");
});

router.get("/signupa",(req,res)=>{
    return res.render("signupa");
});

router.post("/signina",async(req,res)=>{
    let { email, password } = req.body;
   
    
    try{
        let token = await User.matchPasswordAndGenerateTocken(email, password);

    return res.cookie("token", token).redirect("/");

    }
    catch(error){
        return res.render('signina',{
            error : 'Incorrect Email or password'
        });
    }

});

router.get('/logout',(req,res)=> {
    res.clearCookie('token').redirect("/");
});

router.post("/signupa", async(req,res)=> {
    let { fullName, email, password } = req.body;
     await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});


module.exports = router;
