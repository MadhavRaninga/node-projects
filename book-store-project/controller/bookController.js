const Book = require("../model/model")

exports.addbook = async (req, res) => {
    const { name, author, price } = req.body
    if (!name || !author || !price) {
        return res.status(404).json({ message: "All Fields are Required !" })
    }
    const extBook = await Book.findOne({ name })
    if (extBook) {
        return res.status(404).json({message: "Book is Already Exist !"})
    }
    const newBook = await Book.create({
        name,
        author,
        price
    })
    res.status(201).json({ message: "Book Added Successfully..", newBook })
}

exports.getall = async(req, res) =>{
    const books = await Book.find()
    res.status(201).json({success: true, books})
}

exports.getbook = async(req, res) => {
    const id = req.params.id
    const book = await Book.findById(id)
    if (!book) {
        return res.status(401).json({message: "Book not Found !"})
    }
    res.status(201).json({message:"Book Found Successfully.", book})
}

exports.update = async(req, res) => {
    const id = req.params.id
    const {name, author, price} = req.body
    const book = await Book.findByIdAndUpdate(id, 
        {
            name,author, price
        },
        {
            new: true,
            runValidators: true
        }
    )
    if (!book) {
        return res.status(401).json({message: "Book not Found !"})
    }
    res.status(201).json({message: "Book Details Updated successfully..", book})
}

exports.deleteBook = async(req, res) => {
    const id = req.params.id

    const book = await Book.findByIdAndDelete(id)
    if (!book) {
        return res.status(401).json({message: "Book not Found !"})
    }
    res.status(201).json({message: "Book Deleted Successfully." , success:true})
}