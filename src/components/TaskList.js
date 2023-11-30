import React, {  useState } from "react";
import "./TaskList.css";
import { FaCheck, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TaskList({
  taskData,
  setTaskData,
  data,
  getSingleData,
}) {
 

  const title = data.title;
  var status = data.status;
  const priority = data.priority;
  const [taskDone, setTaskDone] = useState(status);
  const navigate = useNavigate();

  function checkBoxClickHandler() {
    if(taskDone){
       setTaskDone(false);
       status="Not Done";
    }

    else{
      setTaskDone(true);
      status="Done";
      toast("Congratulations!! Task Done", {
        icon: "🎉",
        style: {
          backgroundColor: "limegreen",
          fontSize: "17px",
        },
      });
    }
      let a = taskData;
      const index = taskData.indexOf(data);
      data.status=status;
      a[index]=data;
      setTaskData(a);
      
      console.log("Task Data: ", taskData);
      localStorage.setItem("lists", JSON.stringify(taskData));
  }

  function deleteList() {
    try {
      const index = taskData.indexOf(data);
      const TaskList = document.querySelectorAll(".TaskList");
      TaskList[index].style.display = "none";
      let a = taskData;
      a.splice(index, 1);
      setTaskData(a);
      localStorage.setItem("lists", JSON.stringify(taskData));
      toast("Task Deleted Successfully", {
        icon: "🗑️",
      });
      console.log("Task Data: ", taskData);
    } 
    
    catch (error) {
      console.log("Error in deleting Task");
      toast.error("Unable to delete task");
    }

    if (taskData.length ===0) {
      navigate("/addtask");
    }
  }

  function editList() {
      getSingleData(data);
      navigate("/edittask");
  }

  function fullDataShow() {
    getSingleData(data);
    navigate("/fulldatacard");
  }

  return (
    <div
      className="TaskList"
      style={
        status==="Done"
          ? {
              filter: "blur(1px)",
              opacity: "0.7",
              textDecoration: "line-through",
              textDecorationColor: "black",
            }
          : { opacity: "1", textDecoration: "none" }
      }
    >
      <div className="TaskList-left">
        <div className="list-check-box" onClick={checkBoxClickHandler}>
          {" "}
          <FaCheck
            id="check"
            style={status==="Done" ? { display: "flex"} : { display: "none" }}
          />
        </div>
        <div onClick={fullDataShow} className="TaskList-title">
          {title}
        </div>
      </div>

      <div className="TaskList-right">
        <div
          className="task-mid-indicator"
          style={
            priority === "low"
              ? {
                  backgroundColor: "limegreen",
                  boxShadow: "0px 0px 15px 1px limegreen",border:"1px solid limegreen"
                }
              : priority === "medium"
              ? { backgroundColor: "orange", boxShadow: "0px 0px 15px 1px orange",border:"1px solid orange" }
              : { backgroundColor: "red", boxShadow: "0px 0px 15px 1px red",border:"1px solid red" }
          }
        >
          <span className="priority-hidden">Priority Indicator</span>
        </div>
        <FaEdit className="edit-icon" onClick={() => editList()}/>
        <MdDelete className="delete-icon" onClick={() => deleteList()}/>
      </div>
    </div>
  );
}
