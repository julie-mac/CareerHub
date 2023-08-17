const handleFormSubmit = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), 
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful!', data); 
      return data;
    } else {
      console.log('Login failed:', response.statusText);
      return { error: response.statusText }; // Return an object with an error key
    }
  } catch (error) {
    console.error('An error occurred while logging in:', error);
    throw error;
  }
};

export default { handleFormSubmit };
