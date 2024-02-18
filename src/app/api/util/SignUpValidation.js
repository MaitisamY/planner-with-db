'use server'
import validator from 'validator';
import { getUser } from '@/app/api/util/SignInValidation';

export const SignUpValidation = async ({ username, email, password, confirmPassword }) => {
    try {
        const validateUsername = validator.isAlphanumeric(username);
        const validateEmail = validator.isEmail(email);

        if (!username) {
            throw { statusCode: 400, message: 'Username is required' };
        } else if (username.length < 6 || username.length > 15) {
            throw { statusCode: 400, message: 'Username must be between 6 and 15 characters' };
        } else if (username.includes(' ')) {
            throw { statusCode: 400, message: 'Username cannot contain spaces' };
        } else if (!validateUsername) {
            throw { statusCode: 400, message: 'Username must be Alpha-Numeric' };
        }

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

        if (!confirmPassword) {
            throw { statusCode: 400, message: 'Confirm Password is required' };
        } else if (confirmPassword.length < 6 || confirmPassword.length > 15) {
            throw { statusCode: 400, message: 'Password must be between 6 and 15 characters' };
        } else if (confirmPassword.includes(' ')) {
            throw { statusCode: 400, message: 'Password cannot contain spaces' };
        } else if (confirmPassword.includes('\n')) {
            throw { statusCode: 400, message: 'Password cannot contain new lines' };
        }

        if (password !== confirmPassword) {
            throw { statusCode: 400, message: 'Passwords do not match' };
        }

        const user = await getUser(email);

        if (user) {
            throw { statusCode: 400, message: 'Email already exists' };
        }

        // If everything is valid, return success
        return { statusCode: 200, message: 'Signed up Successfully' };
    } catch (error) {
        // If an error occurred, return the error details
        return error;
    }
}
