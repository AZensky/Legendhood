import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import STOCKLIST from '../../util/stock_list.json';
import './SearchBar.css';


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if (searchTerm.length) {
            setShowMenu(true);
            setSearchResult(filterStocks(searchTerm));
            console.log('searchResult', searchResult)
        } else {
            setShowMenu(false);
            setSearchResult([]);
        }
    }, [searchTerm]);

    const filterStocks = (search) => {
        const st = [];
        for (let i = 0; i < STOCKLIST.length; i++) {
            let stock = STOCKLIST[i];
            let symbol = stock['Symbol'];
            let name = stock['Name'];
            if (symbol.toLowerCase().startsWith(search.toLowerCase()) ||
                name.toLowerCase().startsWith(search.toLowerCase())) {
                st.push(stock)
            }
            if (st.length >= 10) {
                return st;
            }
        }
        return st;
    };

    return (
        <div className='search-bar'>
            <div className="stock-search-form">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    className="stock-search"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {(showMenu && searchResult.length > 0) && (
                <div className='search-bar-drop-down'>
                    {searchResult.map((stock, index) => (
                        <Link key={index} to={`/stocks/${stock.Symbol}`} className='search-dropdown-item'>
                            <p className='search-dropdown-stock-symbol'>{stock.Symbol}</p>
                            <p className='search-dropdown-stock-name'>{stock.Name}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
