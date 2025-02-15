import './Tabl.css';
import unwrap from '../../png/fullScreen_on_dark.png'
import unwrap2 from '../../png/9025161_arrows_in_icon.png'
import arrow_up from '../../png/arrow_up.png'
import arrow_down from '../../png/arrow_down.png'
import React, { useState, useEffect } from 'react';

let value = [
    {
        num: 1,
        date: '12.02.2021',
        user: 'Комаров',
        tel: '89123456789',
        card: '1234 5678 9012 3456',
        user_end: 'Komarov',
        bank: 'Sberbank',
        summ_many: 50255,
        met: 'метка',
        status: '',
        doc: 'Документ'
    },
    {
        num: 2,
        date: '13.02.2020',
        user: 'Петров',
        tel: '89123456789',
        card: '1234 5678 9012 3456',
        user_end: 'Komarov',
        bank: 'Sberbank',
        summ_many: 64990,
        met: '',
        status: '',
        doc: 'Документ'
    },
    {
        num: 3,
        date: '14.02.2021',
        user: 'Антонов',
        tel: '89123456789',
        card: '1234 5678 9012 3456',
        user_end: 'Komarov',
        bank: 'ТБанк (Тенькофф)',
        summ_many: 50,
        met: 'метка',
        status: '',
        doc: 'Документ'
    },
    {
        num: 4,
        date: '15.02.2021',
        user: 'Егоров',
        tel: '89123456789',
        card: '1234 5678 9012 3456',
        user_end: 'Komarov',
        bank: 'Sber',
        summ_many: 3500,
        met: '',
        status: '',
        doc: 'Документ'
    },
    {
        num: 5,
        date: '12.04.2023',
        user: 'Дездемонов',
        tel: '89123456789',
        card: '1234 5678 9012 3456',
        user_end: 'Komarov',
        bank: 'Sber',
        summ_many: 90099,
        met: '',
        status: '',
        doc: 'Документ'
    }
]

export default function Tabl() {
    const formatDate = (dateString) => {
        const parts = dateString.split('.');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };
    const [indexUnwrap, setIndexUnwrap] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByDate, setSortDate] = useState(null);
    const [sortBySum, setSortSum] = useState(null);
    const [sortedData, setSortedData] = useState(value);

    const unwrapped = () => {
        if (indexUnwrap === false) {
            setIndexUnwrap(true);
        } else {
            setIndexUnwrap(false);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const dateSorting = () => {
        if (sortByDate === null || sortByDate === 2) {
            setSortDate(1);
        } else {
            setSortDate(2);
        }
    };

    const sumSorting = () => {
        if (sortBySum === null || sortBySum === 2) {
            setSortSum(1);
        } else {
            setSortSum(2);
        }
    };

    useEffect(() => {
        let sortedItems = [...value];

        if (searchTerm !== '') {
            sortedItems = sortedItems.filter(item => {
                return Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                );
            });
        }

        if (sortByDate !== null) {
            sortedItems.sort((a, b) => {
                const dateA = new Date(formatDate(a.date));
                const dateB = new Date(formatDate(b.date));
                if (sortByDate === 2) {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            });
        }

        setSortedData(sortedItems);
    }, [searchTerm, sortByDate]);

    useEffect(() => {
        let sortedItems = [...value];

        if (searchTerm !== '') {
            sortedItems = sortedItems.filter(item => {
                return Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                );
            });
        }

        if (sortBySum !== null) {
            sortedItems.sort((a, b) => {
                if (sortBySum === 2) {
                    return a.summ_many - b.summ_many;
                } else {
                    return b.summ_many - a.summ_many;
                }
            });
        }

        setSortedData(sortedItems);
    }, [searchTerm, sortBySum]);

    const sumValues = () => {
        let sum = 0;
        sortedData.forEach(item => {
            sum += item.summ_many;
        });
        return sum;
    }

    return (
        <div className='tabl_box' style={indexUnwrap === true ? { 'height': '99%', 'width': '100%', 'top': '0%', 'left': '0%' } : { 'height': '40%', 'width': '80%', 'top': '35%', 'left': '10%' }}>
            <div className='hade_title'>
                <input className='poisk' type="text" placeholder="Поиск" value={searchTerm} onChange={handleSearchChange} />

                <div className='summ'>
                    <p className='text_summ'>Общая сумма:</p>
                    <p className='text_summ'>50255 $</p>
                </div>
                <div className='summ'>
                    <p className='text_summ'>Сумма страницы:</p>
                    <p className='text_summ'>{sumValues() + " $"}</p>
                </div>
                <div className='button_box'></div>
                <div className='button_box' onClick={unwrapped}>
                    <img className='unwrap' src={indexUnwrap === true ? unwrap2 : unwrap} alt="" />
                </div>
            </div>
            <div className='tab_content'>
                <div className='title'>
                    <p className='text_title num'>#</p>
                    <p className='text_title date' onClick={dateSorting}>Дата</p>
                    <img className='arrow_date' src={sortByDate === 1 ? arrow_up : arrow_down} alt="" />
                    <p className='text_title user'>Пользователь</p>
                    <p className='text_title tel'>Телефон</p>
                    <p className='text_title card'>Карта</p>
                    <p className='text_title user_end'>Получатель</p>
                    <p className='text_title bank'>Банк</p>
                    <p className='text_title summ_many' onClick={sumSorting}>Сумма</p>
                    <img className='arrow_summ' src={sortBySum === 1 ? arrow_up : arrow_down} alt="" />
                    <p className='text_title met'>Метка</p>
                    <p className='text_title status'>Статус</p>
                    <p className='text_title doc'>Документ</p>
                </div>
                {sortedData.map((item, index) => (
                    <div className='content' key={index}>
                        <p className='text_content num'>{item.num}</p>
                        <p className='text_content date'>{item.date}</p>
                        <p className='text_content user'>{item.user}</p>
                        <p className='text_content tel'>{item.tel}</p>
                        <p className='text_content card'>{item.card}</p>
                        <p className='text_content user_end'>{item.user_end}</p>
                        <p className='text_content bank'>{item.bank}</p>
                        <p className='text_content summ_many'>{item.summ_many + " $"}</p>
                        <p className='text_content met'>{item.met}</p>
                        <p className='text_content status'>{item.status}</p>
                        <p className='text_content doc'>{item.doc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}