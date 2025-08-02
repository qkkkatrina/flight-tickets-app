// src/components/TicketCard/TicketCard.tsx

import React from 'react';
import { Ticket } from '../../types';
import styles from './TicketCard.module.css';

const companyLogos: { [key: string]: string } = {
    'Победа': new URL('../../assets/images/pobeda-logo.png', import.meta.url).href,
    'Red Wings': new URL('../../assets/images/red-wings-logo.png', import.meta.url).href,
    'S7 Airlines': new URL('../../assets/images/s7-airlines-logo.png', import.meta.url).href,
};

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const getConnectionText = (amount: number | null): string => {
    if (amount === 0 || amount === null) {
      return 'Без пересадок';
    }
    if (amount === 1) {
      return '1 пересадка';
    }
    if (amount === 2) {
      return '2 пересадки';
    }
    if (amount === 3) {
        return '3 пересадки';
    }
    return `${amount} пересадок`; 
  };

  const logoSrc = companyLogos[ticket.company];

  return (
    <div className={styles['ticket-card']}>
      <div className={styles['ticket-header']}>
        <span className={styles['ticket-price']}>{ticket.price} {ticket.currency}</span>
        {logoSrc && <img src={logoSrc} alt={`${ticket.company} logo`} className={styles['company-logo']} />}
      </div>
      <div className={styles['ticket-details']}>
        {/* Колонка 1: SVO - LED / Время отправления - Время прибытия */}
        <div className={styles['detail-column']}>
          <div className={styles['detail-label']}>{ticket.from} - {ticket.to}</div>
          <div className={styles['detail-value']}>{ticket.time.startTime} - {ticket.time.endTime}</div>
        </div>
        {/* Колонка 2: В пути */}
        <div className={styles['detail-column']}>
          <div className={styles['detail-label']}>В пути</div>
          <div className={styles['detail-value']}>{Math.floor(ticket.duration / 60)}ч {ticket.duration % 60}м</div>
        </div>
        {/* Колонка 3: Пересадки */}
        <div className={styles['detail-column']}>
          <div className={styles['detail-label']}>Пересадки</div>
          <div className={styles['detail-value']}>
            {getConnectionText(ticket.connectionAmount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;