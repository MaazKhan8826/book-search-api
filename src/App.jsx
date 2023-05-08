import './App.css';
import useSWR from 'swr';
import react, { useState, useEffect } from 'react';
import SearchResults from './Components/SearchResults'
import userContext, { UserContext } from './Context'

const fetcher = (...args) => fetch(...args).then(response => response.json())

function App() {
  const [searchBook, setSearchBook] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);
  const [limit, setLimit] = useState(5);

  const {data, isLoading} = useSWR(shouldSearch ? `https://openlibrary.org/search.json?q=${searchBook}` : null, fetcher)
  {data && console.log(data.docs)}

  useEffect(()=>{
    setSearchBook((data) => {return data.replace(/ /g,'+')})
    setShouldSearch(false)
    setLimit(5)
  },[searchBook])

  return (
    <div className="App w-full min-h-screen h-fit bg-teal-400">
      <UserContext.Provider value={{ data, isLoading, limit, setLimit }}>
      <h1 className='text-4xl font-bold'>Search For A Book</h1>
      <form className='my-2' onSubmit={(event)=>{setShouldSearch(true); event.preventDefault();}}>
        <input className='p-1 pl-3 rounded-md text-lg shadow-lg' type="text" onChange={(event) => {setSearchBook(event.target.value)}} />
        <button className='bg-gray-800 text-white p-1 rounded-md ml-2 px-2 shadow-lg hover:shadow-xl'>Search Book</button>
      </form>
      <SearchResults />
      </UserContext.Provider>
    </div>
  );
}

export default App;
