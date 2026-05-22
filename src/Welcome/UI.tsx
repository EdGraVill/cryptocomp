import styled, { css } from 'styled-components';

export const Container = styled.main`
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid #bdc3c755;
  border-radius: 7px;
  display: flex;
  flex-flow: column nowrap;
  padding: 2rem;
  max-width: 414px;
  width: 95%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 100;
  margin: 0 0 2rem 0;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: 100;
  margin: 0 0 0.5rem 0.5rem;
  width: 100%;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Label = styled.label<{ sub?: boolean }>`
  ${({ sub = false }) => css`
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
    font-size: ${sub ? '0.8rem' : '1rem'};
    font-weight: 100;
    margin: 0 0.5rem 1rem 0.5rem;
  `}
`;

export const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.6);
  border: 0;
  border-bottom: 1px solid #bdc3c7;
  padding: 0.3rem 0;

  &:focus,
  &:active {
    border-bottom: 1px solid #3498db;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #3498db;
  border: 0;
  border-radius: 7px;
  color: white;
  letter-spacing: 0.1rem;
  margin: 1rem 1rem 0 1rem;
  padding: 0.5rem 1rem;
`;
