import React from "react";

function SigninForm() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(username, password);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    );
  }

  export default SigninForm;