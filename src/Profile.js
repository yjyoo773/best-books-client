import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Jumbotron from "react-bootstrap/Jumbotron";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    // isAuthenticated && (
    // <div>
    //   <img src={user.picture} alt={user.name} />
    //   <h2>{user.name}</h2>
    //   <p>{user.email}</p>
    // </div>
    // )
      isAuthenticated ? (
      <div style={{ minHeight: "85vh" }}>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      ):
      <div style={{ minHeight: "85vh" }}>
        <h2 style={{textAlign:"center"}}>Please Login to view Profile</h2>
      </div>
  );
};

export default Profile;
