import { useState } from "react";
import AlertMessage from "./AlertMessage";
import "bootstrap-icons/font/bootstrap-icons.css";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
	const [completedTasks, setCompletedTasks] = useState({});
	const [editingIndex, setEditingIndex] = useState(null);
	const [editedTask, setEditedTask] = useState("");
	const [alert, setAlert] = useState(null);

    const handleInputChange = (event) => {
		setNewTask(event.target.value);
    };

	const showAlert = (type, message) => {
		setAlert({ type, message });
	};

	const closeAlert = () => {
		setAlert(null);
	};

	const toggleTaskCompletion = (index) => {
		setCompletedTasks((prev) => ({
			...prev,
			[index]: !prev[index],
		}));

		showAlert("success", "Task status updated successfully");
	};

    const addTask = () => {
		if (newTask.trim() !== "") {
			setTasks(task => [...task, newTask]);
			showAlert("success", "Task added successfully");
			setNewTask("");
		} else {
			showAlert("error", "Please enter a task");
		}
    };

	const editTask = (index) => {
		setEditingIndex(index);
		setEditedTask(tasks[index]);
	};

	const saveEditedTask = (index) => {
		if (editedTask.trim() !== "") {
			const updatedTasks = [...tasks];
			updatedTasks[index] = editedTask;
			setTasks(updatedTasks);
			setEditingIndex(null);
			showAlert("success", "Task updated successfully");
		} else {
			showAlert("error", "Task cannot be empty");
		}
	};

	const cancelEditing = () => {
		setEditingIndex(null);
		setEditedTask("");
	};

    const deleteTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));

		setCompletedTasks((prev) => {
			const updatedTasks = { ...prev };
			delete updatedTasks[index];
			return updatedTasks;
		});

		showAlert("success", "Task deleted successfully");
    };

    const moveTaskUp = (index) => {
			if (index > 0) {
				const updatedTasks = [...tasks];
				const updatedCompletedTasks = { ...completedTasks };

				[updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];

				[updatedCompletedTasks[index], updatedCompletedTasks[index - 1]] = [
					updatedCompletedTasks[index - 1], 
					updatedCompletedTasks[index]
				];

				setTasks(updatedTasks);
				setCompletedTasks(updatedCompletedTasks);
			}
    };

    const moveTaskDown = (index) => {
			if (index < tasks.length - 1) {
				const updatedTasks = [...tasks];
				const updatedCompletedTasks = { ...completedTasks };

				[updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];

				[updatedCompletedTasks[index], updatedCompletedTasks[index + 1]] = [
					updatedCompletedTasks[index + 1], 
					updatedCompletedTasks[index]
				];

				setTasks(updatedTasks);
				setCompletedTasks(updatedCompletedTasks);
			}
    };

    return(
		<>
			{alert && <AlertMessage type={alert.type} message={alert.message} onClose={closeAlert} />}
			<div className="to-do-list">
				<h1>ToDo List</h1>
				<input 
					type="text" 
					placeholder="Enter a task..."
					value={newTask}
					onChange={handleInputChange}
				/>
				<button onClick={addTask} className="add-button">Add</button>
			</div>

			<ol>
			{tasks.map((task, index) => (
				<li key={index}>
					{editingIndex === index ? (
                        <input 
                            type="text"
                            value={editedTask}
                            onChange={(event) => setEditedTask(event.target.value)}
                        />
                    ) : (
                        <span 
							className="task-text"
							style={{ 
								textDecoration: completedTasks[index] ? "line-through" : "white",
								opacity: completedTasks[index] ? 0.5 : 1,
								color: completedTasks[index] ? "#6c757d" : "#000",
								transition: "0.3s ease-in-out",
							}}
						>
							{task}
						</span>
                    )}
					<div className="task-buttons">
					{editingIndex === index ? (
                            // Show save & cancel buttons when editing
                            <>
                                <button onClick={() => saveEditedTask(index)} className="save-button">Save</button>
                                <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                            </>
                        ) : (
                            // Normal task buttons
                            <>
                                <button onClick={() => deleteTask(index)} className="delete-button">
                                	<i className="bi bi-trash"></i>
                            	</button>
                                <button onClick={() => moveTaskUp(index)} className="move-button">⬆️</button>
                                <button onClick={() => moveTaskDown(index)} className="move-button">⬇️</button>
								<button onClick={() => editTask(index)} className="edit-button">
                                	<i className="bi bi-pencil"></i>
                            	</button>
                                <input 
                                    type="checkbox" 
                                    checked={!!completedTasks[index]}
                                    onChange={() => toggleTaskCompletion(index)}
                                />
                            </>
                        )}
					</div>
				</li>
			))}
			</ol>
		</>
    );
};

export default ToDoList;