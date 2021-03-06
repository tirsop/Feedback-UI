import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";
import useLocalStorage from "use-local-storage";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  // // lines 9~15 dissapear when  refresh. Lines 16~22 use local storage to keeep the new comments
  // const [feedback, setFeedback] = useState([
  //   {
  //     id: 1,
  //     text: "This Feedback App works great! I can use this code to allow users to rate my products. It is build with React using hooks (useState, useContext, useEffect), it has styling components and uses the React router.",
  //     rating: 10
  //   },
  // ]);
  const [feedback, setFeedback] = useLocalStorage("feedback", [
    {
      id: 1,
      text: "This Feedback App works great!! I can use this code to allow users to rate my products. It is build with React using hooks (useState, useContext, useEffect), it has styling components and uses the React router. Also keeps your feedback in the page using your local storage!",
      rating: 10
    }
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  const addFeedback = (newFeedback) => {
    newFeedback.id = parseInt(uuidv4());
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)))
  };


  return (
    <FeedbackContext.Provider value={{
      feedback,
      deleteFeedback,
      addFeedback,
      editFeedback,
      feedbackEdit,
      updateFeedback
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext