

const TaskManager = () => {
  const [inputBox, setInputBox] = useState("");
  const [editBox, setEditBox] = useState("");
  const [option, setOption] = useState("Todo");
  const [editOption, setEditOption] = useState("Todo");
  const [listContainer, setListContainer] = useState([]);
  const [doneCard, setDoneCard] = useState([]);
  const [progressCard, setProgressCard] = useState([]);
  const [blockedCard, setBlockedCard] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  // Save tasks to local storage
  const saveData = () => {
    localStorage.setItem("todoTasks", JSON.stringify(listContainer));
    localStorage.setItem("doneTasks", JSON.stringify(doneCard));
    localStorage.setItem("progressTasks", JSON.stringify(progressCard));
    localStorage.setItem("blockedTasks", JSON.stringify(blockedCard));
  };

  // Load tasks from local storage
  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todoTasks")) || [];
    const savedDone = JSON.parse(localStorage.getItem("doneTasks")) || [];
    const savedProgress = JSON.parse(localStorage.getItem("progressTasks")) || [];
    const savedBlocked = JSON.parse(localStorage.getItem("blockedTasks")) || [];
    setListContainer(savedTodo);
    setDoneCard(savedDone);
    setProgressCard(savedProgress);
    setBlockedCard(savedBlocked);
  }, []);

  const addTask = () => {
    if (inputBox === "") {
      alert("Write something");
    } else {
      const newTask = { text: inputBox, checked: false };
      if (option === "Todo") {
        setListContainer([...listContainer, newTask]);
      } else if (option === "inprogress") {
        setProgressCard([...progressCard, newTask]);
      } else if (option === "done") {
        setDoneCard([...doneCard, newTask]);
      } else if (option === "blocked") {
        setBlockedCard([...blockedCard, newTask]);
      }
      setInputBox("");
      saveData();
    }
  };

  const handleTaskAction = (taskList, setTaskList, index, action) => {
    const updatedTasks = [...taskList];
    if (action === "toggleCheck") {
      updatedTasks[index].checked = !updatedTasks[index].checked;
    } else if (action === "remove") {
      updatedTasks.splice(index, 1);
    }
    setTaskList(updatedTasks);
    saveData();
  };

  const openEditModal = (taskList, index) => {
    setEditModalOpen(true);
    setEditingTaskIndex(index);
    setEditBox(taskList[index].text);
  };

  const applyEdit = () => {
    const newTask = { text: editBox, checked: false };
    if (editOption === "Todo") {
      setListContainer([...listContainer, newTask]);
    } else if (editOption === "inprogress") {
      setProgressCard([...progressCard, newTask]);
    } else if (editOption === "done") {
      setDoneCard([...doneCard, newTask]);
    } else if (editOption === "blocked") {
      setBlockedCard([...blockedCard, newTask]);
    }
    setEditModalOpen(false);
    saveData();
  };

  const renderTaskList = (tasks, setTasks) => (
    tasks.map((task, index) => (
      <li key={index} className={task.checked ? "checked" : ""}>
        {task.text}
        <span onClick={() => handleTaskAction(tasks, setTasks, index, "remove")}>X</span>
        <button onClick={() => openEditModal(tasks, index)}>Edit</button>
      </li>
    ))
  );

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputBox}
          onChange={(e) => setInputBox(e.target.value)}
        />
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="Todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className={modalOpen ? "modal open" : "modal"}>
        {/* Modal Content */}
        <button onClick={() => setModalOpen(false)}>Close</button>
      </div>

      <div className="task-container">
        <h3>Todo</h3>
        <ul>{renderTaskList(listContainer, setListContainer)}</ul>

        <h3>In Progress</h3>
        <ul>{renderTaskList(progressCard, setProgressCard)}</ul>

        <h3>Done</h3>
        <ul>{renderTaskList(doneCard, setDoneCard)}</ul>

        <h3>Blocked</h3>
        <ul>{renderTaskList(blockedCard, setBlockedCard)}</ul>
      </div>

      <div className={editModalOpen ? "modal open" : "modal"}>
        <input
          type="text"
          value={editBox}
          onChange={(e) => setEditBox(e.target.value)}
        />
        <select value={editOption} onChange={(e) => setEditOption(e.target.value)}>
          <option value="Todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </select>
        <button onClick={applyEdit}>Save</button>
        <button onClick={() => setEditModalOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskManager;
