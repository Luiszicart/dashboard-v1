import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransactions } from "../services/api/transaction";
import { TransactionsState } from "./types";

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
  dateRange: {
    startDate: null,
    endDate: null,
  },
  sortBy: {
    field: "date",
    direction: "desc",
  },
};

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { transactions: TransactionsState };
      const { currentPage, itemsPerPage, dateRange, sortBy } =
        state.transactions;
      const response = await fetchTransactions({
        page: currentPage,
        limit: itemsPerPage,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        sortBy,
      });
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch transactions");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setDateRange: (
      state,
      action: PayloadAction<{
        startDate: string | null;
        endDate: string | null;
      }>
    ) => {
      state.dateRange = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (
      state,
      action: PayloadAction<{
        field: "date" | "amount";
        direction: "asc" | "desc";
      }>
    ) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.transactions;
        state.totalCount = action.payload.total;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setDateRange, setSortBy } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
