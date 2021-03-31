import React,{useState} from 'react';


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
            <h1>COVID-19 Vaccination Tracking Application</h1>
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
