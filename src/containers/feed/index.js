import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostCard from "../../components/post-card";
import { Skeleton, Row, Col} from 'antd';
import "./style.scss";
import { BarsOutlined, AppstoreOutlined} from '@ant-design/icons';

const pagedEndpoints = [
    'http://www.mocky.io/v2/59b3f0b0100000e30b236b7e',
    'http://www.mocky.io/v2/59ac28a9100000ce0bf9c236',
    'http://www.mocky.io/v2/59ac293b100000d60bf9c239',
]
const Feed = ()=>{

    const [allposts, setAllPosts] = useState([]);
    const [isGrid, setIsGrid] = useState(false);
    useEffect(()=>{
        axios.get(pagedEndpoints[0])
        .then(res => {
            const pageData = res.data;
            console.log(pageData);  
            setAllPosts(res.data.posts);
        })
    },[])
    const skeleton = (<Row gutter={[20,20]}>
                        <Col xs={24}>
                            <Skeleton avatar paragraph={{ rows: 1 }} />
                        </Col>
                        <Col xs={24}>
                            <Skeleton avatar paragraph={{ rows: 1 }} />
                        </Col>
                        <Col xs={24}>
                            <Skeleton avatar paragraph={{ rows: 1 }} />
                        </Col>
                    </Row>)
    return(
     <>
        <div className="list-options">
            <a className={`${!isGrid?'active':''}`} onClick={()=>setIsGrid(false)}>
                <BarsOutlined />
            </a>
            <a className={`${isGrid?'active':''}`} onClick={()=>setIsGrid(true)}>
                <AppstoreOutlined />
            </a>
        </div>
        <div className={`post-list`}>
           
            {allposts.length? allposts.map((post,i) => {
                return(
                        <PostCard key={`post-${i}`} data={post} isGrid={isGrid}/>
                    
                )
            }):
            <div style={{'width':'100%'}}>
                {skeleton}
            </div>
            }
        </div>
     </>

    )
}

export default Feed;