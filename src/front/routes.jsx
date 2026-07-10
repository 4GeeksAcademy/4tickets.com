import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CreateEvent } from "./pages/CreateEvent";
import { CompanyDashboard } from "./pages/CompanyDashboard";
import { Contact } from "./pages/Contact";
import { UserDashboard } from "./pages/UserDashboard";
import { Success } from "./pages/Success";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/company-dashboard" element={<CompanyDashboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/success" element={<Success />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="success" element={<Success />} />

    </Route>
  )
);