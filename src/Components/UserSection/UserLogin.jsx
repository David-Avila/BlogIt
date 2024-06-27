import { useState } from 'react'
import '../../App.css'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

export function UserLogin({setLogged}){
    const [mode, setMode] = useState(false);

    function handleChange(){
        setMode(prev => prev = !prev);
    }

    return (
        <div className='loginContainer flex column'>
            <SignInForm mode={mode} setLogged={setLogged}/>
            <SignUpForm mode={mode} setLogged={setLogged}/>

            <div className='otherOption'>
                <div className='line'/>
                <h4>or</h4>
                <button onClick={handleChange}>
                    {mode ? "Sign Up" : "Sign In"}
                </button>
            </div>
        </div>
    )
}
