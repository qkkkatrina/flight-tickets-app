// src/types.ts

export interface Time {
  startTime: string;
  endTime: string;
}

export interface Ticket {
  id: number;
  from: string; 
  to: string;  
  company: string;
  price: number;
  currency: 'Р' | 'RUB' | 'USD' | 'EUR'; 
  time: Time;
  duration: number;
  date: string; 
  connectionAmount: number | null; 
}

// Типы для фильтров
export interface Filters {
  companies: string[]; 
  connections: (number | null)[]; 
}

// Типы для сортировки
export type SortBy = 'cheapest' | 'fastest' | 'optimal'; 
export type SortOrder = 'asc' | 'desc'; 