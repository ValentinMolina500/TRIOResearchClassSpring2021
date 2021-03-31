import React from 'react';

function Login() {

    return (
        <div className="Login">
            <h1>COVID-19 Vaccination Tracking Application</h1>
            <div className ="Title"> 
                <h2>Login</h2><br /><br />
                <div>
              <form action="/action_page.php">
                  <label for="username">UserName: </label>
                  <input type="text" id="username" name="username"><br></br></input>
                  <input type="login" value="Login"></input>
              </form>
                </div>
            </div>
        </div>
    );
export default Login;
