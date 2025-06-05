import { Navigate } from "react-router-dom";

import React from 'react'

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to='/'/>
}

export default ProtectedRoute;