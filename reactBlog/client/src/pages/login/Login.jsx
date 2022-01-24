
import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import './login.css';



function Login() {

    const userRef = useRef();
    const passwordRef = useRef();

    const { user, dispatch, isFetching } = useContext(Context)

    const [ error, setError ] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError(false);

        dispatch({type: 'LOGIN_STATUS'});
        
        try {

            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        } catch (error) {

            dispatch({type: "LOGIN_FAILURE"})
            setError(true)
            console.log(error);
        }
    }

    console.log(user);

    return (

        <div className="login">
        
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit} >
                <label>Username</label>
                <input 
                    type="text" 
                    className="loginInput" 
                    placeholder="Enter your username..." 
                    ref={userRef}
                />
                <label>Password</label>
                <input 
                    type="password" 
                    className="loginInput" 
                    placeholder="Enter your password..." 
                    ref={passwordRef} 
                />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>

            <button className="loginRegisterButton">
                <Link to={"/register"} className="link">
                    Register
                </Link>
            </button>

            {error && <span style={{color: "red", marginTop: "5px"}}>Something Went Wrong!</span> }

        </div>
    )
}

export default Login
