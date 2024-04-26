import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';
import { Auth } from '../Auth';


const ForgotPassword = () => {
    const nav = useNavigate()

    const [email, setEmail] = useState('');

    const resetPassword = () => {
        if(email.length === 0) {
            alert("Please type something")
            return
        }
        sendPasswordResetEmail(Auth, email)
            .then(() => {
                setEmail('')
                alert("Verification sent!")
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    alert('User does not exist');
                    setEmail('')
                } else {
                    alert('There is some error');
                }
            });
    };
    
  return (
    <div className='forgotPassCon'>
        <div className="forgotPass">
            <div className="forgotText">
                Recover your account
            </div>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <div className="text">
                Click here to <span onClick={() => {nav('/')}}>Sign in</span>
            </div>
            <button onClick={resetPassword}>Send verification</button>
        </div>
    </div>
  )
}

export default ForgotPassword