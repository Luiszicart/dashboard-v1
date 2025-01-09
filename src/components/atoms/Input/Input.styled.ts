import styled from "styled-components";

export const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  width: 100%;
  height: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &[type="date"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;
