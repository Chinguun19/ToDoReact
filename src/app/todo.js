"use client"

import './style.css';
import TaskManager from './function.js';
import { useState } from 'react'
import background from "./delete.png";

function todolist () {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  let Input = document.getElementById("input-box")
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive); 
   };

   function addTask(){
    if(newTask.trim() !== ""){
      setTasks(t => [...t, newTask]);
      setNewTask("");
  }
    
   }
   function handleInputChange (event){
    setNewTask(event.target.value);
   }

      

            return (

              
              <div className="container">
                <div className="card-container">
                  <div className="To-do-card" id="toDoCard">
                    <div className="count" id="count"></div>
                    <div className="circle"></div>
                    <h3>To do</h3>
                    <ul id="list-container"> {tasks.map((task, index) =>  <li id={index} className>{task} <span style={{ backgroundImage: `url(${background})` }}> </span>
                    </li>  )} </ul>
                  </div>
          
                  <div className="To-do-card" id="progressCard">
                    <div className="yellowCircle"></div>
                    <h3>Progress In</h3>
                    <ul id="list-container" className="list-container">

                    </ul>
                  </div>
          
                  <div className="To-do-card" id="doneCard">
                    <div className="greenCircle"></div>
                    <h3>Done</h3>
                    <ul id="list-container" className="list-container"></ul>
                  </div>
          
                  <div className="To-do-card" id="blockedCard">
                    <div className="redCircle"></div>
                    <h3>Blocked</h3>
                    <ul id="list-container" className="list-container"></ul>
                  </div>
                </div>
          
                <div className="edit-modal" id="edit-modal">
                  <div className="modal-inner">
                    <div className="input">
                      <h1>Edit Your Task</h1>
                      <label htmlFor="editOption"></label>
                      <select id="editOption" placeholder="Status">
                        <option value="">Status</option>
                        <option value="Todo">To do</option>
                        <option value="inprogress">Progress In</option>
                        <option value="done">Done</option>
                        <option value="blocked">Blocked</option>
                      </select>
                      <input
                        id="edit-box"
                        type="text"
                        placeholder="Add your task"
                        onKeyDown={(event) => {
                          if (event.keyCode === 13) {
                            document.getElementById('buttonAdd').click();
                          }
                        }}
                      />
                    </div>
                    <button id="closeModalEdit">Done</button>
                  </div>
                </div>
          
                <button onClick={ToggleClass}id="openModal">Add task</button>
          
                <div className={isActive ? "modal.open" : "modal"} id="modal">
                  <div className="modal-inner">
                    <div className="input">
                      <h1>Enter Task</h1>
                      <label htmlFor="option"></label>
                      <select id="option" placeholder="Status">
                        <option value="">Status</option>
                        <option value="Todo">To do</option>
                        <option value="inprogress">Progress In</option>
                        <option value="done">Done</option>
                        <option value="blocked">Blocked</option>
                      </select>
                      <input
                        id="input-box"
                        value={newTask}
                        type="text"
                        placeholder="Add your task"
                        onChange={handleInputChange}
                        onKeyDown={(event) => {
                          if (event.keyCode === 13) {
                            document.getElementById('buttonAdd').click();
                          }
                        }}
                      />
                      <button onClick={addTask} id="buttonAdd">
                        ADD
                      </button>
                    </div>
                    <button id="closeModal">Done</button>
                  </div>
                </div>
              </div>
            );
          }
          
          


export default todolist