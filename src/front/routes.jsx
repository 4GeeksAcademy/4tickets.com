
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import { Register } from "./pages/Register";
import { CompanyDashboard } from "./pages/CompanyDashboard";
import { CreateEvent } from "./pages/CreateEvent";


import { Login } from "./pages/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
<Route path="/test" element={<h1>¡Hola, esto es una prueba!</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/company-dashboard" element={<CompanyDashboard />} />
      <Route path="/create-event" element={<CreateEvent />} />


      <Route path="/login" element={<Login />} />

    </Route>
  )
);