let { createHmac, randomBytes } = require('crypto');
let {Schema, model}= require('mongoose');
const { createTokenUser } = require('../Services/authentication');
let userSchema = new Schema({
    fullName : {
        type : 'String',
        required : 'true'
    },

    email : {
        type : 'String',
        required : 'true',
        unique : 'true'
    },

    salt : {
        type: 'String',

    },
    password : {
        type: 'String',
        required: 'true'
    },

    ProfileImage : {
        type: 'String',
        default : "/images/avtar.jpeg"

    },

    Role : {
        type: 'String',
        enum : ["USER","ADMIN"],
        default : "USER"

    },
  
},
{ timestamps : true});


userSchema.pre("save", function(next) {
    let user = this;
    
    if (!user.isModified('password')) return;

    let salt = randomBytes(16).toString();
    let hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
        
    }
    
)

userSchema.static('matchPasswordAndGenerateTocken',async function(email, password){
    let user =await this.findOne({email});

    if(!user) throw new Error('user not found');

    let salt = user.salt;
    let hashedPassword = user.password;

    // console.log('Salt',salt);
    // console.log('Stored Hashed Password',hashedPassword);

    let userProvideHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

    if(hashedPassword !== userProvideHash) throw new Error('Incorrect Password');

    let token = createTokenUser(user);
    return token;
})
let User = model('user',userSchema);
module.exports= User;