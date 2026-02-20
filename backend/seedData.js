import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const products = [
    { id: 1, name: "Espresso", type: "Coffee", category: "Hot Coffee", price: 120, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800", available: true, rating: 4.5, brewTime: "30 sec", calories: 5 },
    { id: 2, name: "Americano", type: "Coffee", category: "Hot Coffee", price: 140, image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=800", available: true, rating: 4.2, brewTime: "2 min", calories: 2 },
    { id: 3, name: "Cappuccino", type: "Coffee", category: "Hot Coffee", price: 180, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800", available: true, rating: 4.7, brewTime: "4 min", calories: 80 },
    { id: 4, name: "Latte", type: "Coffee", category: "Hot Coffee", price: 190, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800", available: true, rating: 4.9, brewTime: "3 min", calories: 120 },
    { id: 5, name: "Mocha", type: "Coffee", category: "Hot Coffee", price: 210, image: "https://images.unsplash.com/photo-1544813545-4827b64fcacb?q=80&w=800", available: true, rating: 4.8, brewTime: "5 min", calories: 230 },
    { id: 6, name: "Flat White", type: "Coffee", category: "Hot Coffee", price: 200, image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800", available: true, rating: 4.5, brewTime: "3 min", calories: 90 },
    { id: 7, name: "Macchiato", type: "Coffee", category: "Hot Coffee", price: 170, image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800", available: true, rating: 4.6, brewTime: "3 min", calories: 40 },
    { id: 8, name: "Cold Brew", type: "Coffee", category: "Cold Coffee", price: 220, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800", available: true, rating: 4.6, brewTime: "12-24 hours", calories: 5 },
    { id: 9, name: "Iced Latte", type: "Coffee", category: "Cold Coffee", price: 210, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800", available: true, rating: 4.5, brewTime: "5 min", calories: 110 },
    { id: 10, name: "Iced Mocha", type: "Coffee", category: "Cold Coffee", price: 230, image: "https://images.unsplash.com/photo-1524350300060-da39efdd1746?q=80&w=800", available: true, rating: 4.7, brewTime: "5 min", calories: 210 },
    { id: 11, name: "Frappuccino", type: "Coffee", category: "Cold Coffee", price: 250, image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=800", available: true, rating: 4.8, brewTime: "5 min", calories: 280 },
    { id: 12, name: "Vanilla Frappe", type: "Coffee", category: "Cold Coffee", price: 260, image: "https://images.unsplash.com/photo-1572490122709-66850fcc1fae?q=80&w=800", available: true, rating: 4.6, brewTime: "5 min", calories: 250 },
    { id: 13, name: "Caramel Frappe", type: "Coffee", category: "Cold Coffee", price: 270, image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800", available: true, rating: 4.9, brewTime: "5 min", calories: 310 },
    { id: 14, name: "Hazelnut Latte", type: "Coffee", category: "Specialty Coffee", price: 240, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800", available: true, rating: 4.7, brewTime: "4 min", calories: 180 },
    { id: 15, name: "Irish Coffee", type: "Coffee", category: "Specialty Coffee", price: 280, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800", available: false, rating: 4.4, brewTime: "6 min", calories: 210 },
    { id: 16, name: "Hot Chocolate", type: "Beverages", category: "Beverages", price: 180, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800", available: true, rating: 4.8, brewTime: "5 min", calories: 190 },
    { id: 17, name: "Green Tea", type: "Beverages", category: "Beverages", price: 150, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800", available: true, rating: 4.3, brewTime: "3 min", calories: 2 },
    { id: 18, name: "Masala Chai", type: "Beverages", category: "Beverages", price: 130, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800", available: true, rating: 4.6, brewTime: "5-7 min", calories: 60 },
    { id: 19, name: "Lemon Tea", type: "Beverages", category: "Beverages", price: 140, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800", available: true, rating: 4.5, brewTime: "3 min", calories: 10 },
    { id: 20, name: "Blueberry Muffin", type: "Snacks", category: "Snacks", price: 160, image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800", available: true, rating: 4.7, calories: 320 },
    { id: 21, name: "Chocolate Croissant", type: "Snacks", category: "Snacks", price: 180, image: "https://images.unsplash.com/photo-1530610476181-d8ec43054b21?q=80&w=800", available: true, rating: 4.8, calories: 280 },
    { id: 22, name: "Veg Sandwich", type: "Snacks", category: "Snacks", price: 200, image: "https://images.unsplash.com/photo-1539252554452-96befb0ea9fb?q=80&w=800", available: true, rating: 4.4, calories: 210 },
    { id: 23, name: "Chicken Sandwich", type: "Snacks", category: "Snacks", price: 240, image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=800", available: true, rating: 4.6, calories: 340 },
    { id: 24, name: "Paneer Wrap", type: "Snacks", category: "Snacks", price: 230, image: "https://images.unsplash.com/photo-1626700051175-6518a4e94ef4?q=80&w=800", available: true, rating: 4.5, calories: 290 },
    { id: 25, name: "French Fries", type: "Snacks", category: "Snacks", price: 150, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800", available: true, rating: 4.3, calories: 310 },
    { id: 26, name: "Cheese Burger", type: "Snacks", category: "Snacks", price: 260, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", available: true, rating: 4.8, calories: 450 },
    { id: 27, name: "Brownie", type: "Desserts", category: "Desserts", price: 170, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=800", available: true, rating: 4.9, calories: 240 },
    { id: 28, name: "Chocolate Cake", type: "Desserts", category: "Desserts", price: 220, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800", available: true, rating: 4.7, calories: 380 },
    { id: 29, name: "Cheesecake", type: "Desserts", category: "Desserts", price: 250, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800", available: true, rating: 4.3, calories: 410 },
    { id: 30, name: "Ice Cream Sundae", type: "Desserts", category: "Desserts", price: 240, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800", available: true, rating: 4.6, calories: 320 }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('✅ Successfully seeded database with products');
        console.log(`📦 Inserted ${products.length} products`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
