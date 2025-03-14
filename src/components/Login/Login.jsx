import React, { useState, useEffect, useReducer } from 'react'
import "./Login.css"
import Card from '../ui/Card'
import Button from '../ui/Button'

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return {
            value: action.value,
            isValid: action.value.includes("@")
        }
    }
    if (action.type === "INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.includes("@")
        }
    }
    return { value: "", isValid: false }
}

const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return {
            value: action.value,
            isValid: action.value.trim().length > 6
        }
    }
    if (action.type === "INPUT_BLUR") {
        return {
            value: state.value,
            isValid: state.value.trim().length > 6
        }
    }
    return { value: "", isValid: false }
}

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [emailState, emailDispatch] = useReducer(emailReducer, { value: "", isValid: null })
    const [passwordState, passwordDispatch] = useReducer(passwordReducer, { value: "", isValid: null })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormIsValid(emailState.isValid && passwordState.isValid)
        }, 500)

        return () => clearTimeout(timeout)
    }, [emailState.isValid, passwordState.isValid])

    const emailChangedHandler = (event) => {
        emailDispatch({
            type: "USER_INPUT",
            value: event.target.value
        })
    }

    const passwordChangedHandler = (event) => {
        passwordDispatch({ type:
            "USER_INPUT",
            value: event.target.value
        })
    }

    const emailValidateHandler = () => {
        emailDispatch({
            type: "INPUT_BLUR"
        })
    }

    const passwordValidateHandler = () => {
        passwordDispatch({
            type: "INPUT_BLUR"
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onLogin(emailState.value, passwordState.value)
    }

    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <div className={`control ${emailState.isValid === false ? "invalid" : ""}`}>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={emailState.value} 
                        onChange={emailChangedHandler} 
                        onBlur={emailValidateHandler}
                    />
                </div>
                <div className={`control ${passwordState.isValid === false ? "invalid" : ""}`}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={passwordState.value} 
                        onChange={passwordChangedHandler} 
                        onBlur={passwordValidateHandler}
                    />
                </div>
                <div className="actions">
                    <Button type="submit" disabled={!formIsValid}>Login</Button>
                </div>
            </form>
        </Card>
    )
}

export default Login