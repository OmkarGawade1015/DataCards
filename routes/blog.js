let {Router} = require('express');
let multer = require("multer");
let path = require("path");
let Blog = require('../models/blog');
const Comments = require('../models/comment');
let router = Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        let fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName);
    },
  });
  let upload = multer({storage : storage});

router.get('/add-new',(req,res)=> {
    return res.render('addblog',{
        user : req.user,
    });
});

router.get('/:id',async(req,res)=>{
    let blog = await Blog.findById(req.params.id).populate("createdBy");
    let comment = await Comments.find({blogId : req.params.id}).populate("createdBy");
    return res.render('blog1',{
        user : req.user,
        blog,
        comment,
    });
});

router.post('/comment/:blogId',async(req,res)=>{
    await Comments.create({
        content : req.body.content,
        blogId : req.params.blogId,
        createdBy : req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
})
router.post('/',upload.single('coverImage'),async(req,res)=> {
    let {title, body} = req.body;
    let blog = await Blog.create({
        body,
        title,
        createdBy : req.user._id,
        coverImage : `/uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`);
    
});

module.exports = router;