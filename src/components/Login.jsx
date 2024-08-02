import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href= "/profile" ;
        console.log('User Login Successful')
    } catch (error) {
        
    }
  }

  return (
    <div className="w-1/2 mx-auto bg-racing-red border-2 border-white rounded-lg p-4">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input className="mb-6 w-2/3 p-2 rounded-lg" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-6 w-2/3 p-2 rounded-lg" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-white w-fit py-2 px-4 rounded-lg">Login</button>
      </form>
      <p className="mx-auto w-fit text-white mt-4">Don't have an account? <Link to="/signup">Register here</Link></p>
    </div>
  );
}

export default Login;