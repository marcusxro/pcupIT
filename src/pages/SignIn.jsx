import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Auth } from '../Auth'

const SignIn = () => {
    const nav = useNavigate()
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const showpass = useRef(null)
    const passwordEl = useRef(null)
    useEffect(() => {
        const unsub = onAuthStateChanged(Auth, (acc) => {
            if (!acc) {
                nav("/")
            } else {
                nav('/System')
            }
        })
        return () => { unsub() }
    }, [])
    
    const signIn = () => {
        if (password.length === 0) {
            alert("Password input is empty");
            return;
        } if (email.length === 0) {
            alert("Email input is empty");
            return;
        }
        else if (password.length <= 5) {
            alert("Password should be at least 6 characters long");
            console.log(password.length && email.length?email:password)
            return;
        }
        else {
            signInWithEmailAndPassword(Auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user.uid);
                    console.log("WELCOME", user.email)
                    nav('/System')

                }).catch((err) => {
                    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/too-many-requests' || err.code === 'auth/invalid-credential') {
                        alert("user not found")

                    } else {
                        console.error('Authentication error:', err);
                    }
                });
        }

    }


    const [bools, setBoolean] = useState(false)

    return (

        <div className='SignInCon'>
            <div className="signIn">
                <div className="signInText">
                    Sign in
                </div>
                <input type="email" placeholder='Type your email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type={`${bools ? "text" : "password"}`} ref={passwordEl} placeholder='Type your password' value={password} onChange={(e) => { setPassword(e.target.value) }} />

                <div className="showPass">

                    <div className="first">
                        <label ref={showpass} onClick={() => { setBoolean(!bools) }} htmlFor="check">Show password</label>
                        <input type="checkbox" name='check' onClick={() => { setBoolean(!bools) }} />
                    </div>

                    <div className="second">
                        Forgot your password? <span onClick={() => { nav('/Recover') }}>Click here</span>
                    </div>
                </div>
                <button onClick={() => { signIn() }}>Sign in</button>
            </div>
        </div>
    )
}

export default SignIn