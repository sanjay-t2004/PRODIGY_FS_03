import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Review = model("Review", reviewSchema);

export default Review;