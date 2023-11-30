import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import TaskList from "./TaskList";
import { MdOutlineAdd } from "react-icons/md";

export default function Home({taskData, setTaskData, getSingleData }) {  
  return (
    <div className="Home">
      {taskData.length === 0 ? (
        <div className="no-task-container">
          <div className="no-task-head">
            No Task available!! Create some Tasks
          </div>
          <NavLink to="/addtask">
            <button className="add_task_btn">ADD TASK</button>
          </NavLink>
        </div>
      ) : (
        <div className="list-container">
          <NavLink to="/addtask">
            <MdOutlineAdd className="add-icon" />
            <span className="hidden-data">Add a Task</span>
          </NavLink>
          {
          taskData.map((data,index) => {
            return (
              <TaskList
                taskData={taskData}
                setTaskData={setTaskData}
                key={index}
                data={data}
                getSingleData={getSingleData}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
