import './App.css';
import useSWR from 'swr';
import react, { useState, useEffect } from 'react';
import SearchResults from './Components/SearchResults'
import userContext, { UserContext } from './Context'

const fetcher = (...args) => fetch(...args).then(response => response.json())

function App() {
  const [searchBook, setSearchBook] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false)

  const {data, error} = useSWR(shouldSearch ? `https://openlibrary.org/search.json?q=${searchBook}` : null, fetcher)
  console.log(data)

  useEffect(()=>{
    setSearchBook((data) => {return data.replace(/ /g,'+')})
    setShouldSearch(false)
  },[searchBook])

  return (
    <div className="App">
      <UserContext.Provider value={{ data }}>
      <h1>Search For A Book</h1>
      <div>
        <input type="text" onChange={(event) => {setSearchBook(event.target.value)}} />
        <button onClick={()=>setShouldSearch(true)}>Search Book</button>
      </div>
      {data && <SearchResults />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
