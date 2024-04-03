import Title from "../components/DashboardTitle";
import Sidebar from "../components/SideBar";
import Modal from "../components/Modal.jsx";
import OpenExpenseModal from "../components/OpenExpenseModal.jsx";
import "../styles/expense.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Expense() {
  //Participant updating varibles - Lawrence Jordan
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [expenseUpdate, setExpenseUpdate] = useState(false);
  const [isValidPercentage, setIsValidPercentage] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [currentExpenseID, setCurrentExpenseID] = useState("");

  //----
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [splitEqually, setSplitEqually] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false); // Used to trigger re-fetching
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const { groupId } = useParams();

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await axios.get(
          `https://csci4177-final-api.onrender.com/expenses/getAllExpenses/${groupId}`
        );
        console.log(response.data);
        setExpenses(response.data); // Assuming the API returns an array of expenses
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };


    getExpenses();
  }, [fetchTrigger]); // Dependency on fetchTrigger to refetch when it changes


  const resetFormFields = () => {
    setDescription("");
    setAmount(0);
    setDate("");
    setSplitEqually(false);
    setIsEditing(false);
    setEditingExpenseId(null);
  };


  const startEditing = (event, expense) => {
    event.stopPropagation();

    setDescription(expense.description);
    setAmount(expense.amount);
    setDate(expense.date.split("T")[0]); // Ensure date is in 'YYYY-MM-DD' format
    setSplitEqually(expense.splitEqually);
    setEditingExpenseId(expense.id); // Track which expense is being edited
    setIsEditing(true);
    setIsModalOpen(true);
  };


  // Update your handleSubmit function to include the API call
  const handleSubmit = async (event) => {
    event.preventDefault();
    const expenseData = {
      description,
      amount: Number(amount),
      date,
      splitEqually,
    };


    try {
      if (isEditing && editingExpenseId) {
        // Update the expense
        await axios.put(
          `https://csci4177-final-api.onrender.com/expenses/editExpense/${editingExpenseId}`,
          expenseData
        );
        setSuccessMessage("Expense updated successfully!");
      } else {
        // Add a new expense
        await axios.post(
          `https://csci4177-final-api.onrender.com/expenses/addExpense/${groupId}`,
          expenseData
        );
        setSuccessMessage("Expense added successfully!");
      }
      // Common cleanup
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      resetFormFields();
      setIsModalOpen(false);
      setFetchTrigger((f) => !f); // Refresh the expenses list
    } catch (error) {
      console.error("Failed to process expense", error);
    }
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    setIsExpenseOpen(false);
    resetFormFields();
  };

  const handleDeleteExpense = async (event, expenseId) => {
    //Stop the delete button from also opening expense info
    event.stopPropagation();

    try {
      await axios.delete(
        `https://csci4177-final-api.onrender.com/expenses/deleteExpense/${expenseId}`
      );
      setFetchTrigger((f) => !f); // Trigger expenses re-fetch
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };


  //Expense participant update functions - Lawrence Jordan
  /**
   * Pulls the expense's participant info from the database
   * @param {*} expenseId 
   * @author Lawrence Jordan
   */
  const handleOpenExpense = async (expenseId) => {
    try {
      const response = await axios.get(
        `https://csci4177-final-api.onrender.com/expenses/getParticipants/${expenseId}`
      );
      
      setParticipants(response.data); // Assuming the API returns an array of participants
      setIsExpenseOpen(true); //Open the modal view
      setCurrentExpenseID(expenseId); //Keep track of what expense it currently open

    } catch (error) {
      console.error("Failed to find expense", error);
    }
  }

  /**
   * switches to edit screen
   * @author Lawrence Jordan
   */
  const amountEdit = () => {
    setIsExpenseOpen(false);
    setExpenseUpdate(true);
  }

  /**
   * Switches back to view screen
   * @author Lawrence Jordan
   */
  const handleExpenseUpdateCancel = () => {
    setExpenseUpdate(false);
    handleOpenExpense(currentExpenseID);
  }

  /**
   * Check for valid percentage inputs every time the value changes
   * @param {*} percentage 
   * @param {*} participantID
   * @author Lawrence Jordan 
   */
  const handleExpenseUpdate = (percentage, participantID) => {
    //Add up each participants percentage
    let totalPercentage = 0;
    participants.forEach(participant => {
      if (participant.userID == participantID) participant.sharePercentage = percentage;
      totalPercentage += parseInt(participant.sharePercentage);
    });

    //Check if 100
    if (totalPercentage != 100) {
      setIsValidPercentage(false); //Set false to show validation message
    }
    else setIsValidPercentage(true);
  }

  /**
   * If the percentage inputs are valid, attempts to add the new values to the database
   * @param {*} event 
   * @author Lawrence Jordan
   */
  const handleExpenseUpdateSubmit = async (event) => {
    event.preventDefault();

    if (isValidPercentage) {
      expenses.forEach(expense => { //Find current expense to pull total cost amount
        if (expense.id == currentExpenseID) {
          participants.forEach(participant => {
            participant.amountOwed = (expense.amount * (participant.sharePercentage / 100)) //Calculate amount owed using new percentage
          });
        }
      });

      //Send to database
      try {
        await axios.put(
          `https://csci4177-final-api.onrender.com/expenses/editParticipants/${currentExpenseID}`, participants);
        setSuccessMessage("Expense updated successfully!");

        // Common cleanup
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        handleExpenseUpdateCancel();

      } catch (error) {
        console.error("Failed to process expense", error);
      }
    }
    else alert("Percentages are not valid");

  }

  return (
    <>
      <div className="expenses-header">
        <Title />
        <hr className="full-width-line" />
      </div>
      <Sidebar page={"group"} />
      <hr className="full-width-line" />
      <div className="container-fluid">
        <div className="row">
          <div className="dashboard">
            <div
              className="card add-expense"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="plus-icon">+</div>
              <div className="text">Add Expense</div>
            </div>


            {/* Other columns */}


            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <form onSubmit={handleSubmit} className="expense-form">
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <label>
                  Amount:
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6">
                      <label className="checkbox-label">Split Equally:</label>
                    </div>
                    <div className="col-sm">
                      <input
                        type="checkbox"
                        name="splitEqually"
                        checked={splitEqually}
                        onChange={(e) => setSplitEqually(e.target.checked)}
                      />
                    </div>
                    <div className="col-sm"></div>
                  </div>
                </div>


                <button type="submit" className="submit-button">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </form>
            </Modal>
            {expenses.map((expense) => (
              <div className="card" key={expense.id} onClick={() => handleOpenExpense(expense.id)}>
                <div className="expense-info">
                  <div>{expense.description}</div>
                  <div>${expense.amount.toFixed(2)}</div>
                  <div>{new Date(expense.date).toLocaleDateString()}</div>
                </div>
                <button
                  className="delete-expense"
                  onClick={(e) => handleDeleteExpense(e, expense.id)}
                  aria-label="Delete expense"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="#4a5568"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="delete-icon"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>


                <button
                  className="edit-expense"
                  onClick={(e) => startEditing(e, expense)}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="edit-icon"
                  >
                    <path d="M4 13v3h3l8-8-3-3-8 8zm9.5-9.5l3 3L17 5l-3-3-3 3z" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Viewing mode when you click on an expense - Lawrence Jordan  */}
            <OpenExpenseModal isOpen={isExpenseOpen} onClose={() => setIsExpenseOpen(false)}>
              <div className="open-expense">
                {participants.map((participant) => (
                  <div className="participant-card" key={participant.userID}>
                    <div className="participant-info">
                      <div>{participant.name}</div>
                      <div>Amount Owed: ${participant.amountOwed.toFixed(2)}</div>
                      <div>Percentage: {participant.sharePercentage}%</div>
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" onClick={amountEdit} className="edit-button">Update Percentages</button>
              <button type="button" onClick={handleCancel} className="close-button">Close</button>
            </OpenExpenseModal>
            
            {/* Editing mode when you click on an expense - Lawrence Jordan  */}
            <OpenExpenseModal isOpen={expenseUpdate} onClose={() => setExpenseUpdate(false)}>
              <div className="open-expense">
                <form onSubmit={handleExpenseUpdateSubmit} className="expense-update-form">
                  {participants.map((participant) => (
                    <div className="participant-card" key={participant.userID}>
                      <div className="participant-info">
                        <div>{participant.name}</div>
                        <div>Amount Owed: ${participant.amountOwed.toFixed(2)}</div>
                        <label>Percentage: <input type="number" name="amount-owed" placeholder={participant.sharePercentage} className="percentage-input" onChange={(e) => handleExpenseUpdate(e.target.value, participant.userID)} /></label>
                        {!isValidPercentage &&
                          <p>Percentages do not equal 100%</p>
                        }
                      </div>
                    </div>
                  ))}

                  <button type="submit" className="submit-button">Save</button>
                  <button type="button" onClick={handleExpenseUpdateCancel} className="close-button">Cancel</button>
                </form>
              </div>
            </OpenExpenseModal>

          </div>
        </div>
      </div>
      {showSuccessMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </>
  );
}
