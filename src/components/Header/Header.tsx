// src/components/Header/Header.tsx

import React from 'react';
import styles from './Header.module.css';
import airplaneIcon from '../../assets/images/airplane-icon.png'; 

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={airplaneIcon} alt="Иконка самолета" className={styles['header-icon']} />
      <h1 className={styles['header-title']}>Поиск авиабилетов</h1>
    </header>
  );
};

export default Header;