import React, { useEffect , useState} from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Button from '../Button/Button';

import { plus, trash } from '../../utils/Icons';
const Form = styled.form`
  display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        width: 150%;
        display: flex;
        justify-content: flex-end;
        select{
            width: 150%;
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
`;

const Background = styled.form`
  height: 300px;
  width: 60%;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 44%;
  left: 60%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border-radius: 5px;
        border: 2px solid #fff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 50px 35px;
  .input-control{
        input{
            width: 60%;
        }

    }
    .input-control{
        button{
            width: 30%;
            outline: none;
            border: none;
            font-family: inherit;
            font-size: inherit;
            display: flex;
            align-items: right;
            gap: .5rem;
            cursor: pointer;
            transition: all .4s ease-in-out;
        }
        
    }
  `;



function Budget() {
    const {addBudget, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        amount: '',
        date: '',
        category:'',

    })

    const {  category,otherCategory } = inputState;
    
    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addBudget(inputState)
        setInputState({
            amount: '',
            category:'',
      
        })
    }

const [isOn, setIsOn] = useState(false);

  useEffect(() => {}, []);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
    return (
        <IncomeStyled>
            <InnerLayout>
                
                <h1>Budget</h1>
                <h2 className="total-income">Total Budget: <span>${5000}</span></h2>
                <div className="income-content">
                    <Form>
                    <div className="form-container">
                    <div className="salar-item">
                            <div className="selects input-control">
                            <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                                <option value="" disabled >Select Option</option>
                                <option value="education">Education</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Rent">Rent</option>
                                <option value="transportation">Transportation</option>  
                                <option value="transportation">Transportation</option>  
                                <option value="other">Other</option>

                            </select>
                            </div>

                            {category === 'other' && ( 
                            <div className="input-control">
                                <input
                                    type="text"
                                    value={category}
                                    name={'otherCategory'}
                                    placeholder="Other Category"
                                    onChange={handleInput('category')}
                                />
                            </div>
                            )}
                    </div>
                    <Background>

                    <div className="input-control">
                    <div className='card-buget'>
                        <input type="number" placeholder='Amount'></input>
                        
                        <button 
                        className={`on-off ${isOn ? 'on' : 'off'}`}
                        onClick={handleToggle}
                        >
                        {isOn ? 'On' : 'Off'}
                        </button>
         
                    </div>
                    <div className="submit-btn">
                <Button 
                    name={'Add Budget'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />

            <Button 
                    name={'Delete'}
                    icon={trash}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                 </div>
            </div>

            </Background>

                    </div>
                    </Form>
                </div>
                
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
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
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
  .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Budget