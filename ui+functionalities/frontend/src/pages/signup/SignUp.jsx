import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3x1 font-semibold text-center text-black">
          Sign Up
          <span className="text-blue-500"> WhatsWare</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter User Name"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="text"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

//STARTER CODE FOR SIGN UP PAGE
// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//       <h1 className="text-3x1 font-semibold text-center text-black">
//       Sign Up
//       <span className="text-blue-500"> WhatsWare</span>
//       </h1>
//       <form>

//         <div>
//           <label className='label p-2'>
//             <span className='text-base label-text'>
//               User Name
//             </span>
//           </label>
//           <input type="text" placeholder="Enter User Name" className="w-full input input-bordered h-10"/>
//         </div>

//         <div>
//           <label className='label'>
//             <span className='text-base label-text'>
//               Email
//             </span>
//           </label>
//           <input type="text" placeholder="Enter Email" className="w-full input input-bordered h-10"/>
//         </div>

//         <div>
//           <label className='label'>
//             <span className='text-base label-text'>
//               Password
//             </span>
//           </label>
//           <input type="text" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
//         </div>

//         <div>
//           <label className='label'>
//             <span className='text-base label-text'>
//               Confirm Password
//             </span>
//           </label>
//           <input type="text" placeholder="Confirm Password" className="w-full input input-bordered h-10"/>
//         </div>

//         <a
//         href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
//         {"Don't"} have an account?
//         </a>

//         <div>
//           <button className='btn btn-block btn-sm mt-2 border border-slate-700'>
//             Sign Up
//           </button>
//         </div>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
