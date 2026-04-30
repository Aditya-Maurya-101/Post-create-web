const express=require('express');
const multer=require('multer');
const app=express();

const uploadFile = require('./services/stroage.service');
const postModel = require("./models/post.model");
const cors=require('cors');

const upload =multer({storage:multer.memoryStorage()});

app.use(cors());
app.use(express.json());

app.post('/create-post', upload.single("image"),async(req,res)=> {
    console.log(req.body)
    console.log(req.file)

    const result= await uploadFile(req.file.buffer)
   const post= await postModel.create({
    image:result.url,
    caption:req.body.caption
   })
   return res.status(200).json({
    message:"post created successfully",
    post
   })
})

app.get('/posts',async(req,res)=>{
    
    const posts=await postModel.find();
    return res.status(200).json({
        message: "Posts retrieved successfully",
        posts
    })
})

app.delete('/posts/:id',async(req,res)=>{
    const {id} = req.params;
    const post=await postModel.findByIdAndDelete(id);
    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }
    return res.status(200).json({
        message: "Post deleted successfully"
    })
})
app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports=app; 