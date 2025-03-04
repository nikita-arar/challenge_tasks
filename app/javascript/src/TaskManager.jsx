import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "./queries/getProjects";
import { Tasks } from "./Tasks";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
`;

const Option = styled.option`
  padding: 10px;
`;

const TaskManager = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;

  const projects = data.projects;

  return (
    <Container>
      <Title>Task Manager</Title>

      <Select onChange={(e) => setSelectedProject(e.target.value)}>
        <Option value="">Select Project</Option>
        {projects.map((p) => (
          <Option key={p.id} value={p.id}>
            {p.name}
          </Option>
        ))}
      </Select>

      <Tasks projectId={selectedProject} />
    </Container>
  );
};

export default TaskManager;
