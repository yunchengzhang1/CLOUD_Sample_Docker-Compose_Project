import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { BattlePage } from './BattlePage';
import { Login } from './Login'; 
import { Registration } from "./Registration";

class App extends Component{
  state={
    userID: null,
    isAuthenticated: false
  }

  setUser(id){
    this.setState({isAuthenticated: true});
    this.setState({userID: id});
    console.log("authenticated with ", id);
  }

  render(){
    return <Router>
      <Switch>
        <Route exact path="/" render={() => <Login onSetUser={id => this.setUser(id)} isAuthenticated={this.state.isAuthenticated}/>}/>
        <Route exact path="/registration" render={() => <Registration onSetUser={id => this.setUser(id)} isAuthenticated={!this.state.isAuthenticated}/>}/>
        <Route exact path="/battlePage" render={()=> <BattlePage userID={this.state.userID} isAuthenticated={this.state.isAuthenticated}/>}/>
      </Switch>
    </Router>
  }
}

export default App;


































































// // React functional component
// function App () {
//   // state for storage of the information on the webpage of forms and list, uses hooks
//   const [number, setNumber] = useState("")
//   const [values, setValues] = useState([])

//   // ENTER YOUR EC2 PUBLIC IP/URL HERE
//   const ec2_url = ''
//   // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
//   const ec2 = false;
//   // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
//   const url = ec2 ? ec2_url : 'localhost'

//   // handle input field state change
//   const handleChange = (e) => {
//     setNumber(e.target.value);
//   }

//   const fetchBase = () => {
//     axios.get(`http://${url}:8000/`).then((res)=>{
//       alert(res.data);
//     })
//   }

//   // fetches vals of db via GET request
//   const fetchVals = () => {
//     axios.get(`http://${url}:8000/values`).then(
//       res => {
//         const values = res.data.data;
//         console.log(values);
//         setValues(values)
//     }).catch(err => {
//       console.log(err)
//     });
//   }

//   // handle input form submission to backend via POST request
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let prod = number * number;
//     axios.post(`http://${url}:8000/multplynumber`, {product: prod}).then(res => {
//       console.log(res);
//       fetchVals();
//     }).catch(err => {
//       console.log(err)
//     });;
//     setNumber("");
//   }

//   // handle intialization and setup of database table, can reinitialize to wipe db
//   const reset = () => {
//     axios.post(`http://${url}:8000/reset`).then(res => {
//       console.log(res);
//       fetchVals();
//     }).catch(err => {
//       console.log(err)
//     });;
//   }

//   // tell app to fetch values from db on first load (if initialized)
//   useEffect(() => {
//     fetchVals();
//   }, [])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <button onClick={fetchBase} style={{marginBottom: '1rem'}}> {`GET: http://${url}:8000/`} </button>
//         <button onClick={reset}> Reset DB </button>
//         <form onSubmit={handleSubmit}>
//           <input type="text" value={number} onChange={handleChange}/>
//           <br/>
//           <input type="submit" value="Submit" />
//         </form>
//         <ul>
//           { values.map((value, i) => <li key={i}>{value.value}</li>) }
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;
