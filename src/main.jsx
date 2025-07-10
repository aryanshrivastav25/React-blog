import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import {Login, Signup, Home, Post, AllPosts, EditPost, AddPost} from './'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={(
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    )} />
    <Route path='/signup' element={(
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    )} />
    <Route path='/allPosts' element={(
      <AuthLayout authentication={true}>
        {" "}
        <AllPosts />
      </AuthLayout>
    )} />
    <Route path='/addPost' element={(
      <AuthLayout authentication={true}>
        {" "}
        <AddPost />
      </AuthLayout>
    )} />
    <Route path='/editPost/:slug' element={(
      <AuthLayout authentication={true}>
        {" "}
        <EditPost />
      </AuthLayout>
    )} />
    <Route path='/post/:slug' element={<Post />}></Route>
  </Route>
))


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
