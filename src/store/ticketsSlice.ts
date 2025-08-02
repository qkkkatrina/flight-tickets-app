// src/store/ticketsSlice.ts

import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Ticket, Filters, SortBy } from '../types';
import { fetchTickets } from '../api/mockApi';
import { RootState } from './index'; 

const ticketsAdapter = createEntityAdapter<Ticket>({});

interface TicketsState extends ReturnType<typeof ticketsAdapter.getInitialState> {
  loading: boolean;
  error: string | null;
  filters: Filters;
  sortBy: SortBy;
}

const initialState: TicketsState = ticketsAdapter.getInitialState({
  loading: false,
  error: null,
  filters: {
    companies: [],
    connections: [],
  },
  sortBy: 'cheapest',
});

export const fetchTicketsThunk = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTickets();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Не удалось загрузить билеты. Попробуйте позже.');
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setCompanyFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.companies = action.payload;
    },
    setConnectionFilter: (state, action: PayloadAction<(number | null)[]>) => {
      state.filters.connections = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    resetFiltersAndSort: (state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketsThunk.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.loading = false;
        ticketsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTicketsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Failed to fetch tickets';
      });
  },
});

export const { setCompanyFilter, setConnectionFilter, setSortBy, resetFiltersAndSort } = ticketsSlice.actions;

export const {
  selectAll: selectAllTickets,
  selectById: selectTicketById,
} = ticketsAdapter.getSelectors((state: RootState) => state.tickets);


export const selectFilteredAndSortedTickets = (state: RootState) => {
  const { filters, sortBy } = state.tickets;
  const allTickets = selectAllTickets(state);

  let filteredTickets = allTickets;

  if (filters.companies.length > 0) {
    filteredTickets = filteredTickets.filter(ticket =>
      filters.companies.includes(ticket.company)
    );
  }

  if (filters.connections.length > 0) {
    filteredTickets = filteredTickets.filter(ticket => {
        const ticketConnection = ticket.connectionAmount === null ? 0 : ticket.connectionAmount;
        return filters.connections.includes(ticketConnection);
    });
  }

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    let compareValue = 0;

    if (sortBy === 'cheapest') {
      compareValue = a.price - b.price;
    } else if (sortBy === 'fastest') {
      compareValue = a.duration - b.duration;
    } else if (sortBy === 'optimal') {
      const optimalScoreA = a.price + a.duration * 0.5;
      const optimalScoreB = b.price + b.duration * 0.5;
      compareValue = optimalScoreA - optimalScoreB;
    }

    return compareValue;
  });

  return sortedTickets;
};

export default ticketsSlice.reducer;