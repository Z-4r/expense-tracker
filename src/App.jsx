import React from 'react'

const App = () => {
  return (
    <div className='container'>
      <h1>Expense Tracker</h1>
        <div className='expense-form'>
          <input type='text' placeholder='Expense Description' />
          <input type='number' placeholder='Amount' />
          <button>Add Expense</button>
        </div>
        <ul className='expense-list'>
          <li> Food - ₹500</li>
          <li> Transport - ₹200</li>
        </ul>
    </div>
  );
}

export default App