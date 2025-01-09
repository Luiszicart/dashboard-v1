import styled from "styled-components";

export const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: stretch;
  width: 100%;
  max-width: 600px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

export const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
`;
