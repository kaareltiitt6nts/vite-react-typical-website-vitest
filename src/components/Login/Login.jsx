import React, { useEffect } from 'react'
import "./Login.css"
import Card from '../ui/Card'
import Button from '../ui/Button'
import { useState } from 'react'

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [emailIsValid, setEmailIsValid] = useState()
    const [passwordIsValid, setPasswordIsValid] = useState()
    const [formIsValid, setFormIsValid] = useState(false)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid)
        }, 500);

        return () => {
            clearTimeout(timeOut)
        }
    }, [emailIsValid, passwordIsValid])

    const emailChangedHandler = (event) => {
        setEnteredEmail(event.target.value)
    }

    const passwordChangedHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    const emailValidateHandler = () => {
        setEmailIsValid(enteredEmail.includes("@"))
    }

    const passwordValidateHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 8)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onLogin(enteredEmail, enteredPassword)
    }

    return (
        <Card className="login">
            <form>
                <div className={`control ${emailIsValid === false ? "invalid" : ""}`}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" value={enteredEmail} onChange={emailChangedHandler} onBlur={emailValidateHandler}/>
                </div>
                <div className={`control ${passwordIsValid === false ? "invalid" : ""}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={enteredPassword} onChange={passwordChangedHandler} onBlur={passwordValidateHandler}/>
                </div>
                <div className="actions">
                    <Button type="submit" disabled={!formIsValid} onClick={submitHandler}>Login</Button>
                </div>
            </form>
        </Card>
    )
}

export default Login