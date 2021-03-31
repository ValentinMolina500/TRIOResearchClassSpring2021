import React from 'react';

function Login() {
    const username= userInput('');
    const password= userInput('');
    const [loading, setLoading]=useState(false);

    const handleLogin=()=>{prompt.history}
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
                <input type="button" value={loading ? 'Loading...' :'Login'} onClick={handleLogin} disabled={loading}/><br />

            </div>
        </div>
    );
}
const userInput= initialValue=>{const [value, setValue]= useState(initialValue);
return{
    value
}
}

export default Login;
