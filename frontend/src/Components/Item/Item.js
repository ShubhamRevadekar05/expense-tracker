import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  calender,
  comment,
  money,
  tick,
  trash,
} from "../../utils/Icons";
import Button from "../Button/Button";

function Item({
  id,
  title,
  amount,
  date,
  category,
  deleteItem,
  makePayment,
  indicatorColor,
  type,
}) {
  

  return (
    <ItemStyled indicator={indicatorColor}>
      <div className='icon'>
        {money}
      </div>
      <div className='content'>
        <h5>{title}</h5>
        <div className='inner-content'>
          <div className='text'>
            <p>
              {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {category}
            </p>
          </div>

 
        </div>
        <div>
        <div className='row'>
            {type === 'payment' ?
            <>
              <div className='btn-con col'>
              <Button
                icon={tick}
                bPad={"0.5rem"}
                bRad={"50%"}
                bg={"var(--primary-color"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={() => makePayment(id)}
              />
            </div>
            </> :
            <>
            </>}
          
            <div className='btn-con col'>
              <Button
                icon={trash}
                bPad={"0.5rem"}
                bRad={"50%"}
                bg={"var(--primary-color"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={() => deleteItem(id)}
              />
            </div>
          </div>
        </div>
      </div>
    </ItemStyled>
  );
}

const ItemStyled = styled.div`
.row {
  display: flex; /* Make the buttons inside 'row' flex containers */
  justify-content: space-between; /* Space buttons apart */
  align-items: center; /* Center buttons vertically */
  @media screen and (max-width: 500px) {
    /* Optional: Adjust spacing or font size for mobile */
    /* Example: margin: 0.5rem; */
  }
}

.btn-con {
  width: 48%; /* Set the width of each button container */
  text-align: center; /* Center the button horizontally */
  @media screen and (max-width: 500px) {
    width: 48%; /* Adjust width for mobile screens */
  }
}
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    @media screen and (max-width: 500px) {
        width: 10px;
    height: 10px;
        }
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        @media screen and (max-width: 500px) {
        gap: 0.5rem;
        }

        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
          @media screen and (max-width: 500px) {
        gap: 0.5rem;
        }
        }
      }
    }
  }
`;

export default Item;
