import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  Th,
  Td,
  SortButton,
} from "./TransactionTables.styled";
import { SortIconProps } from "./TransactionTable.types";
import { RootState } from "../../../store/store";
import { setSortBy } from "../../../store/transactionSlice";
import { ChevronUp, ChevronDown } from "lucide-react";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const { items, sortBy } = useSelector(
    (state: RootState) => state.transactions
  );

  const handleSort = (field: "date" | "amount") => {
    const direction =
      sortBy.field === field
        ? sortBy.direction === "asc"
          ? "desc"
          : "asc"
        : "asc";
    dispatch(setSortBy({ field, direction }));
  };

  const SortIcon = ({ field }: SortIconProps) => {
    if (sortBy.field !== field) return null;
    return sortBy.direction === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Transaction ID</Th>
            <Th>
              <SortButton onClick={() => handleSort("date")}>
                Date <SortIcon field="date" />
              </SortButton>
            </Th>
            <Th>Description</Th>
            <Th>
              <SortButton onClick={() => handleSort("amount")}>
                Amount <SortIcon field="amount" />
              </SortButton>
            </Th>
          </tr>
        </thead>
        <tbody>
          {items.map((transaction) => (
            <tr key={transaction.id}>
              <Td>{transaction.id}</Td>
              <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
              <Td>{transaction.description}</Td>
              <Td>${transaction.amount.toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
