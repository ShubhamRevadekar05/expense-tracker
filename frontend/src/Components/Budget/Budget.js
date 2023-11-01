import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";

function Budget() {
  const { budgets, addBudget, getBudgets, deleteBudget, totalBudget, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    amount: "",
    category: "Overall",
  });

  const { amount, category, otherCategory } = inputState;

  const [isOn, setIsOn] = useState(false); // Declare isOn state variable here
  const [categories, setCategories] = useState(getCategories());
  const [thisBudget, setThisBudget] = useState(null);

  useEffect(() => {
    getBudgets();
    document.getElementById("add-budget-button").hidden = true
    document.getElementById("delete-budget-button").hidden = true;
  }, []);
  
  useEffect(() => {
    let budget = budgets.find(element => element.category === category);
    if(budget) {
      setThisBudget(budget);
      setIsOn(true);
      setInputState({
        amount: budget.amount,
        category: category
      });
      document.getElementById("delete-budget-button").hidden = false;
    }
    else {
      setIsOn(false);
      setInputState({
        amount: "",
        category: category
      });
      document.getElementById("delete-budget-button").hidden = true;
    }
  }, [budgets, category]);

  useEffect(() => {
    if(isOn) document.getElementById("add-budget-button").hidden = false;
    else document.getElementById("add-budget-button").hidden = true;
  }, [isOn]);

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget(inputState);
    setInputState({
      amount: "",
      category: "Overall",
    });
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOn(!isOn);
  };

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Budget</h1>
        <h2 className='total-expense'>
          Total Budget: <span>₹{totalBudget()}</span>
        </h2>
        <div className='expense-content'>
          <Form onSubmit={handleSubmit}>
            <div className='form-container'>
              <div className='salar-item'>
                <div className='selects input-control'>
                  <select
                    required
                    value={category}
                    name='category'
                    id='category'
                    onChange={handleInput("category")}
                  >
                    <option value="Overall">Overall</option>
                    {categories.map(element => {
                      return <option value={element}>{element}</option>
                    })}
                  </select>
                </div>

                {category === "Other" && (
                  <div className='input-control'>
                    <input
                      type='text'
                      value={otherCategory}
                      name={"category"}
                      placeholder='Other Category'
                      onChange={handleInput("otherCategory")}
                      required
                    />
                  </div>
                )}
              </div>
              
               
                  <div className='card-budget'>
                    

                    <button
                      id='on'
                      className={`on-off ${isOn ? "on" : "off"}`}
                      onClick={handleToggle}
                    >
                      {isOn ? "On" : "Off"}
                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type='number' placeholder='Amount' value={amount} name={"amount"}  onChange={handleInput("amount")} required ></input>
                  </div>
                  <div className='submit-btn'>
                    <button className='Add-Budget' onClick={handleSubmit} id="add-budget-button">
                      <i className='fa fa-plus'></i>&nbsp;&nbsp;Add Budget
                    </button>{" "}
                   
                    <button className='Delete' id="delete-budget-button" onClick={(e) => {e.preventDefault(); deleteBudget(thisBudget._id);}} >
                      <i className='fa fa-trash'></i>&nbsp;&nbsp;Delete
                    </button>
                  </div>
               
              
            </div>
          </Form>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  height:100%;

  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .expense-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
  @media screen and (max-width: 768px) {
    margin: 1rem auto; /* Centering the form horizontally */
    width: 90%; /* Adjusted width for smaller screens */
  }
`;

const Form = styled.form`
height: 100%; /* Set to 100% for full page height */
max-height: none;
max-height: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px; /* Adjusted the border-radius */
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

 .selects {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    //   @media screen and (max-width: 500px) {
    //     margin-left:-50%;
    //     width: fit-content;
    // }
 @media screen and (max-width: 500px) {
      margin-left: 0; /* Adjusted for small screens */
      width: 100%; /* Adjusted for small screens */
    }
    select {

      margin-top:5%;
      width: 100%;
      color: rgba(34, 34, 96, 0.4);
       @media screen and (max-width: 500px) {
        margin-top: 5%;
        width: 100%;
      }

      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

.input-control {
    input {
      width: 30rem;
    }
  }
  .card-budget {
    @media screen and (max-width: 500px) {
    margin-left: 0;
      }
    .on {
      @media screen and (max-width: 500px) {
        margin-left: 0;
        width: 30%;
      }
      margin-top:10%;
     margin-bottom: 10%;
      width: 20%;
      margin-left: 1rem;
      outline: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      display: inline block;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      padding: 0.8rem 1.6rem;
      border-radius: 30px;
      border: 2px solid #fff;
      color: white;
      background-color: var(--color-green);
    }
    .off {
            @media screen and (max-width: 500px) {
        margin-left: 0;
        width: 30%;
      }
      margin-top:10%;
      margin-bottom: 10%;
      width: 20%;
      margin-left: 1rem;
      outline: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      display: inline block;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      padding: 0.8rem 1.6rem;
      border-radius: 30px;
      border: 2px solid #fff;
      background-color: grey;
    }
  }

  button.Add-Budget {
    @media screen and (max-width: 500px) {
    margin-left:0;
   }
    margin-top:10%;
    width: 50%;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: inline-block;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    background-color: #f56692;
    padding: 0.8rem 1.6rem;
    border-radius: 30px;
    border: 2px solid #fff;
    color: white;
  }
  button.Delete {
        @media screen and (max-width: 500px) {
margin-left:0;
   }
    width: 45%;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: inline-block;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    background-color: #f56692;
    padding: 0.8rem 1.6rem;
    border-radius: 30px;
    border: 2px solid #fff;
    color: white;
    text-align: center;
  }

  }
`;

export default Budget;
