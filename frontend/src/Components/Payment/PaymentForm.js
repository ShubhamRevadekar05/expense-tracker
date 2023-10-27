import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function PaymentForm() {
  const { addPayment, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    dueDate: "",
    payReceipt: "",
    category: "",
    description: "",
    otherCategory: "",
  });

  const { title, amount, dueDate,payReceipt, category, description, otherCategory } =
    inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPayment(inputState);
    setInputState({
      title: "",
      amount: "",
      dueDate: "",
      payReceipt: "",
      category: "",
      description: "",
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input
          type='text'
          value={title}
          name={"title"}
          placeholder='Payment Title'
          onChange={handleInput("title")}
        />
      </div>
      <div className='input-control'>
        <input
          value={amount}
          type='number'
          name={"amount"}
          placeholder={"Payment Amount"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className='input-control'>
        <DatePicker
          id='date'
          placeholderText='Enter Due Date'
          selected={dueDate}
          dateFormat='dd/MM/yyyy'
          onChange={(dueDate) => {
            setInputState({ ...inputState, dueDate: dueDate });
          }}
        />
      </div>
      <div className='row'>
        <label className='m-1' htmlFor='payReceipt'>
          Attach Receipt
        </label>
        <div className='input-control col'>
          <input
            value={payReceipt}
            type='file'
            name={"payReceipt"}
            placeholder={"Attach Receipt"}
            onChange={handleInput("payReceipt")}
          />
        </div>
        <div className='selects input-control col'>
          <select
            required
            value={category}
            name='category'
            id='category'
            onChange={handleInput("category")}
          >
            <option value='' disabled>
              Select Option
            </option>
            <option value='Education'>Education</option>
            <option value='Electricity'>Electricity</option>
            <option value='Groceries'>Groceries</option>
            <option value='Insurance'>Insurance</option>
            <option value='Medicine'>Medicine</option>
            <option value='Rent'>Rent</option>
            <option value='Transportation'>Transportation</option>
            <option value='Other'>Other</option>
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
          name={"Add Payment"}
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
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
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
`;
export default PaymentForm;
