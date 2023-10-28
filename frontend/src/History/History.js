import React from 'react'
import styled from 'styled-components'

function History({title, list, budgetStyled}) {
    return (
        <HistoryStyled>
            <h2>{title}</h2>
            {list.map((item) =>{
                const {_id, title, amount} = item
                return (
                    <div key={_id} className={budgetStyled ? "budget-item" : "history-item"}>
                        <p>
                            {title}
                        </p>

                        <p>
                            {amount}
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .budget-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: red
    }
`;

export default History