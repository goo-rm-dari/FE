import { useState } from "react";
import { MapPage } from "./pages/Map";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>




      <MapPage></MapPage>
      <div className="bg-color-black p-4">
        <button
          className="bg-red-200 p-2"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>


    </>
  );
}

export default App;
