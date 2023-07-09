import React from "react";
function ExampleForm() {
    const [value, setValue] = React.useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <form>
        <input type="text" value={value} onChange={handleChange} />
        <pre>{value}</pre>
      </form>
    );
  }
  
export default ExampleForm;
