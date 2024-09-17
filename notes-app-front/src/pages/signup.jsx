import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    try { 
      
      
    } catch (error) {
      
    }


  }

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          <input type="text" placeholder="Username" className="input-box" />

          <input type="text" placeholder="Email" className="input-box" />

          <input type="text" placeholder="Password" className="input-box" />

          <input type="text" placeholder="Confirm Password" className="input-box" />

          <button type="submit" className="btn-primary">
            Create Account
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
