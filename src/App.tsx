// src/App.tsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store'; 
import { fetchTicketsThunk, selectAllTickets } from './store/ticketsSlice';
import Header from './components/Header/Header';
import FilterPanel from './components/FilterPanel/FilterPanel';
import SortOptions from './components/SortOptions/SortOptions';
import TicketCard from './components/TicketCard/TicketCard';
import './App.css';
import { Ticket } from './types';

const TICKETS_PER_LOAD = 3;

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const { loading: status, error, sortBy, filters } = useSelector((state: RootState) => state.tickets);
  const allTickets = useSelector(selectAllTickets);

  const [displayedTicketCount, setDisplayedTicketCount] = useState(TICKETS_PER_LOAD);

  useEffect(() => {
    setDisplayedTicketCount(TICKETS_PER_LOAD);
    dispatch(fetchTicketsThunk());
  }, [dispatch, sortBy, filters]);

  const filteredTickets = allTickets.filter((ticket: Ticket) => {
    const { companies, connections } = filters;

    const ticketConnectionAmount = ticket.connectionAmount === null ? 0 : ticket.connectionAmount;
    const matchesConnections = connections.length === 0 || connections.includes(ticketConnectionAmount);

    const matchesCompany = companies.length === 0 || companies.includes(ticket.company);

    return matchesConnections && matchesCompany;
  });

  const sortedTickets = [...filteredTickets].sort((a: Ticket, b: Ticket) => {
    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }
    if (sortBy === 'fastest') {
      return a.duration - b.duration;
    }
    if (sortBy === 'optimal') {
      const optimalScoreA = a.price + a.duration * 0.5;
      const optimalScoreB = b.price + b.duration * 0.5;
      return optimalScoreA - optimalScoreB;
    }
    return 0;
  });

  const ticketsToDisplay = sortedTickets.slice(0, displayedTicketCount);

  const handleLoadMore = () => {
    setDisplayedTicketCount(prevCount => prevCount + TICKETS_PER_LOAD);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-layout">
        <aside className="sidebar">
          <FilterPanel />
        </aside>
        <section className="content">
          <SortOptions />
          {status === true && <p className="loading-message">Загрузка билетов...</p>}
          {status === false && error && <p className="error-message">Ошибка: {error}</p>}
          {status === false && !error && ticketsToDisplay.length === 0 && (
            <p className="no-tickets-message">Билеты не найдены по вашим критериям.</p>
          )}
          <div className="tickets-list">
            {ticketsToDisplay.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
          {status === false && !error && sortedTickets.length > displayedTicketCount && (
            <button onClick={handleLoadMore} className="load-more-button">
              Загрузить еще билеты
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;