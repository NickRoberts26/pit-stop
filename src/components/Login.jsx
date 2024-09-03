import { useState  } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href= "/" ;
    } catch (error) {
        console.log(error);
        toast.error('Username/Password incorrect', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-1/2 mx-auto bg-racing-red border-2 border-white rounded-lg p-4">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input className="mb-6 w-2/3 p-2 rounded-lg" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-6 w-2/3 p-2 rounded-lg" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-white w-[75px] py-2 px-4 rounded-lg">
          {loading ? <ClipLoader size={20} color={"#000"} /> : 'Login'}
        </button>
      </form>
      <p className="mx-auto w-fit text-white mt-4">Don't have an account? <Link to="/signup" className="underline">Register here</Link></p>
      <ToastContainer />
    </div>
  );
}

export default Login;