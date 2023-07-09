import React, {Fragment, useState, useEffect} from "react";

import { projectAPI } from "./projectAPI";
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

function ProjectsPage(){
  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Approach 1: using promise then
  //  useEffect(() => {
  //    setLoading(true);
  //    projectAPI
  //      .get(1)
  //      .then((data) => {
  //        setError(null);
  //        setLoading(false);
  //        setProjects(data);
  //      })
  //      .catch((e) => {
  //        setLoading(false);
  //        setError(e.message);
  //        if (e instanceof Error) {
  //           setError(e.message);
  //        }
  //      });
  //  }, []);

  // Approach 2: using async/await
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(1);
        setError('');
        setProjects(data);
      }
        catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const saveProject = (project: Project) => {
    console.log('Saving project: ', project);
    // let updatedProject = projects.map((p:Project) => {
    //   return p.id === project.id ? project: p;
    // });
    // setProjects(updatedProject);
    projectAPI.put(project).then((updatedProject) => {
        let updatedProjects = projects.map((p:Project) => {
        return p.id === project.id ? new Project(updatedProject): p;
      });
      setProjects(updatedProjects);
    })
    .catch((e) => {
      if (e instanceof Error) {
        setError(e.message);
      }
    });
  };
  return (
    <Fragment>
      <h1>Projects</h1>
    <ProjectList projects={projects} onSave={saveProject}/>
  
    {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
    )}
    </Fragment>
  );
}
export default ProjectsPage;