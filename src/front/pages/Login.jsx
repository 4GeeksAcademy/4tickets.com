import React, { useState } from "react";
import { BASE_BACK_URL } from "../core/constantsUrl";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_BACK_URL}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.access_token);

        if (data.accountType === "company") {
            localStorage.setItem("company_id", data.company.id);
            localStorage.setItem("company_name", data.company.nombre_legal);


            dispatch({
                      type: "login_company",
                      payload: data.company
                    });
        } 
        else if (data.accountType === "user") {
            dispatch({
                      type: "login_user",
                      payload: data.user
                     });
          } 
        
        // Redirigir después
        navigate("/");
        
        
      } else {
        toast.error(data.msg ||"Invalid email or password.");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-4">

          <div className="card shadow p-4">

            <h2 className="text-center mb-3">
              Login
            </h2>

            <p className="text-center text-muted">
              Access your account
            </p>


            <form onSubmit={handleSubmit}>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>
          
            
          <div className="text-center mt-3">
            <Link
              to="/forgot-password"
              className="text-decoration-none text-muted small"
            >
            Forgot your password?
            </Link>
          
          </div>
            

          </div>

        </div>

      </div>
    </div>
  );
};
