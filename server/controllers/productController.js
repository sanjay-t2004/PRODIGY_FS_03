import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import removeImage from "../utils/removeImage.js";

// create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, categoryId } = req.body;
        const image = req.file?.filename;

        const product = new Product({
            name,
            description,
            price,
            quantity,
            categoryId,
            image
        });
        await product.save();

        return res.status(201).json({
            message: "product created successfully!",
            payload: product
        })


    } catch (error) {
        res.status(500).json({ message: "problem creating product!", error: error.message })
        console.log(error)
    }
}

// edit product
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, categoryId } = req.body;
        const image = req.file?.filename;

        const product = await Product.findById(id);

        if (!product) return res.status(404).send("Product does not exist");

        if (image && product.image) removeImage(product.image);

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            quantity,
            categoryId,
            image
        }, { new: true });

        return res.status(200).json({
            message: "product updated successfully!",
            payload: updatedProduct
        })


    } catch (error) {
        res.status(500).json({ message: "problem updating product!", error: error.message })
        console.log(error)
    }
}

// delete product 
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).send("Product does not exist");
        if (product && product.image) removeImage(product.image);

        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            message: "product deleted successfully",
            payload: product
        })
    } catch (error) {
        res.status(500).json({ message: "problem deleting product!", error: error.message })
        console.log(error)
    }
}

// get one product
export const getOneProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug }).populate(["categoryId", "reviews"]);
        if (!product) return res.status(404).send("Product does not exist");

        return res.status(200).json({
            message: "product found successfully!",
            payload: product
        });

    } catch (error) {
        res.status(500).json({ message: "problem fetching product!", error: error.message })
        console.log(error)
    }
}

// get all
export const getAllProducts = async (req, res) => {
    try {
        const { searchQuery, categoryId } = req.body;
        const query = searchQuery ? searchQuery.trim() : "";

        // Create the search criteria
        let searchCriteria = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        };

        // If a category is provided, add it to the criteria
        if (categoryId) {
            searchCriteria.categoryId = categoryId;
        }

        const products = await Product.find(searchCriteria).populate(["categoryId", "reviews"]);

        return res.status(200).json({
            message: "products found successfully",
            payload: products
        });

    } catch (error) {
        res.status(500).json({ message: "problem fetching products!", error: error.message })
        console.log(error)
    }
}

// add to favorites
export const addToFavorites = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send('product does not exists')
        const user = await User.findById(userId);

        await User.findByIdAndUpdate(userId, {
            favorites: [...user.favorites, productId]
        }, { new: true });

        res.status(200).send('added to favorites successfully')
    } catch (error) {
        res.status(500).json({ message: "problem adding product to favorites!", error: error.message })
        console.log(error)
    }
}

// remove from favorites
export const removeFromFavorites = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send('product does not exists')

        await User.findByIdAndUpdate(userId, {
            $pull: { favorites: productId }
        }, { new: true });

        res.status(200).send('removed from favorites successfully')
    } catch (error) {
        res.status(500).json({ message: "problem removing product to favorites!", error: error.message })
        console.log(error)
    }
}