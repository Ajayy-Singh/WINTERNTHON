// import { useState } from "react";
// import api from "../services/api";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const register = async () => {
//     await api.post("/auth/register", { name, email, password });
//     window.location.href = "/";
//   };

//   return (
//     <div className="center">
//       <h2>Register</h2>
//       <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={register}>Register</button>
//     </div>
//   );
// }


// import { useState } from "react";
// import api from "../services/api";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const register = async () => {
//     await api.post("/auth/register", { name, email, password });
//     window.location.href = "/login";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       {/* Card */}
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

//         {/* Heading */}
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Register
//         </h2>

//         {/* Name */}
//         <input
//           type="text"
//           placeholder="Name"
//           onChange={(e) => setName(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Password */}
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Button */}
//         <button
//           onClick={register}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//         >
//           Register
//         </button>

//         {/* Login link */}
//         <p
//           onClick={() => (window.location.href = "/")}
//           className="text-center text-sm text-gray-600 mt-4 cursor-pointer hover:text-blue-600"
//         >
//           Already have an account? Login
//         </p>

//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import api from "../services/api";
import bgImage from "../assets/bg-image.png"; // same bg as login

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await api.post("/auth/register", { name, email, password });
    window.location.href = "/login";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Glass Card */}
      <div className="w-full max-w-md rounded-xl shadow-2xl p-8
                      bg-white/40 backdrop-blur-md border border-white/30">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-white/70 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-white/70 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 bg-white/70 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          onClick={register}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Login link */}
        <p
          onClick={() => (window.location.href = "/login")}
          className="text-center text-sm text-gray-800 mt-4 cursor-pointer hover:text-blue-600"
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}
