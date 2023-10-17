import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Xweet from "components/Xweet";
import XweetFactory from "components/XweetFactory";

const Home = ({ userObj }) => {
  const [xeets, setXeets] = useState([]);
  useEffect(() => {
    dbService.collection("xweets").onSnapshot((snapshot) => {
      const xweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setXeets(xweetArray);
    });
  }, []);

  return (
    <div>
      <XweetFactory userObj={userObj} />
      <div>
        {xeets.map((xweet) => (
          <Xweet
            key={xweet.id}
            xweetObj={xweet}
            isOwner={xweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
