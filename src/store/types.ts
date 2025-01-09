export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  sortBy: {
    field: "date" | "amount";
    direction: "asc" | "desc";
  };
}
