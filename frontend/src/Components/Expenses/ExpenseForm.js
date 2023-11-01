import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm() {
  const { addExpense, error, setError, getCategories } = useGlobalContext();
  const [categories, setCategories] = useState(getCategories());
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    receipt: "",
    category: "",
    description: "",
    otherCategory: "",
  });

  const { title, amount, date, receipt, category, description, otherCategory } =
    inputState;

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleInput = (name) =>  async (e) => {
    if (name === "receipt") {
      setInputState({ ...inputState, [name]: e.target.files[0]});
    }
    else setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addExpense({
      title,
      amount,
      date,
      category,
      description,
      otherCategory,
      receipt: receipt ? {name: receipt.name, data: await convertBase64(receipt)} : ""
    });
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
      receipt: ""
    });
    setCategories(getCategories());
    e.target.reset();
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input
          type='text'
          value={title}
          name={"title"}
          placeholder='Expense Title'
          onChange={handleInput("title")}
          required
        />
      </div>
      <div className='input-control'>
        <input
          value={amount}
          type='number'
          name={"amount"}
          placeholder={"Expense Amount"}
          onChange={handleInput("amount")}
          required
        />
      </div>
      <div className='input-control'>
        <DatePicker
          id='date'
          placeholderText='Enter A Date'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
          required
        />
      </div>
      <div className='row'>
        <label className="m-1" htmlFor='receipt'>Attach Receipt</label>
        <div className='input-control-file col'>
          <input
            type='file'
            name={"receipt"}
            placeholder={"Attach Receipt"}
            onChange={handleInput("receipt")}
          />
        </div>
        <br></br>
        <div className='selects input-control-select col'>
          <select
            required
            value={category}
            name='category'
            id='category'
            onChange={handleInput("category")}
          >
            {categories.map(element => {
              return <option value={element}>{element}</option>
            })}
            <option value="Other">Other</option>
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

      <div className='input-control'>
        <textarea
          name='description'
          value={description}
          placeholder='Add A Reference'
          id='description'
          cols='30'
          rows='4'
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className='submit-btn'>
        <Button
          name={"Add Expense"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media screen and (max-width: 500px) {
        width: auto;
      }
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    @media screen and (max-width: 500px) {
      padding: 0.5rem 0.5rem;
      width:100%;
    }
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
      @media screen and (max-width: 500px) {
        width: 100%;
      }
    }
  }

  .selects {
    display: flex;
    @media screen and (max-width: 500px) {
        width: auto;
        
      }
    select {
      color: rgba(34, 34, 96, 0.4);
      @media screen and (max-width: 500px) {
        width: auto;
        
      }
      }
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

  .row{
  display: flex;
  flex-direction: row; /* Display horizontally by default */
  @media screen and (max-width: 500px) {
    flex-direction: column; /* Switch to vertical on smaller screens */
}
}
  .input-control-file, .input-control-select{
    flex:1;
    margin-top:5%;
  }


`;
export default ExpenseForm;
