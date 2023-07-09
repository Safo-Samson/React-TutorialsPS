import React, { useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps{
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}
function ProjectForm({ onSave, onCancel, project: initialProject }: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: ''
  });

  const validate = (project: Project) => {
    const errors: any = {name: '', description: '', budget: ''};
    if(project.name.length === 0) {
      errors.name = 'Name is required';
    }

    if(project.name.length > 0 && project.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters';
    }

    if(project.description.length === 0) {
      errors.description = 'Description is required';
    }

    if(project.budget === 0) {
      errors.budget = 'Budget must be be more than $0';
    }
    return errors;
  };

  const isValid = () => {
    return(
      errors.name.length === 0 && 
      errors.description.length === 0 && 
      errors.budget.length === 0
    );
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    project: Project;
    // onSave(new Project({ name: 'Updated Project' }));
    if(!isValid()) return;
    onSave(project);
  };
  const handleChange = (event: SyntheticEvent) =>{
    const {type, name, value, checked} = event.target;
    console.log(type, name, value, checked);
    let updatedValue = (type === 'checkbox' ? checked: value);
    if(type === 'number') {
      updatedValue = Number(value);
    }

    const change = {
      [name]: updatedValue
    }
    let updatedProject: Project;

    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change

    setProject((p) => {
      updatedProject = new Project({...p, ...change});
      return updatedProject
    });

    setErrors(() => validate(updatedProject));
  };
  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
      { errors.name.length > 0 &&(<div className="card error">{errors.name}</div>) }
      <label htmlFor="description">Project Description</label>
      <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange} />
      { errors.description.length > 0 &&(<div className="card error">{errors.description}</div>) }
      <label htmlFor="budget">Project Budget</label>
      <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
      { errors.budget.length > 0 &&(<div className="card error">{errors.budget}</div>) }
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;