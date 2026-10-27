import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import ViewEmployee from "../pages/ViewEmployee";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";

function AppRoutes() {
  return (
    <Routes>
     <Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/signup" element={<SignUp />} />

      <Route path="/" element={<MainLayout />}>

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="employees" element={ <ProtectedRoute><Employees /></ProtectedRoute> } />

        <Route path="employees/add" element={<ProtectedRoute> <AddEmployee />   </ProtectedRoute>}/>

        <Route path="employees/edit/:id" element={<EditEmployee />} />

        <Route path="employees/view/:id" element={<ViewEmployee />} />
     
      </Route>

    </Routes>
  );
}

export default AppRoutes;