import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
function App() {
  const currentUser = authService.currentUser;
  console.log(currentUser);
  const [isLogginIn, setIsLogginIn] = useState(false);
  return <AppRouter isLogginIn={isLogginIn} />;
}

export default App;
