'use server'
import { sql } from '@vercel/postgres'

export const getUser = async (email) => {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        return user;
    } catch (error) {
        // Handle database query error
        console.error('Error fetching user:', error);
        throw { statusCode: 500, message: 'Error fetching user' }; // Throw custom error
    }
}