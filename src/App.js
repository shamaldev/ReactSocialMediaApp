import { useEffect, useState,useCallback } from "react";
import "./App.css";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
function App() {
  const authToken = localStorage.getItem('authToken');
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!authToken
  );
  const [currentUser,setCurrentUser] = useState(null)

  const fetchUserProfile = useCallback(async () => {
    if (authToken){
      try {
        const response =await axios.get('http://localhost:5000/api/users/profile',{
          headers:{
            Authorization:`Bearer ${authToken}`
          }
        })
        setCurrentUser(response.data)
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    } else {
      setCurrentUser(null)
    }
  }, [authToken]);

  useEffect(()=>{
    fetchUserProfile();
  },[fetchUserProfile])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>My Simple Feed</h1>
          {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </header>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Feed currentUser={currentUser} /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register onAuthSuccess={handleAuthSuccess} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login onAuthSuccess={handleAuthSuccess} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
