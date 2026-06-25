import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'gigglingplatypus@gmail.com';
        const adminPassword = 'GigglingPlatypus@123';
        
        // If the user already exists, update them to admin
        let existingUser = await User.findOne({ email: adminEmail });

        if (existingUser) {
            console.log('User exists, updating role to admin and resetting password...');
            existingUser.role = 'admin';
            existingUser.password = adminPassword; // It will be hashed by the pre-save hook
            await existingUser.save();
            console.log('✅ Admin user updated successfully!');
        } else {
            console.log('Creating new admin user...');
            await User.create({
                name: 'Giggling Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            console.log('✅ Admin user created successfully!');
        }

        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
