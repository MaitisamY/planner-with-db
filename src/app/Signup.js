export default function Signup() {
    return (
        <div>
            <form action="">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" autoCapitalize="true" />
                {/* Error message... */}
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                {/* Error message... */}
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                {/* Error message... */}
                <button className="btn" type="submit">Sign Up</button>
            </form>
        </div>
    )
}