const handleFormSubmit = async (email, password) => {
    // event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful!', data); 
      } else {
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    }
  };

  export default { handleFormSubmit };