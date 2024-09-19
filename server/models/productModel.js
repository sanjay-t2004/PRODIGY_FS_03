import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: false
    }],
    slug: {
        type: String,
        unique: true
    }
})

productSchema.pre("save", function (next) {
    this.slug = slugify(`${this.name} ${this._id}`, { lower: true });
    next();
});

const Product = model("Product", productSchema);
export default Product;