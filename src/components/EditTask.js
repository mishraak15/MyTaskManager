import React, { useState } from "react";
import "./EditTask.css";
import { ImCross } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditTask({ taskData, setTaskData, dataToBeEdited }) {
  const [formData, setFormData] = useState({
    title: dataToBeEdited.title,
    desc: dataToBeEdited.desc,
    priority: dataToBeEdited.priority,
    deadline:dataToBeEdited.deadline,
    status:dataToBeEdited.status
  });

  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    let a = taskData;
    let index = taskData.indexOf(dataToBeEdited);
    a[index] = {
        title: formData.title,
        desc: formData.desc,
        priority: formData.priority,
        deadline:formData.deadline,
        status:formData.status
    };
    console.log("Task Data: ", taskData);
    setTaskData(a);
    navigate("/");
    localStorage.setItem("lists", JSON.stringify(taskData));
    toast.success("Task Edited Successfully");
  }

  function changeHandler(event) {
    setFormData((preData) => {
      return {
        ...preData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div className="EditTask">
      <h2>Edit the Task</h2>
      <form onSubmit={(event) => submitHandler(event)}>
        <div className="EditTask-head">
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              margin: "5px 10px",
            }}
          >
            <NavLink to="/">
              <ImCross className="cross-icon" />
            </NavLink>
          </div>
        </div>
        <div className="inp-container">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter the title"
            onChange={changeHandler}
            defaultValue={dataToBeEdited.title}
            required
          />
          <span>
            <sup style={{ color: "red" }}>*</sup>
          </span>
        </div>

        <div className="inp-container">
          <label htmlFor="desc">Description: </label>
          <textarea
            name="desc"
            id="desc"
            cols="40"
            rows="4"
            placeholder="Write more about your task..."
            onChange={changeHandler}
            defaultValue={dataToBeEdited.desc}
          ></textarea>
        </div>

        <div className="inp-container">
        <label htmlFor="priority">Deadline: </label>
        <input type="date" name="deadline" id="deadline" onChange={changeHandler} defaultValue={dataToBeEdited.deadline} />
        </div>

        <div className="inp-container">
          <label htmlFor="priority">Priority Level: </label>
          <select
            name="priority"
            id="priority"
            onChange={changeHandler}
            defaultValue={dataToBeEdited.priority}
          >
            <option value="low">LOW</option>
            <option value="medium" >
              MEDIUM
            </option>
            <option value="high">HIGH</option>
          </select>
        </div>
        <div className="btn-container">
          <button type="reset" className="reset-btn btn">
            Reset
          </button>
          <button type="submit" className="submit-btn btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
