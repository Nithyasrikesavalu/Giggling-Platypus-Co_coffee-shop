import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    detailedDescription: {
        type: String
    },
    ingredients: [{
        type: String
    }],
    preparation: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    brewTime: {
        type: String
    },
    servingSize: {
        type: String
    },
    size: {
        type: String
    },
    calories: {
        type: Number,
        default: 0
    },
    caffeine: {
        type: String,
        enum: ['None', 'Low', 'Medium', 'High']
    },
    tags: [{
        type: String
    }],
    tag: {
        type: String
    },
    tagColor: {
        type: String
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
