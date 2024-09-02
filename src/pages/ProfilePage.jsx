import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfileBio from "../components/ProfileBio";
import PersonalFeed from "../components/PersonalFeed";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [profileId, setProfileId] = useState(null);

  const url = window.location.pathname;

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      setProfileId(url.substring(url.lastIndexOf('/') + 1));
      const docRef = doc(db, "Users", url.substring(url.lastIndexOf('/') + 1));
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

  console.log(profileId);

  return (
    <>
      {userDetails ? (
        <div className={`theme-${userDetails.team ? userDetails.team.replace(/\s+/g, '').toLowerCase() : 'default'} rounded-lg p-8`}>
          <ProfileBio profileId={profileId} userDetails={userDetails} setUserDetails={setUserDetails} />
        </div>
      ) : (
        <div>No User</div>
      )}
      <PersonalFeed profileId={profileId} userDetails={userDetails} />
    </>
  )
}

export default ProfilePage
