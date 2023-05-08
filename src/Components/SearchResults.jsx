import React, { useContext, useState } from "react";
import {UserContext} from '../Context';
import '../App.css'

export default function SearchResults(){
    const {data, isLoading, limit, setLimit} = useContext(UserContext);
    
    return <div className="flex flex-col place-items-center">
        {isLoading ? <div className='text-3xl font-bold'>Loading...</div> : data && <div className="w-1/3">{data.docs.map((books,key) =>{
            if(key < limit){
                return <div key={key} className="shadow-lg hover:shadow-xl w-full bg-white my-4 py-4 rounded-lg px-2 flex flex-col place-items-center">
                    <img src={`https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`} className="w-1/3 mt-2 mb-3" alt={books.title} />
                    <h2 className="text-xl mb-1 font-semibold">{books.title}</h2>
                    <h3 className="text-lg">By {books.author_name}</h3>
                </div>
            }
        })}
        <button className="bg-gray-800 text-white py-1 shadow-lg hover:shadow-xl px-2 rounded-md mt-1 mb-3" onClick={()=>{setLimit(limit=>limit+5)}}>Load More</button></div>}
    </div>
}