import React from 'react';
import "./style.scss";
import { MonthsShortened } from '../../shared/monthArray';
import { EyeOutlined, LikeOutlined, ShareAltOutlined} from '@ant-design/icons';
import { Space, Button } from 'antd';

const PostCard = props =>{
    const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };
    let formattedDate = '';
    if (props.data.event_date) {
        const date = new Date(props.data.event_date);   
        formattedDate = date.getDate() +
        nth(date.getDate()) +
        ' ' +
        MonthsShortened[date.getMonth()] +
        "'" +
        date
            .getFullYear()
            .toString()
            .substr(-2);
    }
    return(
     <div className={`feed-post ${props.isGrid ? 'is-grid': ''} ${props.isFeatured ? 'is-featured': ''}`} onClick={props.postClick}>
         <div className="fp-image">
            <img src={props.data.thumbnail_image} />
         </div>
         <div className="fp-content">
             {
                 !props.isFeatured ?
                 <h3 className="fp-title">{props.data.event_name}</h3>
                 : null
             }
            
            <span className="fp-date">{formattedDate}</span>
            <ul className="count-info">
                <li className="views"><EyeOutlined /><span>{props.data.views}</span></li>
                <li className="likes"><LikeOutlined /><span>{props.data.likes}</span></li>
                <li className="shares"><ShareAltOutlined /><span>{props.data.shares}</span></li>
            </ul>
         </div>
         {
                 props.isFeatured ?
         <div className="fp-actions">
            <Space>
                <Button type="default" icon={<LikeOutlined />} size={'large'}>
                    Like
                </Button>
                <Button type="default" icon={<ShareAltOutlined />} size={'large'}>
                    Share
                </Button>
            </Space>
         </div>
         :null}
     </div>

    )
}

export default PostCard;