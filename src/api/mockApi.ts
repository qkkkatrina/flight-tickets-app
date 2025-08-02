// src/api/mockApi.ts

import { Ticket } from '../types';

const mockTickets: Ticket[] = [
    {
        id: 1,
        from: 'SVO', // Москва, Шереметьево
        to: 'LED', // Санкт-Петербург, Пулково
        company: 'Победа',
        price: 12680,
        currency: 'Р',
        time: { startTime: '12:00', endTime: '16:30' },
        duration: 270, // 4 часа 30 минут
        date: '2025-08-15',
        connectionAmount: 1, // 1 пересадка
    },
    {
        id: 2,
        from: 'SVO',
        to: 'LED',
        company: 'Red Wings',
        price: 21500,
        currency: 'Р',
        time: { startTime: '14:00', endTime: '16:00' },
        duration: 120, // 2 часа 0 минут (прямой)
        date: '2025-08-16',
        connectionAmount: 0, // Без пересадок (прямой)
    },
    {
        id: 3,
        from: 'SVO',
        to: 'LED',
        company: 'S7 Airlines',
        price: 23995,
        currency: 'Р',
        time: { startTime: '04:50', endTime: '13:30' },
        duration: 520, // 8 часов 40 минут
        date: '2025-08-15',
        connectionAmount: 2, // 2 пересадки
    },
    {
        id: 4,
        from: 'LED',
        to: 'SVO',
        company: 'Победа',
        price: 9800,
        currency: 'Р',
        time: { startTime: '09:00', endTime: '11:00' },
        duration: 120, // 2 часа 0 минут (прямой)
        date: '2025-08-17',
        connectionAmount: 0,
    },
    {
        id: 5,
        from: 'SVO',
        to: 'LED',
        company: 'Red Wings',
        price: 18000,
        currency: 'Р',
        time: { startTime: '10:00', endTime: '13:30' },
        duration: 210, // 3 часа 30 минут
        date: '2025-08-18',
        connectionAmount: 1,
    },
    {
        id: 6,
        from: 'LED',
        to: 'SVO',
        company: 'S7 Airlines',
        price: 15500,
        currency: 'Р',
        time: { startTime: '17:00', endTime: '20:30' },
        duration: 210, // 3 часа 30 минут
        date: '2025-08-19',
        connectionAmount: 0,
    },
    {
        id: 7,
        from: 'SVO',
        to: 'LED',
        company: 'Победа',
        price: 10500,
        currency: 'Р',
        time: { startTime: '08:00', endTime: '11:00' },
        duration: 180, // 3 часа 0 минут
        date: '2025-08-20',
        connectionAmount: 0,
    },
    {
        id: 8,
        from: 'SVO',
        to: 'LED',
        company: 'Red Wings',
        price: 19500,
        currency: 'Р',
        time: { startTime: '19:00', endTime: '23:30' },
        duration: 270, // 4 часа 30 минут
        date: '2025-08-21',
        connectionAmount: 3, // 3 пересадки
    },
    {
        id: 9,
        from: 'LED',
        to: 'SVO',
        company: 'S7 Airlines',
        price: 14000,
        currency: 'Р',
        time: { startTime: '06:00', endTime: '09:00' },
        duration: 180, // 3 часа 0 минут
        date: '2025-08-22',
        connectionAmount: 1,
    },
];

export const fetchTickets = async (): Promise<Ticket[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTickets);
        }, 800); 
    });
};