import React,{ useState } from 'react'
import "./index.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  
  const addExpense = () => {
    if(description.trim() === "" || amount.trim() === "" || isNaN(parseFloat(amount))){
      alert("Please Enter a valid description and amount!");
      return;
  }

  const newExpense = {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
  };

  setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  setDescription("");
  setAmount("");
};

const deleteExpense = (id) => {
  setExpenses(expenses.filter((expense)=> expense.id !== id));
};

  return (
    <div className='container'>
      <h1>Expense Tracker</h1>
        <div className='expense-form'>
          <input type='text' placeholder='Expense Description' value={description} onChange={(e)=> setDescription(e.target.value)}/>
          <input type='number' placeholder='Amount' value={amount} onChange={(e)=> setAmount(e.target.value)}/>
          <button onClick={addExpense}>Add Expense</button>
        </div>
        <ul className='expense-list'>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} - ₹{expense.amount}
              <button className='delete-btn' onClick={()=>deleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h2>Total: ₹{expenses.reduce((total, expense) => total + expense.amount, 0)}</h2>
    </div>
  );
}

export default App