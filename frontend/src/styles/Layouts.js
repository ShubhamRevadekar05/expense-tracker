import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: auto;
    min-height: 100vh;
    display: flex;
    //flex-wrap: wrap;
    gap: 2rem;

    @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 1rem;
     height: auto; // Set height to 'auto' for small screens
    max-height: none; // Remove the max-height property
    width: 100%;
  }
`;


export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
    @media screen and (max-width: 500px) {
      width: 100%;
      }
`;