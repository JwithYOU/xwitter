import React, { useEffect } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { dbService } from "fbase";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyXweets = async () => {
    const xeets = await dbService
      .collection("xweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(xeets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyXweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
