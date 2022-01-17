import styled, { css } from 'styled-components';

export const Container = styled.main`
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid #bdc3c755;
  border-radius: 7px;
  display: flex;
  flex-flow: column nowrap;
  max-width: 1024px;
  width: 95%;
`;

export const HeaderContainer = styled.section`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  font-size: 2rem;
  font-weight: 100;
  justify-content: space-between;
  padding: 2rem;
`;

export const Logout = styled.button`
  background-color: #e74c3c;
  border: 0;
  border-radius: 7px;
  color: white;
  letter-spacing: 0.1rem;
  margin: 1rem 1rem 0 1rem;
  padding: 0.5rem 1rem;
`;

export const SelectorContainer = styled.section`
  align-items: stretch;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
`;

export const CryptoOption = styled.div<{ isSelected?: boolean }>`
  ${({ isSelected }) => css`
    background-color: ${isSelected ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
    cursor: pointer;
    padding: 0.75rem 1.5rem;

    &:hover {
      background-color: ${isSelected ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.05) !important'};
      outline: 0;
    }
  `}
`;

export const SelectCrypto = styled.select`
  background-color: transparent;
  border: 0;
  padding: 0.75rem 1.5rem;
`;

export const RemoveCrypto = styled.sup`
  cursor: not-allowed;
  font-size: 0.5rem;
  margin-right: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const ProviderHistoryContainer = styled.section`
  align-items: stretch;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  padding: 1rem 0;
`;

export const ProviderCard = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #bdc3c7;
  border-radius: 7px;
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 2rem;
`;

export const LastUpdate = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

export const ProviderName = styled.h2`
  font-size: 1.3rem;
  font-weight: 100;
  margin: 1rem 0;
`;

export const ResultHistory = styled.div`
  align-items: stretch;
  display: flex;
  flex-flow: column nowrap;
  height: 150px;
  width: 250px;
`;

export const ResultHistoryRow = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 30px;
  justify-content: space-between;
  padding: 0 0.5rem;

  &:nth-of-type(2n) {
    background-color: #bdc3c755;
  }
`;

export const ResultHistoryDate = styled.div`
  font-size: 0.8rem;
`;

export const ResultHistoryPrice = styled.div`
  font-family: 'Courier New', Courier, monospace;
`;

export const ConverterContainer = styled.section`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  padding: 1rem 2rem;
`;

export const ConverterTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 100;
  margin-right: 2rem;
`;

export const ConverterInput = styled.input`
  border: 0;
  border-bottom: 1px solid black;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  margin-right: 2rem;
  text-align: right;
  width: 100px;
`;

export const ConverterResultContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin-right: 2rem;
`;

export const ConverterResultProvider = styled.span`
  font-weight: 100;
  margin-bottom: 0.5rem;
`;

export const ConverterResult = styled.span`
  font-family: 'Courier New', Courier, monospace;
`;
