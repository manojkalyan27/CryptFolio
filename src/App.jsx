import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [value,setValue] = useState('');
  const [filteredData, setFilteredData] = useState([]); 
    const getData = () => {
      fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setFilteredData(result);
    })
    };

    useEffect(() => {
      getData();
    }, []);

    const handleSearch = (e) => {
      const searchValue = e.target.value.toLowerCase();
    setValue(searchValue);
    
    const filtered = data.filter((item) => 
      item.name.toLowerCase().includes(searchValue) || 
      item.symbol.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
    }

    const sortbyMktCap = () => {
      const sortedData = [...filteredData.sort((a,b) => b.market_cap - a.market_cap)];
      setFilteredData(sortedData);
    }

    const sortbyPercentage = () => {
      const sortedData = [...filteredData.sort((a,b) => b.ath_change_percentage - a.ath_change_percentage)];

      setFilteredData(sortedData); // sorting data
    }


  return (
    <>
        <div>
            <input
            type="text"
            value={value}
            onChange={handleSearch} 
             className='search' placeholder='Search By Name or Symbol'/>
            <button onClick={sortbyMktCap} className='sort'>Sort By Mkt Cap</button>
            <button onClick={sortbyPercentage} className='sort'>Sort by percentage</button>
        </div>

        <div className='totaldata'>
            { filteredData.map((item,key) => {
              return <div className='data'>
                  <div className='apiData'>
                    <img className='image' src={item.image} alt="name" key={key}/>
                    <p className='symbol'>{item.name}</p>
                    <p className='symbol'>{item.symbol}</p>
                    <p>{(item.current_price).toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                                      })}</p>
                    <p>{(item.market_cap).toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                                      })}</p>
                    <p style={{ color: item.ath_change_percentage > 0? "green" : "red"}}>{(item.ath_change_percentage).toFixed() + "%"}</p>
                    <p>Mkt Cap: {(item.total_volume).toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                                      })}</p>
                 </div>

                 <div class="line-1"></div>
              </div>
            })}
        </div>
    </>
  )
}

export default App
