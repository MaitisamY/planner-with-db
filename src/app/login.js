import { useEffect, useState } from 'react'
import validator from 'validator'

export default function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        }
    });

    const handleCredentials = (e, checkError) => {
        const { name, value } = e.target;
        if (checkError) {
            setCredentials({
                ...credentials,
                [name]: value,
                errors: {
                    ...credentials.errors,
                    [name]: validation(name, value),
                }
            })
        }
        setCredentials({
            ...credentials,
            [name]: value,
            errors: {
                ...credentials.errors,
                [name]: '',
            }
        })
    }

    const validation = (name, value) => {
        switch (name) {
            case 'email':
                return !value ? 'Email is required' :
                    !validator.isEmail(value) ? 'Email is not valid' : ''
            case 'password':
                return !value ? 'Password is required' :
                    value < 6 ? 'Minimum length of password is 6' :
                    value > 15 ? 'Maximum length of password is 15' : ''
            default:
                return ''
        }
    }    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        if (!email || !password) {
            setCredentials({
                ...credentials,
                errors: {
                    ...credentials.errors,
                    email: !email ? 'Email is required' : '',
                    password: !password ? 'Password is required' : '',
                }
            })
        } else if (!validator.isEmail(email)) {
            setCredentials({
                ...credentials,
                errors: {
                    ...credentials.errors,
                    email: 'Email is not valid'
                }
            })
        } else if (password < 6) {
            setCredentials({
                ...credentials,
                errors: {
                    ...credentials.errors,
                    password: 'Minimum length of password is 6'
                }
            })
        } else if (password > 15) {
            setCredentials({
                ...credentials,
                errors: {
                    ...credentials.errors,
                    password: 'Maximum length of password is 15'
                }
            })
        } else {
            const loginData = {
                email,
                password
            }
            console.log('Task data:', signinData);
        }
    }

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
                    onChange={(e) => handleCredentials(e, false)}
                    onMouseLeave={(e) => handleCredentials(e, true)}
                    onMouseOut={(e) => handleCredentials(e, true)}
                />
                {credentials.errors.email && <h4>{credentials.errors.email}</h4>}
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => handleCredentials(e, false)} 
                    onMouseLeave={(e) => handleCredentials(e, true)}
                    onMouseOut={(e) => handleCredentials(e, true)}
                />
                {credentials.errors.password && <h4>{credentials.errors.password}</h4>}
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    )
}