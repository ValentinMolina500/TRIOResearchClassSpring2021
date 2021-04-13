import React,{useState} from 'react';

import {
  Heading
} from "@chakra-ui/react";

function useInput(defaultValue){
    const [value, setValue]= useState(defaultValue);

    function onChange(e){
        setValue(e.target.value);
    }
    return {
        value,
        onChange,
    };
}

function Login() {
    const inputProps = useInput();

    return (
        <div className="Login">
            <Heading>COVID-19 Vaccination Tracking Application</Heading>
            <div className ="Title">
                <h2>Login</h2><br /><br />
            </div>
            <div>
                <input {...inputProps}
                placeholder="Username" />
            </div>
            <div>
                <input {...inputProps}
                placeholder="Password" />
            </div>
            <button onClick={Login}>Login</button>;
        </div>
    );}

export default Login;
