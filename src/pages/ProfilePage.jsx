import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {

  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      {userDetails ? (
        <div className='bg-white rounded-lg p-8'>
          <div className='flex'>
              <img className='rounded-full w-[200px]' src="src/assets/me.jpg" alt="" />
              <header>
                  <h1>{userDetails.firstName} {userDetails.lastName}</h1>
              </header>
          </div>
      </div>
      ) : (
        <div>fail</div>
      )}
    </>
  )
}

export default ProfilePage
