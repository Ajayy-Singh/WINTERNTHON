// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <nav
//       style={{
//         padding: "15px 30px",
//         display: "flex",
//         justifyContent: "space-between",
//         borderBottom: "1px solid #ddd",
//       }}
//     >
//       <h3>✍️ Write From Your Heart</h3>

//       <div style={{ display: "flex", gap: "15px" }}>
//         {!isLoggedIn && (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}

//         {isLoggedIn && (
//           <>
//             <Link to="/writings">My Writings</Link>
//             <Link to="/editor">New Writing</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b">
      <h1 className="text-xl font-semibold">
        ✍️ Write From Your Heart
      </h1>

      <div className="flex gap-5 items-center">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Get Started
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/writings">My Writings</Link>
            <Link
              to="/editor"
              className="px-4 py-2 border rounded"
            >
              New Writing
            </Link>
            <button
              onClick={logout}
              className="text-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
