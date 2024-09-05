import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if(user) {
        await setDoc(doc(db, "Users", user.uid), {
            id: user.uid,
            email: user.email,
            firstName: fname,
            lastName: lname,
        });
      }
      toast.success('Your all signed up!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.href= "/login" ;
    } catch (error) {
      toast.error('Signup failed: Try Again', {
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
  };

  return (
    <div className="w-1/2 mx-auto bg-racing-red border-2 border-white rounded-lg p-4">
      <form className="flex flex-col items-center" onSubmit={handleSignUp}>
          <input type="text" className="mb-6 w-2/3 p-2 rounded-lg" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
          <input type="text" className="mb-6 w-2/3 p-2 rounded-lg" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
          <input type="email" className="mb-6 w-2/3 p-2 rounded-lg" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="mb-6 w-2/3 p-2 rounded-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-white w-[90px] py-2 px-4 rounded-lg">
            {loading ? <ClipLoader size={20} color={"#000"} /> : 'Sign Up'}
          </button>
      </form>
      <p className="mx-auto w-fit text-white mt-4">Already have an account? <Link to="/login" className="underline">Login here</Link></p>
    </div>
  );
}

export default SignUp;
