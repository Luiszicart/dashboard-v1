import { Transaction } from "../../store/types";

// Generate mock data with varied dates
const generateMockTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, (_, index) => {
    const today = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(today.getFullYear() - 2);

    const randomTimestamp =
      twoYearsAgo.getTime() +
      Math.random() * (today.getTime() - twoYearsAgo.getTime());
    const randomDate = new Date(randomTimestamp);

    return {
      id: `TRX${String(index + 1).padStart(6, "0")}`,
      date: randomDate.toISOString(),
      description: `Payment ${index + 1}`,
      amount: Math.round(Math.random() * 1000000) / 100,
    };
  });
};

export const mockTransactions = generateMockTransactions(100);

interface FetchTransactionsParams {
  page: number;
  limit: number;
  startDate: string | null;
  endDate: string | null;
  sortBy: {
    field: "date" | "amount";
    direction: "asc" | "desc";
  };
}

export const fetchTransactions = async ({
  page,
  limit,
  startDate,
  endDate,
  sortBy,
}: FetchTransactionsParams): Promise<{
  transactions: Transaction[];
  total: number;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filter by date range
  let filteredTransactions = [...mockTransactions];
  if (startDate) {
    filteredTransactions = filteredTransactions.filter(
      (t) => new Date(t.date) >= new Date(startDate)
    );
  }
  if (endDate) {
    filteredTransactions = filteredTransactions.filter(
      (t) => new Date(t.date) <= new Date(endDate)
    );
  }

  // Sort transactions
  filteredTransactions.sort((a, b) => {
    const multiplier = sortBy.direction === "asc" ? 1 : -1;
    if (sortBy.field === "date") {
      return (
        multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    }
    return multiplier * (a.amount - b.amount);
  });

  // Paginate
  const start = (page - 1) * limit;
  const paginatedTransactions = filteredTransactions.slice(
    start,
    start + limit
  );

  return {
    transactions: paginatedTransactions,
    total: filteredTransactions.length,
  };
};
