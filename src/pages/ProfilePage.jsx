import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfileBio from "../components/ProfileBio";

const ProfilePage = () => {
  const [theme, setTheme] = useState('default-theme');
  const [team, setTeam] = useState('');

  const themeHandler = (e) => {
    setTheme("theme-" + e.target.value.replace(/\s+/g, '').toLowerCase());
    setTeam(e.target.value);
  }

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

  console.log(theme);

  /*
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  */

  return (
    <>
      {userDetails ? (
        <div className={`${theme} rounded-lg p-8`}>
          <ProfileBio userDetails={userDetails} themeHandler={themeHandler} team={team} />
        </div>
      ) : (
        <div>No User</div>
      )}
    </>
  )
}

export default ProfilePage
