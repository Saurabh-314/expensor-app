import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Navigate, redirect, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './components/AppBar';
import { setUser } from "./store/auth.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  async function fetchUser() {
    setIsLoading(true);
    // REACT_APP_API_URL="http://localhost:4000"
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.ok) {
      const user = await res.json();
      // console.log(user);
      dispatch(setUser(user));
    }
    setIsLoading(false);
  }


  useEffect(() => {
    fetchUser();
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
