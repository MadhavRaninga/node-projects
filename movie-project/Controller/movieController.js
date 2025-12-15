const Movie = require("../models/movieModel")
exports.addMovie = async (req, res) => {
    const { title, category, releaseYear, rating, description } = req.body
    if (!title || !category || !releaseYear || !rating || !description) {
        res.status(401).json({ message: "All Fields are Required !" })
    }

    const extMovie = await Movie.findOne({ title })
    if (extMovie) {
        return res.status(401).json({ message: "Movie Already Exist !" })
    }
    const addMovie = await Movie.create({
        title,
        category,
        releaseYear,
        rating,
        description
    })
    res.status(201).json({ success: true, message: "Movie added successfully", addMovie });
}

exports.getall = async (req, res) => {
    const movies = await Movie.find();
    res.status(200).json({ success: true, movies });
}

exports.getbyId = async (req, res) => {
    const id = req.params.id
    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).json({ message: "Movie not found !" });
    }

    res.status(200).json({ success: true, movie });
}

exports.update = async (req, res) => {
    const id = req.params.id
    const {title, rating, category} = req.body
    const movie = await Movie.findByIdAndUpdate(id,
        { title, rating, category },
        {
            new: true,
            runValidators: true
        }
    )
    if (!movie) {
        return res.status(404).json({ message: "Movie not found !" });
    }

    res.status(200).json({ message: "Movie Updated Successfully.", movie });
}

exports.deleteMovie = async (req, res) => {
    const id = req.params.id
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
        return res.status(404).json({ message: "Movie not found !" });
    }
    res.status(200).json({success: true, message: "Movie Deleted Successfully."});
}