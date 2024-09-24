import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="container mx-auto">
      <div className="text-[64px] text-center mt-32">
        <h1>What will you</h1>
        <h1>achieve today?</h1>
      </div>
      <div>
        <p className="text-center text-[18px]">
          Remember everything and tackle any project with your notes, tasks, and
          schedule all in one place.
        </p>
        <div className="flex place-content-center mt-8">
          <Link
            className="bg-blue-600 text-white py-4 px-20 rounded-lg hover:bg-blue-400 duration-300 hover:-translate-y-1 hover:scale-110 "
            to="/login"
          >
            Log in
          </Link>
        </div>
        <div className="flex place-content-center mt-8">
          <p>
            Not registered yet?{" "}
            <Link to="/signUp" className="font-medium text-primary underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
