import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3x1 font-semibold text-center text-black">
          Login
          <span className="text-blue-500"> WhatsWare</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="texr-base label-text"> Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

//STARTER CODE FOR THIS FILE
// const Login = () => {
//     return (
//       <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//           <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//               <h1 className="text-3x1 font-semibold text-center text-black">
//                   Login
//                   <span className="text-blue-500"> WhatsWare</span>
//               </h1>

//               <form>
//                   <div>
//                       <label className="label p-2">
//                           <span className="text-base label-text">
//                               Email
//                           </span>
//                       </label>
//                       <input type="text" placeholder="Enter Email" className="w-full input input-bordered h-10" />
//                   </div>

//                   <div>
//                       <label className="label">
//                           <span className="texr-base label-text"> Password</span>
//                       </label>
//                       <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
//                   </div>

//                   <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
//                       {"Don't"} have an account?
//                   </a>

//                   <div>
//                       <button className="btn btn-block btn-sm mt-2"> Login</button>
//                   </div>
//               </form>
//           </div>
//       </div>
//     )
//   };

//   export default Login;
