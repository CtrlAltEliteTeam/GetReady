
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from '../src/components/landing/LandingPage';
import LoginPage from '../src/components/login/LoginPage';
import Signup from '../src/components/login/SignUp';
import Dashboard from '../src/pages/dashboard/Dashboard';


function App() {
	return (
	<>
		<Router>
			<Routes>
				<Route path='/' exact element={<LandingPage/>}/>
				<Route path='/login' exact element={<LoginPage/>}/>
				<Route path='/signup' exact element={<Signup/>}/>
				<Route path='/dashboard' exact element={<Dashboard/>}/>
			</Routes>
		</Router>
    </>
	);
}

export default App

// import './App.css';
// import React, {useState, useEffect} from "react";
// import axios from './api/Axois';

// const GET_URL = '/get';

// function App() {
// const [username,setUsername] = useState('');
// const [password,setPassword] = useState('');
// const [userList, setUserList]=useState([]);

// useEffect(()=>{
//   const fetchData = async() =>{
//     try {
//       const response = await axios.get(GET_URL);
//       setUserList(response.data);
//       console.log(JSON.stringify(userList));
//       // .then((response)=>{
//       //   setUserList(response.data);
//       //   console.log(userList);
//       //  });
        
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   fetchData();
  
// },[]); 

// const submit = () =>{
//   axios.post('http://localhost:8000/api/insert',{
//     username:username,
//     password:password
//   }).then(()=>{
//     alert("successful insert");
//   });
// };

//   return (
//     <div className="App">
//      <div> hi</div>
//      <label>username</label>
//      <input type="text" name="username" onChange={(e)=>{
//       setUsername(e.target.value);
//      }} ></input>
//      <label>password</label>
//      <input type="text" name="password" onChange={(e)=>{
//       setPassword(e.target.value);
//      }}></input>
//      <button onClick={submit}>submit</button>
//      <div>
//      {userList.map((val)=>{
//         return (
//           <div key={val.userID}>
//             <h3>username: {val.username}</h3>
//             <h3>email:{val.email}</h3>
//           </div>
//         );
//      })}
//      </div>
//     </div>
//   );
// }

// export default App;
