import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  -webkit-overflow-scrolling: touch;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

export const Th = styled.th`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const SortButton = styled.button`
  background: none;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  height: 24px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & > span {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    font-size: inherit;
    font-family: inherit;
  }

  & > svg {
    display: inline-flex;
    vertical-align: middle;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
