
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL
console.log(apiUrl);
const apiClient=axios.create({
  baseURL:apiUrl
})
apiClient.interceptors.response.use(response=>response,error=>{console.error('axiox error responsse',error.response)
  return Promise.reject(error);
});
export default {
  // פונקציה לקבלת כל המשימות
  getTasks: async () => {
    try {
    const result=await axios.get('https://authserver-m253.onrender.com/items'); 
      return result.data;
    } catch (error) {
      console.error('Error in getTasks:', error.message);
      return [];
    }
  },


  // פונקציה להוספת משימה חדשה
  addTask: async (name) => {
    try {
      const result = await axios.post('https://authserver-m253.onrender.com/items', { name ,isComplete:false})

      console.log('addTask', result.data);
      return result.data;
    } catch (error) {
      console.error('Error in addTask:', error.message);
      return {};
    }
  },
 
  // פונקציה לעדכון סטטוס משימה
  setCompleted: async (id, isComplete) => {
    try {
      const result = await  axios.put(`https://authserver-m253.onrender.com/items/${id}?updatedItem=${isComplete}`)
      console.log('setCompleted', { id, isComplete });
      return result.data;
    } catch (error) {
      console.error('Error in setCompleted:', error.message);
      throw error; // חשוב לזרוק את השגיאה כדי שתוכל לתפוס אותה במקום אחר אם יש צורך
    }
  },
  // פונקציה למחיקת משימה לפי מזהה
  deleteTask: async (id) => {
    try {
      await  axios.delete(`https://authserver-m253.onrender.com/items/${id}`)
      console.log('deleteTask', id);
      return {};
    } catch (error) {
      console.error('Error in deleteTask:', error.message);
      return {};
    }
  },
};