import React, {useState} from "react";

function ContactUsForm() {
    const [department, setDepartment] = useState('');
    const [message, setMessage] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
  
    const [departmentError, setDepartmentError] = useState(null);
    const [messageError, setMessageError] = useState(null);
    const [agreedToTermsError, setAgreedToTermsError] = useState(null);
  
    const [departmentTouched, setDepartmentTouched] = useState(false);
    const [messageTouched, setMessageTouched] = useState(false);
    const [agreedToTermsTouched, setAgreedToTermsTouched] = useState(false);
  
    function handleSubmit(event) {
      event.preventDefault();
  
      const isValid = !departmentError && !messageError && !agreedToTermsError;
      if (!isValid) {
        return;
      }
      console.log('submitting', { department, message, agreedToTerms });
    }
  
    React.useEffect(() => {
      validate();
    }, [department, message, agreedToTerms]);
  
    function validate() {
      setDepartmentError(null);
      setMessageError(null);
      setAgreedToTermsError(null);
      if (department === '') {
        setDepartmentError('Department is required.');
      }
      if (message === '') {
        setMessageError('Message is required.');
      }
      if (agreedToTerms === false) {
        setAgreedToTermsError('You must agree to the terms and conditions.');
      }
    }
  
    function stateToString() {
      return JSON.stringify(
        {
          values: { department, message, agreedToTerms },
          errors: { departmentError, messageError, agreedToTermsError },
          touched: { departmentTouched, messageTouched, agreedToTermsTouched },
        },
        null,
        ' '
      );
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <select
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          onBlur={(e) => setDepartmentTouched(true)}
        >
          <option value="">Select...</option>
          <option value="hr">Human Resources</option>
          <option value="pr">Public Relations</option>
          <option value="support">Support</option>
        </select>
        <br />
        {departmentError && departmentTouched && (
          <p className="alert">{departmentError}</p>
        )}
        <br />
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={(e) => setMessageTouched(true)}
          cols="30"
          rows="10"
        />
        <br />
        {messageError && messageTouched && (
          <p className="alert">{messageError}</p>
        )}
        <input
          type="checkbox"
          name="agreedToTerms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          onBlur={(e) => setAgreedToTermsTouched(true)}
        />
        I agree to the terms and conditions.
        <br />
        {agreedToTermsError && agreedToTermsTouched && (
          <p className="alert">{agreedToTermsError}</p>
        )}
        <button>Send</button>
        <pre>{stateToString()}</pre>
      </form>
    );
  }

export default ContactUsForm;