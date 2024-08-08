import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const { showalert } = props
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let Navigate = useNavigate()
    const handlelogin = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/author/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem("token", json.token)
            showalert("Login SuccessFully Compeleted", "success")
            Navigate('/')
        } else {
            setcredentials({ email: "", password: "" })
            showalert("Plz try to login with correct credentails", "danger")
        }
    }
    const onnChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <div className="container loginbox w-50" >
            <h1 className='d-flex justify-content-center lhanding'>Login-Page</h1>
            <hr />
            <form className='my-3' onSubmit={handlelogin}>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onnChange} />
                </div>
                <div className="form-group my-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={credentials.password} onChange={onnChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <hr />
                <Link class="LtoS d-flex justify-content-center" to="/signup" >I don't Have an Account,Create Account</Link>
            </form>
            </div>
        </>
    )
}

export default Login