import React, { useContext } from "react";
import {UserContext} from '../Context';

export default function SearchResults(){
    const {data} = useContext(UserContext);
    
    return <div>
        {data.docs.map((books,key) =>{
            return <div key={key}>
                <h2>{books.title}</h2>
                <h3>By {books.author_name}</h3>
            </div>
        })}
    </div>
}