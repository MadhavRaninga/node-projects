const Blog = require("../models/blogModel")
const slugify = require("slugify")

exports.createBlog = async (req, res) => {
    try {
        const { title, description, content, category } = req.body

        if (!title || !description || !content || !category) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const extBlog = await Blog.findOne({ title })
        if (extBlog) {
            return res.status(401).json({message: "Blog Already Exist !"})
        }
        const blog = await Blog.create({
            title,
            slug: slugify(title, { lower: true }),
            description,
            content,
            category,
            image: req.file.path,
            author: req.user.id
        })
        res.status(201).json({ message: "Blog Added Successfully.", blog })

    } catch (error) {
        res.status(500).json({ message: "Error While Creating Blog !", error: error.message })
    }
}

exports.getallBlog = async(req, res) =>{
    try {
        const blog = await Blog.find()
        res.status(201).json({success : true, blog})
    } catch (error) {
        res.status(500).json({message: "Error While Get Blog", error: error}) 
    }
}

exports.getbyId = async(req, res) =>{
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(401).json({message: "Blog not Found !"})
        }
        res.status(201).json({success: true, blog})
        
    } catch (error) {
        return res.status(501).json({message: "Error while Get by Id !", error: error.message})
    }
}

exports.update = async(req, res)=> {
    const id = req.params.id
    if(!id){
        return res.status(404).json({message : "User not found"})
    }

    const { title, description, content, category } = req.body
    if (!title || !description || !content || !category) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const blog = await Blog.findByIdAndUpdate(id, 
        {title, description, content, category},
        {
            new: true,
            runValidators: true
        }
    )
    if (!blog) {
        return res.status(401).json({message: "Blog not Found !"})
    }
    res.status(201).json({message: "Blog Updated Successfully.", blog})

}

exports.deleteBlog = async(req, res) =>{
    try {
        const id = req.params.id
    
        const blog = await Blog.findByIdAndDelete(id)
    
        if (!blog) {
            return res.status(404).json({message: "Blog not Found"})
        }
        res.status(200).json({message: "Blog Deleted Successfully."})
        
    } catch (error) {
        res.status(500).json({message: "Error While delete Blog", error: error.message})
    }
}