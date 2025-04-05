import React, { useState, useRef } from 'react';
import './index.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const nodeRefs = useRef({}); // store refs for CSSTransition

  const addExpense = () => {
    if (description.trim() === "" || amount.trim() === "" || isNaN(parseFloat(amount))) {
      alert("Please enter a valid description and amount!");
      return;
    }

    const id = Date.now();
    const newExpense = {
      id,
      description,
      amount: parseFloat(amount),
    };

    nodeRefs.current[id] = React.createRef(); // store ref for this item
    setExpenses((prev) => [...prev, newExpense]);
    setDescription("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    delete nodeRefs.current[id]; // clean up ref
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <TransitionGroup component="ul" className="expense-list">
        {expenses.map((expense) => {
          const ref = nodeRefs.current[expense.id] || React.createRef();
          nodeRefs.current[expense.id] = ref;

          return (
            <CSSTransition
              key={expense.id}
              nodeRef={ref}
              timeout={300}
              classNames="fade"
            >
              <li ref={ref} className="expense-item">
                {expense.description} - ₹{expense.amount}
                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </button>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>

      <h2>Total: ₹{expenses.reduce((sum, e) => sum + e.amount, 0)}</h2>
    </div>
  );
}

export default App;
