import { React, useState } from "react";
import "./AddTask.css";
import { useNavigate, NavLink } from "react-router-dom";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";

export default function AddTask({ taskData, setTaskData }) {

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    priority: "medium",
    deadline: "2024-01-01",
    status:"Not Done"
  });

  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    let a = taskData;
    a.push(formData);
    setTaskData(a);
    console.log("Task Data: ", taskData);
    navigate("/");
    localStorage.setItem("lists", JSON.stringify(taskData));
    toast.success("Task added successfully!!");
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
    <div className="AddTask">
      <h2>
        Create your own task
      </h2>
      <form onSubmit={(event) => submitHandler(event)}>
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

        <div className="inp-container">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter the title"
            onChange={changeHandler}
            value={formData.title}
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
            value={formData.desc}
          ></textarea>
        </div>

        <div className="inp-container">
          <label htmlFor="priority">Deadline: </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            onChange={changeHandler}
            value={formData.deadline}
          />
        </div>

        <div className="inp-container">
          <label htmlFor="priority">Priority Level: </label>
          <select
            name="priority"
            id="priority"
            onChange={changeHandler}
            value={formData.priority}
          >
            <option value="low">LOW</option>
            <option value="medium" selected>
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
