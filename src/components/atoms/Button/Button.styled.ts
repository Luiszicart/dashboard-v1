import styled from "styled-components";

export const StyledButton = styled.button`
  padding: ${({ theme }) => `0 ${theme.spacing.md}`};
  height: 2.5rem;
  min-width: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: 500;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
    padding: ${({ theme }) => `0 ${theme.spacing.sm}`};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    margin: 0 auto;
  }
`;
