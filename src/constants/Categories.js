
import axios from 'axios';
import { baseUrl } from './Constants';

const fetchCategories = () => {
  // Simulate network request delay
  return axios.get(baseUrl+'/forum/')
  .then(response => {
    console.log('inside my categoreis'+response)
    // Assuming the categories are stored in response.data
    return response.data;
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error('Error fetching categories:', error);
    throw error; // Rethrow the error to be handled by the caller
  });
};

// export default fetchCategories;
