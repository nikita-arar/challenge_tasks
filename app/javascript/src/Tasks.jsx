import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "./queries/getTasks";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const TaskContainer = styled.div`
  display: ${(props) => (props.mode === "grid" ? "flex" : "block")};
  gap: ${(props) => (props.mode === "grid" ? "10px" : "0")};
  flex-wrap: ${(props) => (props.mode === "grid" ? "wrap" : "none")};
`;

const TaskWrapper = styled.div`
  margin-top: 15px;
`;

const Task = styled.div`
  padding: 10px;
  ${(props) =>
    props.mode === "list"
      ? "border-bottom: 1px solid #ccc;"
      : "background: lightgray; width: 100px; text-align: center;"}
`;

export function Tasks({ projectId }) {
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: { projectId },
    skip: !projectId,
    pollInterval: 5000,
  });

  const [viewMode, setViewMode] = useState("list");

  // Load the saved view mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("viewMode");
    if (savedMode) {
      setViewMode(savedMode);
    }
  }, []);

  // Save the current view mode to localStorage
  useEffect(() => {
    if (viewMode) {
      localStorage.setItem("viewMode", viewMode);
    }
  }, [viewMode]);

  // Display loading, error, or empty state
  if (!projectId) return <p>No project selected</p>;
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  // Toggle between list and grid view
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  return (
    <TaskWrapper>
      <Button onClick={toggleViewMode}>
        Switch to {viewMode === "list" ? "Grid" : "List"} View
      </Button>

      <TaskContainer mode={viewMode}>
        {data?.tasks?.length > 0 ? (
          data.tasks.map((task) => (
            <Task key={task.id} mode={viewMode}>
              {task.name}
            </Task>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </TaskContainer>
    </TaskWrapper>
  );
}
