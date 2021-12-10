import React, { ReactElement, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getPostsPerPage } from '../../../services/api/urls';
import postsStore from '../../../services/stores/postsStore';

import './style.css';

interface FilterSideBarProps {
    onFilterSubmit: (userId: number | undefined) => void;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({ onFilterSubmit }): ReactElement => {
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        setSearchValue(sessionStorage.getItem('filterValue') || '')
    }, [])

    const handleChange = (inputValue: string): void => {
        setSearchValue(inputValue)
    }

    const handleSubmit = (): void => {
        if (searchValue) {
            sessionStorage.setItem('filterValue', searchValue.toString());
            onFilterSubmit(parseInt(searchValue))
            return
        }

        alert('Введите ID пользователя')
    }

    const resetFilter = (): void => {
        sessionStorage.removeItem('filterValue');
        setSearchValue('')
        postsStore.setCurrentSourceUrl(getPostsPerPage(1))
    }

    return (
        <div className="filter-sidebar">
            <TextField
                label="ID пользователя"
                type="text"
                InputLabelProps={{
                    shrink: true,
                  }}
                value={searchValue}
                onChange={(e) => handleChange(e.target.value)}
            />
            <br/>
            <Button variant="contained" onClick={handleSubmit}>Применить фильтр</Button>
            <br />
            { (searchValue) &&
                <Button variant="contained" onClick={resetFilter} color="error">Сбросить фильтр</Button>
            }
        </div>
    )
}

export default FilterSideBar
