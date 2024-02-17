export default function Signup() {
    return (
        <div>
            <form action="">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" autoCapitalize="true" placeholder="E.g. John Doe" />
                {/* Error message... */}
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="E.g. john@mail.com" />
                {/* Error message... */}
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" />
                {/* Error message... */}
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" />
                <button className="btn" type="submit">Sign Up</button>
            </form>
        </div>
    )
}