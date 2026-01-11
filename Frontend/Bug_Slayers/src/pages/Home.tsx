import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold leading-tight">
          A calm space to write <br /> without pressure.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Write honestly.  
          Your thoughts are saved quietly.  
          Come back anytime.
        </p>

        <button
          onClick={() =>
            navigate(isLoggedIn ? "/writings" : "/register")
          }
          className="mt-8 px-6 py-3 bg-black text-white rounded-lg"
        >
          {isLoggedIn ? "Go to My Writings" : "Start Writing"}
        </button>

        <div className="mt-20 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Why this app?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Students often lose their voice due to distractions
              and rushed writing. This app provides a calm,
              distraction-free space to write honestly.
            </p>
          </div>

          <ul className="space-y-3 text-gray-700">
            <li>🧘 Distraction-free editor</li>
            <li>💾 Auto saving</li>
            <li>🔐 Private writings</li>
            <li>🕰 Writing history</li>
          </ul>
        </div>
      </div>
    </>
  );
}
