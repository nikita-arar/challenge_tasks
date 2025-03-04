import React, { useState, useEffect } from "react";

const TaskManager = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `{ projects { id name } }`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.data.projects);
                if (data.data.projects.length > 0) {
                    setSelectedProject(data.data.projects[0].id);
                }
            });
    }, []);

    useEffect(() => {
        if (selectedProject) {
            fetch("/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `{ tasks(projectId: ${selectedProject}) { id name } }`,
                }),
            })
                .then((res) => res.json())
                .then((data) => setTasks(data.data.tasks));
        }
    }, [selectedProject]);

    return (
        <div>
            <h1>Task Manager</h1>
            <label>Выберите проект:</label>
            <select onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>

            <h2>Задачи</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
