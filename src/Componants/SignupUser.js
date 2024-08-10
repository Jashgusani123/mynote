import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignupUser = (props) => {
    const { showalert} = props
    const [data, setdata] = useState({name:"", email: "", password: "" })
    let Navigate = useNavigate()
    const onChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value }) 
    }

    const handlesignup = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/author/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:data.name, email: data.email, password: data.password }),
        });
        const json = await response.json()
        
        if(json.success){
            localStorage.setItem("Token" , json.token)
            showalert("Signup SuccessFully Compeleted" , "success")
            Navigate('/')
        }else{
            setdata({name:"", email: "", password: "" })
            showalert("Enter Valid Credentials" , "danger")
        }
    }
    return (
        <>
        <div className="container signupbox w-50" >
            <h1 className='d-flex justify-content-center lhanding'>Signup-Page</h1>
            <hr />
            <form className='container my-3' onSubmit={handlesignup}>
                <div className="form-group my-1">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" value={data.name} onChange={onChange}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={data.email} placeholder="Enter email" onChange={onChange}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="form-control" id="Password" name="password" placeholder="Password" value={data.password} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary my-1" >Sign Up</button>
                <hr />
                <Link class="LtoS d-flex justify-content-center" to="/login" >Alreday Have an Account</Link>
            </form>
            </div>
        </>
    )
}

export default SignupUser