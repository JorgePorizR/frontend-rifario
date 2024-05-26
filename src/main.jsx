import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/auth/LoginForm.jsx';
import RegisterForm from './pages/auth/RegisterForm.jsx';
import MyRifaList from './pages/rifa/MyRifaList.jsx';
import RifaForm from './pages/rifa/RifaForm.jsx';
import RifaList from './pages/rifa/RifaList.jsx';
import RifaDetail from './pages/rifa/RifaDetail.jsx';
import RifaMeDetail from './pages/rifa/RifaMeDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <RegisterForm />
  },
  {
    path: "/rifas",
    element: <RifaList />
  },
  {
    path: "/rifas/me",
    element: <MyRifaList />
  },
  {
    path: "/rifas/create",
    element: <RifaForm />
  },
  {
    path: "/rifas/:id",
    element: <RifaForm />
  },
  {
    path: "/rifas/detail/:id",
    element: <RifaDetail />
  },
  {
    path: "/rifas/me/detail/:id",
    element: <RifaMeDetail />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
