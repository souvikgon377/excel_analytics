import config from '../config';

const apiService = {
  // Save data to the server
  saveData: async (data) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Add more API methods here as needed
};

export default apiService;
