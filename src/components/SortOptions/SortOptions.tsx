// src/components/SortOptions/SortOptions.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSortBy } from '../../store/ticketsSlice'; 
import { SortBy } from '../../types'; 
import styles from './SortOptions.module.css';

const SortOptions: React.FC = () => {
  const dispatch = useDispatch();
  const currentSortBy = useSelector((state: RootState) => state.tickets.sortBy);

  const handleSortChange = (sortType: SortBy) => {
    dispatch(setSortBy(sortType));
  };

  return (
    <div className={styles['sort-options']}>
      <button
        className={`${styles['sort-button']} ${currentSortBy === 'cheapest' ? styles.active : ''}`}
        onClick={() => handleSortChange('cheapest')}
      >
        Самый дешевый
      </button>
      <button
        className={`${styles['sort-button']} ${currentSortBy === 'fastest' ? styles.active : ''}`}
        onClick={() => handleSortChange('fastest')}
      >
        Самый быстрый
      </button>
      <button
        className={`${styles['sort-button']} ${currentSortBy === 'optimal' ? styles.active : ''}`}
        onClick={() => handleSortChange('optimal')}
      >
        Самый оптимальный
      </button>
    </div>
  );
};

export default SortOptions;