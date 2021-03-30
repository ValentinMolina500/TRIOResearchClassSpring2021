import React from 'react';

function Login() {
    const username= userInputName('');
    const password= userInputPassw('');
    return (
        <div className="Login">
            <h1>COVID-19 Vaccination Tracking Application</h1>
            <div className ="Title"> 
                <h2>Login</h2><br /><br />
                <div>
                Username<br />
                <input type= "name" {...username} />
                </div>
                <div>
                    Password<br />
                    <input type="password" {...password} />
                </div>
            </div>
        </div>
    );
}

export default Login;
