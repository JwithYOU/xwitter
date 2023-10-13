import React, { useState } from "react";
import { dbService } from "fbase";

const Xweet = ({ xweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newXweet, setNewXweet] = useState(xweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this xweet?");
    if (ok) {
      await dbService.doc(`xweets/${xweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`xweets/${xweetObj.id}`).update({
      text: newXweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewXweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your xweet"
              value={newXweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Xweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{xweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Xweet</button>
              <button onClick={toggleEditing}>Edit Xweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Xweet;
