import React, { useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Expenses from './Components/Expenses/Expenses';
import Payments from './Components/Payment/Payments';
import Budget from './Components/Budget/Budget';
import Analysis from './Components/Analysis/Analysis';
import { useGlobalContext } from './context/globalContext';
import Register from './Components/LR/Register';
import Login from './Components/LR/Login';
import 'react-notifications/dist/react-notifications.css';
import { NotificationContainer } from 'react-notifications';

function App() {
  const { active } = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Expenses />;
      case 3:
        return <Payments />;
      case 4:
        return <Budget />;
      case 5:
        return <Analysis />;
      case 6:
        return <Register />;
      case 7:
        return <Login />;
      default:
        return <Dashboard />;
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <Navigation />
          <main>
            {displayData()}
          </main>
        </MainLayout>
        <NotificationContainer />
      </AppStyled>
    </>
  );
}

const AppStyled = styled.div`
  height: 100%;
  background-image: url(${props => props.bg});
    background-repeat: no-repeat;
    background-attachment: fixed; 
    background-size: 500% 500%;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    background-repeat: no-repeat;
    background-attachment: fixed; 
    background-size: 100% 100%;
    }
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: hidden;
    display: flex;
    //height: fit-content;
    min-height: 100px;
    @media screen and (max-width: 500px) {
      width: 100%;
  }
`;

export default App;
