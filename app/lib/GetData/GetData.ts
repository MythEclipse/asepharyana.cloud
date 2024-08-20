import axios from 'axios';

// Function to fetch data using axios
export async function getData(url: string) {
  try {
    const res = await axios.get(url);
    
    // Axios response does not have an `ok` property
    // Check for successful status codes (200-299)
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data with axios:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Function to fetch data using fetch
export async function getDataNC(url: string) {
  try {
    const res = await axios.get(url);
    
    // Axios response does not have an `ok` property
    // Check for successful status codes (200-299)
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data with axios:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
