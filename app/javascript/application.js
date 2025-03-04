import React from "react";
import ReactDOM from 'react-dom/client';
import TaskManager from "./components/TaskManager";

document.addEventListener("DOMContentLoaded", () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<TaskManager />);
});
