import { useState } from "react";
import Display from "./components/Display";

function App() {
  const [view, setView] = useState(true);
  setTimeout(() => {
    setView(false);
  }, 3000);
  return (
    <div className="App">
      <Display />
      {view && (
        <author>
          <img src="logo192.png" alt="React Logo" />
          <p>Created by: RAJGOPAL HOTA</p>
        </author>
      )}
    </div>
  );
}

export default App;
