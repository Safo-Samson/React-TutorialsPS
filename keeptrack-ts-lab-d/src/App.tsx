import React from 'react';
// import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import Hooks from './core/Hooks';
import ExampleForm from './core/ExampleForm';
import SigninForm from './core/SingleForm';
import ContactUsForm from './core/ContactUsForm';
function App() {
  return (
       <div className="container">
          <ProjectsPage />
          {/* <ExampleForm />
          <SigninForm />
          <ContactUsForm /> */}
       </div>
  );
}

export default App;
