import React from 'react';
import "./style.scss";

const PostCard = props =>{

    return(
     <div className="feed-post">
        <h1>{props.data.event_name}</h1>
        <img src={props.data.thumbnail_image} />
        
        <span>{props.data.event_date}</span>
        <ul>
            <li><span>{props.data.views}</span></li>
            <li><span>{props.data.likes}</span></li>
            <li><span>{props.data.shares}</span></li>
        </ul>
     </div>

    )
}

export default PostCard;