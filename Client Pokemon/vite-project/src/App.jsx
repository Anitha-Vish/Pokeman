
import { useState, useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {getAllDetails} from "./Services/fetchDB";

function App() {
 const [data, setData] = useState([]);
 const { id } = useParams();

 useEffect(() => {
    // Fetch all  data when the component mounts
    getAllDetails()
      .then(data => setData(data))
      .catch(error => console.error("Error fetching all recipes:", error));
  }, []);
  console.log(data);

  return (
    <>
       <Routes>
          <Route path="/recipes" element={<Recipes />} />
        </Routes>

      <p>  
         Hello World!
      </p>
    </>
  )
}

export default App
