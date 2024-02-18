'use server'
import validator from 'validator';
import bcrypt from 'bcrypt';
import { getUser } from '@/app/api/util/SignInValidation';

export const SignInValidation = async ({ email, password }) => {
    try {
        const validateEmail = validator.isEmail(email);

        if (!email) {
            throw { statusCode: 400, message: 'Email is required' };
        } else if (!validateEmail) {
            throw { statusCode: 400, message: 'Email is not valid' };
        } else if (email.includes(' ')) {
            throw { statusCode: 400, message: 'Email cannot contain spaces' };
        }

        if (!password) {
            throw { statusCode: 400, message: 'Password is required' };
        } else if (password.length < 6 || password.length > 15) {
            throw { statusCode: 400, message: 'Password must be between 6 and 15 characters' };
        } else if (password.includes(' ')) {
            throw { statusCode: 400, message: 'Password cannot contain spaces' };
        } else if (password.includes('\n')) {
            throw { statusCode: 400, message: 'Password cannot contain new lines' };
        }

        const user = await getUser(email);

        if (!user) {
            throw { statusCode: 404, message: 'Invalid email' };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw { statusCode: 401, message: 'Invalid password' };
        }

        // If everything is valid, return success
        return { statusCode: 200, message: 'Successfully signed in' };
    } catch (error) {
        // If an error occurred, return the error details
        return error;
    }
};
