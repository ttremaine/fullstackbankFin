const UserContext = React.createContext({
  name:"", 
  email:"",
  password:"",
  balance:0,
  isLogin: false,
  isAuth: false,
});

function Spa() {
  const initialContext = React.useContext(UserContext);
  const [state, dispatch] = React.useReducer(usersReducer, initialContext);

  return (
    <HashRouter>
        <NavBar/>        
        <UserContext.Provider value={{ state, dispatch }}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/createaccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/logout/" component={Logout} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
