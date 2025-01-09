import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  getTransactions,
  setCurrentPage,
  setDateRange,
} from "../../../store/transactionSlice";
import DateRangePicker from "../../molecules/DateRangePicker/DateRangePicker";
import TransactionTable from "../../organisms/TransactionTable/TransactionTable";
import Button from "../../atoms/Button/Button";
import { mockTransactions } from "../../../services/api/transaction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DashboardContainer,
  Header,
  Title,
  FilterSection,
  ErrorMessage,
  Summary,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  Pagination,
  PageInfo,
} from "./Dashboard.styled";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dateError, setDateError] = useState<string | null>(null);
  const [localDateRange, setLocalDateRange] = useState({
    startDate: null as string | null,
    endDate: null as string | null,
  });
  const {
    loading,
    error,
    totalCount,
    currentPage,
    itemsPerPage,
    dateRange,
    sortBy,
  } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch, currentPage, dateRange, sortBy]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (
      dateRange.startDate &&
      new Date(transaction.date) < new Date(dateRange.startDate)
    ) {
      return false;
    }
    if (
      dateRange.endDate &&
      new Date(transaction.date) > new Date(dateRange.endDate)
    ) {
      return false;
    }
    return true;
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const handleDateRangeChange = (
    startDate: string | null,
    endDate: string | null
  ) => {
    setLocalDateRange({ startDate, endDate });

    // Only update Redux if we have both dates or neither date, and no error
    if ((!startDate && !endDate) || (startDate && endDate && !dateError)) {
      dispatch(setDateRange({ startDate, endDate }));
    }
  };

  const handleClearDateRange = () => {
    setDateError(null);
    setLocalDateRange({ startDate: null, endDate: null });
    dispatch(setDateRange({ startDate: null, endDate: null }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Payment Transactions</Title>
      </Header>

      <FilterSection>
        <DateRangePicker
          startDate={localDateRange.startDate || ""}
          endDate={localDateRange.endDate || ""}
          onStartDateChange={(date) =>
            handleDateRangeChange(date, localDateRange.endDate)
          }
          onEndDateChange={(date) =>
            handleDateRangeChange(localDateRange.startDate, date)
          }
          onClear={handleClearDateRange}
          onError={setDateError}
        />
      </FilterSection>

      {dateError && <ErrorMessage>{dateError}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Summary>
        <SummaryCard>
          <SummaryLabel>Total Transactions</SummaryLabel>
          <SummaryValue>{totalCount}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Total Amount</SummaryLabel>
          <SummaryValue>${totalAmount.toFixed(2)}</SummaryValue>
        </SummaryCard>
      </Summary>

      <TransactionTable />

      <Pagination>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </Button>
        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </Button>
      </Pagination>
    </DashboardContainer>
  );
};

export default Dashboard;
