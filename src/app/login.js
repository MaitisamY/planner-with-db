import { useEffect, useState } from 'react'
import validator from 'validator'
import axios from 'axios'

export default function Login() {

    const [serverResponse, setServerResponse] = useState('');

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleCredentials = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        })
    }

    const handleErrors = (e) => {
        const { name, value } = e.target;
        setErrors({
            ...errors,
            [name]: validation(name, value),
        })
    }

    const validation = (name, value) => {
        switch (name) {
            case 'email':
                return !value ? 'Email is required' :
                    !validator.isEmail(value) ? 'Email is not valid' : ''
            case 'password':
                return !value ? 'Password is required' :
                    value < 6 && value > 15 ? 'Password must be between 6 and 15 characters' : ''
            default:
                return ''
        }
    }    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        if (!email || !password) {
            setErrors({
                ...errors,
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
            })
        } else if (!validator.isEmail(email)) {
            setErrors({
                ...errors,
                email: 'Email is not valid',
            })
        } else if (password.length < 6 || password.length > 15) {
            setErrors({
                ...errors,
                password: 'Password must be between 6 and 15 characters',
            })
        } else {
            try {
                const response = await axios.post('http://localhost:3002/api/login', {
                    email,
                    password
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                });
                const data = response.data;
                if (data.status === 200 || data.status === 201) {
                    setServerResponse(data.message);
                }
                if (data.status === 401) {
                    setServerResponse(data.message);
                }
                if (data.status === 500) {
                    setServerResponse(data.message);
                }
                if (data.status === 409) {
                    setServerResponse(data.message);
                }
                if (data.status === 404) {
                    setServerResponse(data.message);
                }
            } catch (error) {
                console.error(error);
                // Handle error appropriately
                setServerResponse('An error occurred while processing your request.');
            }
        }
    };
    

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="E.g. john@mail.com" 
                    value={credentials.email} 
                    onChange={handleCredentials}
                    onMouseLeave={handleErrors}
                    onMouseOut={handleErrors}
                />
                {errors.email && <h4>{errors.email}</h4>}
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleCredentials} 
                    onMouseLeave={handleErrors}
                    onMouseOut={handleErrors}
                    autoComplete="off"
                />
                {errors.password && <h4>{errors.password}</h4>}
                {serverResponse && <h4>{serverResponse}</h4>}
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    )
}