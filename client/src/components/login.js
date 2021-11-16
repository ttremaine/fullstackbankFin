import React from "react";
import bootstrap from "bootstrap";
import Card from "./context";
import { UserContext } from "../App";

function Login(){
    const { state, dispatch }     = React.useContext(UserContext);
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [success, setSuccess]   = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [balance, setBalance]   = React.useState(0);
    const [isLogin, setIsLogin]   = React.useState(false);
    const [isAuth, setIsAuth]     = React.useState(false);

    const atLogin = state.isLogin;
    const atAuth = state.isAuth;
    const atEmail = state.email;
    

    React.useEffect(() => {

      if(state.isLogin) {
        setShow(false);
        setStatus(state.email + " is logged in");
        setEmail(state.email);
        //setBalance(state.balance);
      } else {
        setEmail('');
        setShow(true);
      }

      fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                setIsLogin(data.isLogin);
                setEmail(data.email)
                setBalance(data.balance);
                console.log('JSON:', data);
                console.log(data.balance);
            } catch(err) {
                console.log('err:', text);
            }
        });
      

    }, []);

    function validate(field, label) {
      if (!field) {
        setStatus('Error: ' + label);
        alert("Error: " + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      } else

        return true;
    }


    function updateStateLogin() {
      const loginUser = { 
        name: name,
        email: email,
        password: password,
        balance: balance,
        isLogin: isLogin,
        isAuth: isAuth
      };
      console.log('update: ' + balance);
      dispatch( { type: "LOGIN_USER", payload: { loginUser }});
    }

    function updateStateLogout() {
      const logoutUser = { 
        name: name,
        email: email,
        password: password,
        balance: balance,
        isLogin: isLogin,
        isAuth: isAuth
      };
      console.log('update: ' + balance);
      dispatch( { type: "LOGOUT_USER", payload: { logoutUser }});
    }

    function handleLogout() {
      fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                setBalance(data.balance);
                console.log('JSON:', data);
                console.log(data.balance);
            } catch(err) {
                setStatus(text)
                setShow(true);
                setPassword('');
                console.log('err:', text);
            }
        });
      setIsLogin(false);
      setStatus('');
      setName('');
      setEmail('');
      setPassword('');
      setBalance(0);
      setIsAuth(false);
      setShow(true);
      updateStateLogout();
    }
  
    function handleLogin() {
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;

      fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                setBalance(data.balance);
                console.log('JSON:', data);
                console.log(data.balance);
            } catch(err) {
                setStatus(text)
                setShow(true);
                setPassword('');
                console.log('err:', text);
            }
        });
      setStatus('');
      setIsLogin(true);
      setShow(false);
      updateStateLogin();
    }    
    
    return (
      <Card
        bgcolor="primary"
        header="Login"
        //status={status}
        
        body={show ? (  
                <>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" disabled={!email && !password} onClick={handleLogin}>Login</button>
                </>
              ):(
                <>
                <h5>Logged In</h5>
                <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button>
                </>
              )}
        useraccount={state.email}
      />
    )
  }

  export default Login;