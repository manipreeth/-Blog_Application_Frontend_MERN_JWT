import React, { useState } from "react";
import Navbar from "./Components/Routers/Navbar";
import PathConfig from "./Components/Routers/navConfig";

export const ParentContext = React.createContext();

/**
 * This file is the entry point for the Blog Application, and is responsible for
 * initializing the application and rendering the routes. It consists of three useStates
 * exported using context in React, which provide global state management for the app.
 *
 * The component wraps the `PathConfig` component, which contains all of the routes and their corresponding
 * components. Each route is defined in its own file in the `src/Components` directory, making it easy
 * to maintain and update the routes as necessary.
 *
 * By using context to manage global state, we can easily pass data between components and
 * reduce the amount of props drilling required. This helps to keep the codebase organized and easy to maintain.
 */

function App() {
  const [navState, handleNavState] = useState(false);
  const [profile, handleProfile] = useState(true);
  const [formInput, handleFormInput] = useState({
    profilePic: null,
    email: "",
    mobile: "",
    username: "",
    about: "",
    gender: "",
  });

  return (
    <div className="App">
      <ParentContext.Provider
        value={{
          nav: [navState, handleNavState],
          profile: [formInput, handleFormInput],
          activeProfile: [profile, handleProfile],
        }}
      >
        <Navbar />
        <PathConfig />
      </ParentContext.Provider>
    </div>
  );
}

export default App;
