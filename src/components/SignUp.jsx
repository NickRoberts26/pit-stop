import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user) {
        await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: fname,
            lastName: lname,
        });
      }
      toast.success("User Registered Successfully!", {
        position: "top-center"
      });
    } catch (error) {
        toast.success(error.message, {
            position: "top-center"
        });
    }
  };

  return (
    <form className="flex flex-col w-1/2" onSubmit={handleSignUp}>
        <input type="text" className="mb-4" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
        <input type="text" className="mb-4" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
        <input type="email" className="mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
