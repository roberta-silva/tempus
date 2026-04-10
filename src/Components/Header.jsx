import React from 'react';
import { NavLink } from 'react-router';
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink to="/">Relógio</NavLink>
        <NavLink to="timer">Timer</NavLink>
        <NavLink to="cronometro">Cronômetro</NavLink>
      </nav>
    </header>
  );
};

export default Header;
