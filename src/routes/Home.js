import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Xweet from "components/Xweet";

const Home = ({ userObj }) => {
  const [xweet, setXweet] = useState("");
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

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("xweets").add({
      text: xweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setXweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setXweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={xweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Xweet" />
      </form>
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
