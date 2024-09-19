import Review from '../models/reviewModel.js';

// create
export const createReview = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const review = await Review.create({ userId, content });

        return res.status(201).json({
            message: "review created successfully",
            payload: review
        })
    } catch (error) {
        res.status(500).json({ message: "problem creating review!", error: error.message })
        console.log(error)
    }
}

// edit
export const editReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const review = await Review.findByIdAndUpdate(id, { content }, { new: true });
        return res.status(200).json({
            message: "review edited successfully",
            payload: review
        })
    } catch (error) {
        res.status(500).json({ message: "problem editing review!", error: error.message })
        console.log(error)
    }
}

// delete
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        return res.status(200).json({
            message: "review deleted successfully",
            payload: deletedReview
        })
    } catch (error) {
        res.status(500).json({ message: "problem deleting review!", error: error.message })
        console.log(error)
    }
}

// get one
export const getOneReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('review does not exist!');
        return res.status(200).json({
            message: "review fetched successfully!",
            payload: review
        });
    } catch (error) {
        res.status(500).json({ message: "problem fetching review!", error: error.message })
        console.log(error)
    }
}

// get all
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        return res.status(200).json({
            message: "reviews found successfully",
            payload: reviews
        });

    } catch (error) {
        res.status(500).json({ message: "problem fetching reviews!", error: error.message })
        console.log(error)
    }
}