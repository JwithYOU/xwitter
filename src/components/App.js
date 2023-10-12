import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLogginIn, setIsLogginIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogginIn(true);
        setUserObj(user);
      } else {
        setIsLogginIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLogginIn={isLogginIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
