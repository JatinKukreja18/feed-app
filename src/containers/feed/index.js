import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostCard from "../../components/post-card";
const pagedEndpoints = [
    'http://www.mocky.io/v2/59b3f0b0100000e30b236b7e',
    'http://www.mocky.io/v2/59ac28a9100000ce0bf9c236',
    'http://www.mocky.io/v2/59ac293b100000d60bf9c239',
]
const Feed = ()=>{

    const [allposts, setAllPosts] = useState([]);
    useEffect(()=>{
        axios.get(pagedEndpoints[0])
        .then(res => {
            const pageData = res.data;
            console.log(pageData);  
            setAllPosts(res.data.posts);
        })
    },[])
    return(
     <>
        <ul>
            {allposts && allposts.map((post,i) => {
                return(
                    <PostCard key={`post-${i}`} data={post} />
                )
            })}
        </ul>
     </>

    )
}

export default Feed;