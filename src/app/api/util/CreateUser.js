'use server'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'

export const createUser = async (username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
            INSERT INTO users (username, email, password) VALUES 
            (${username}, ${email}, ${hashedPassword}) RETURNING *`;
        
        return { statusCode: 200, message: 'User created successfully' };
    } catch (error) {
        // Handle database query error
        console.error('Error creating user:', error);
        throw { statusCode: 500, message: 'Error creating user' }; // Throw custom error
    }
}