import React from 'react';

const ExpenseForm = ({ onSave, onCancel }) => {
  // Prevent form submission from reloading the page
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(); // You might want to pass form data to the onSave method
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FFF',
      color:'Black',
      padding: '40px',
      width: '90%',
      maxWidth: '500px',
      zIndex: 1001,
      borderRadius: '12px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      fontFamily: "'Poppins', sans-serif",
      boxSizing: 'border-box',
    }}>
      <h2 style={{ marginBottom: '20px', fontWeight: '600', fontSize: '24px', color: '#333' }}>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description:</label>
          <input type="text" name="description" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Amount:</label>
          <input type="number" name="amount" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Paid By:</label>
          <select name="paidBy" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', appearance: 'none' }}>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Split Equally:</label>
          <input type="checkbox" name="splitEqually" />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Date:</label>
          <input type="date" name="date" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Add Image:</label>
          <input type="file" name="image" style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onCancel} style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#ccc', cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default ExpenseForm;