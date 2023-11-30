import React from 'react';
import './Card.css';
import { NavLink } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import toast from 'react-hot-toast';

export default function Card({dataToBeEdited}) {
    const title=dataToBeEdited.title;
    const desc=dataToBeEdited.desc;
    const priority=dataToBeEdited.priority;
    const deadline=dataToBeEdited.deadline;
    const status=dataToBeEdited.status;
    let presentDate= new Date();
    let deadlineDate=new Date(deadline);
    let d=deadlineDate.getDate();
    let m=deadlineDate.getMonth();
    let y=deadlineDate.getFullYear();
    
    if(d===presentDate.getDate() && m===presentDate.getMonth() && y===presentDate.getFullYear()){
        console.log("Today is DeadLine");
        toast("Toady is Deadline for this Task",{
            icon:"⏳",
            style:{
                borderRadius:"7px",
                color:'black',
                backgroundColor:"yellow",
                fontSize:"17px"
            },
            duration:5000
        });
    }
    
    else if(deadlineDate-presentDate<0){
        console.log("DeadLine Has Passed");
        toast("DeadLine Has Passed",{
            icon:"😫",
            style:{
                borderRadius:"7px",
                color:'black',
                backgroundColor:"red",
                fontSize:"17px"
            },
            duration:5000
        });
    }


  return (
    <div className='Card'>
    <div style={{position:"absolute", right:"0" ,top:"0", margin:"5px 10px"}}>
      <NavLink to="/">
            <ImCross className="cross-icon" />
          </NavLink>
    </div>
      <h2>{title}</h2>
      <p className='card-desc'>{desc}</p>
      <div className="card-bottom">
      <div className='card-bottom-item'>Priority: <span style={priority==="low"?{color:"limegreen"}:priority==="medium"?{color:"orange"}:{color:"red"}}>{priority.toUpperCase()}</span></div>

      <div className='card-bottom-item'>Status: <span style={status==="Done"?{color:"limegreen"}:{color:"red"}}>{status}</span></div>


      <div className='card-bottom-item'>Deadline:  <span style={deadlineDate-presentDate<=0?{color:"red"}:{color:"limegreen"}}>{d}-{m+1}-{y}</span></div>
      
      </div>
    </div>
  )
}
