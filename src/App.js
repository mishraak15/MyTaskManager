import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import EditTask from "./components/EditTask";
import Card from "./components/Card";

function App() {
  function getLocalItem() {
    const list = localStorage.getItem("lists");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }

  const [taskData, setTaskData] = useState(getLocalItem());
  const [dataToBeEdited, setDataToBeEdited] = useState([]);

  function getSingleData(value) {
    setDataToBeEdited(value); //to send the data reverse form TaskList--> Home-->App
    // Now we will send the data to the EditTask Component so that the form has th e default value as the previous one
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(taskData));
    console.log("List-data: ",getLocalItem());
  }, [taskData]);

  return (
    <div className="App">
      <nav className="navbar">MyTaskManger</nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              taskData={taskData}
              setTaskData={setTaskData}
              getSingleData={getSingleData}
            />
          }
        />
        <Route
          path="/edittask"
          element={
            <EditTask
              taskData={taskData}
              setTaskData={setTaskData}
              dataToBeEdited={dataToBeEdited}
            />
          }
        />
        <Route
          path="/addtask"
          element={<AddTask taskData={taskData} setTaskData={setTaskData} />}
        />
        <Route
          path="/fulldatacard"
          element={<Card dataToBeEdited={dataToBeEdited} />}
        />
      </Routes>
    </div>
  );
}

export default App;
