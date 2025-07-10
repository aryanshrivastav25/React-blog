// react libraries needed

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth";
import conf from "./conf/conf";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

// npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form
function App() {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData)
        dispatch(login(userData))
      else
        dispatch(logout())
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (<h1 className="text-2xl bg-amber-100 text-center">Loading</h1>);

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400 text-center">
        <div className="w-full block">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App