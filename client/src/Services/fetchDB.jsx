import axios from 'axios';
const port =  'http://localhost:3000';

const getAllDetails = async () => {
  try {
    const { data } = await axios(`${port}/recipe_detail`);
    return data;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    throw error; // rethrow the error to handle it in the component
  }
};

export { getAllDetails };