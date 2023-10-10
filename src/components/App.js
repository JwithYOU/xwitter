import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLogginIn, setIsLogginIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogginIn(true);
      } else {
        setIsLogginIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <AppRouter isLogginIn={isLogginIn} /> : "Initializing..."}</>
  );
}

export default App;
