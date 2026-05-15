import React from "react";
import{Project} from "@/type"

interface ProjectProps {
  project: Project;
  admin: number;
}
const ProjectComponent: React.FC<ProjectProps> = ({ project, admin }) => {
  return (
    <div> ProjectComponent</div>
  );
}
export default ProjectComponent;
