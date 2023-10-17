import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Xweet from "components/Xweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [xweet, setXweet] = useState("");
  const [xeets, setXeets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const newObject = {
      text: xweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("xweets").add(newObject);
    setXweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setXweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Xweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
