export default function Login() {
    return (
        <div>
            <form action="">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                {/* Error message... */}
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                {/* Error message... */}
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    )
}