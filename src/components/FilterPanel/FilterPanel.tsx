// src/components/FilterPanel/FilterPanel.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setCompanyFilter,
  setConnectionFilter,
  resetFiltersAndSort, // Обновленное название
} from '../../store/ticketsSlice';
import styles from './FilterPanel.module.css';

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.tickets); // Получаем объект filters

  // Обновленный список авиакомпаний
  const availableCompanies = ['Победа', 'Red Wings', 'S7 Airlines'];
  // Обновленный список пересадок
  const availableConnections = [
    { label: 'Без пересадок', value: 0 }, // Изменено на "Без пересадок"
    { label: '1 пересадка', value: 1 },
    { label: '2 пересадки', value: 2 },
    { label: '3 пересадки', value: 3 },
  ];

  const handleCompanyChange = (company: string) => {
    const currentCompanies = filters.companies;
    let newCompanies: string[];
    if (currentCompanies.includes(company)) {
      newCompanies = currentCompanies.filter(c => c !== company);
    } else {
      newCompanies = [...currentCompanies, company];
    }
    dispatch(setCompanyFilter(newCompanies));
  };

  const handleConnectionChange = (connection: number | null) => {
    const currentConnections = filters.connections;
    let newConnections: (number | null)[];
    // Здесь мы должны обрабатывать null и 0 как один и тот же тип "без пересадок",
    // если в mockApi у вас могут быть и null, и 0 для прямых рейсов.
    const normalizedConnection = connection === null ? 0 : connection;

    if (currentConnections.includes(normalizedConnection)) {
        newConnections = currentConnections.filter(c => c !== normalizedConnection);
    } else {
        newConnections = [...currentConnections, normalizedConnection];
    }
    dispatch(setConnectionFilter(newConnections));
  };

  const handleReset = () => {
    dispatch(resetFiltersAndSort());
  };

  return (
    <div className={styles['filter-panel']}>
      <h3>Компании</h3>

      <div className={styles['filter-section']}>
       
        {availableCompanies.map((company) => (
          <div key={company} className={styles['checkbox-item']}>
            <input
              type="checkbox"
              id={`company-${company}`}
              checked={filters.companies.includes(company)}
              onChange={() => handleCompanyChange(company)}
            />
            <label htmlFor={`company-${company}`}>{company}</label>
          </div>
        ))}
      </div>

      <div className={styles['filter-section']}>
        <h4>Количество пересадок</h4>
        {availableConnections.map((conn) => (
          <div key={conn.label} className={styles['checkbox-item']}>
            <input
              type="checkbox"
              id={`connection-${conn.value}`}
              checked={filters.connections.includes(conn.value)}
              onChange={() => handleConnectionChange(conn.value)}
            />
            <label htmlFor={`connection-${conn.value}`}>{conn.label}</label>
          </div>
        ))}
      </div>

      <button className={styles['reset-button']} onClick={handleReset}>
        Сбросить фильтры и сортировку
      </button>
    </div>
  );
};

export default FilterPanel;