import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostCard from "../../components/post-card";
import { Skeleton, Row, Col,Select,Pagination} from 'antd';
import { BarsOutlined, AppstoreOutlined, DownOutlined, UpOutlined} from '@ant-design/icons';
import "./style.scss";


const { Option } = Select;

let OriginalPostArr = [];
const pagedEndpoints = [
    'http://www.mocky.io/v2/59b3f0b0100000e30b236b7e',
    'http://www.mocky.io/v2/59ac28a9100000ce0bf9c236',
    'http://www.mocky.io/v2/59ac293b100000d60bf9c239',
]
const Feed = ()=>{

    const [allposts, setAllPosts] = useState([]);
    const [isGrid, setIsGrid] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    
    const onChange = page => {
        console.log(page);
        document.scrollingElement.style.scrollBehavior = 'smooth';
        document.scrollingElement.scrollTop = 0;
        axios.get(pagedEndpoints[page - 1])
        .then(res => {
            setAllPosts([]);
            const pageData = res.data;
            setAllPosts(res.data.posts);
            OriginalPostArr = [...res.data.posts];
            
        })
        setCurrentPage(page);
    };
    const handleChange = (value)=> {
        console.log(`selected ${value}`);
        let sortedPosts = [];
        switch (value) {
            case 'likesup':
                sortedPosts = allposts.sort((a, b) => (a.likes > b.likes) ? 1 : -1)
                break;
            case 'viewsup':
                sortedPosts = allposts.sort((a, b) => (a.views > b.views) ? 1 : -1)
                break;
            case 'likesdown':
                sortedPosts = allposts.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
                break;
            case 'viewsdown':
                sortedPosts = allposts.sort((a, b) => (a.views > b.views) ? -1 : 1)
                break;
            case 'sharesup':
                sortedPosts = allposts.sort((a, b) => (a.shares > b.shares) ? 1 : -1)
                break;
            case 'sharesdown':
                sortedPosts = allposts.sort((a, b) => (a.shares > b.shares) ? -1 : 1)
                break;
            case 'default':
                sortedPosts = OriginalPostArr;
                console.log(sortedPosts);
                
                break;
            
            default:
                sortedPosts = [...OriginalPostArr];
                break;
        }
        console.log(OriginalPostArr);
        console.log(sortedPosts);
        
        setAllPosts([...sortedPosts])
      }
    useEffect(()=>{
        axios.get(pagedEndpoints[0])
        .then(res => {
            const pageData = res.data;
            setAllPosts(res.data.posts);
            OriginalPostArr = [...res.data.posts];
            console.log(OriginalPostArr);  
        })
    },[])
    const skeleton = (<Row>
                        <Col xs={24} className="custom-skeleton">
                            <Skeleton active avatar paragraph={{ rows: 1 }} />
                        </Col>
                        <Col xs={24} className="custom-skeleton">
                            <Skeleton active  avatar paragraph={{ rows: 1 }} />
                        </Col>
                        <Col xs={24} className="custom-skeleton">
                            <Skeleton active  avatar paragraph={{ rows: 1 }} />
                        </Col>
                    </Row>)
    return(
     <>
        <div className="feed-options">
            <div className="list-options">
                <a className={`${!isGrid?'active':''}`} onClick={()=>setIsGrid(false)}>
                    <BarsOutlined />
                </a>
                <a className={`${isGrid?'active':''}`} onClick={()=>setIsGrid(true)}>
                    <AppstoreOutlined />
                </a>
            </div>
            <div className="sorting-options">
                <label>Sort By:</label>
                <Select defaultValue="default" style={{ width: 170 }} onChange={handleChange}>
                    <Option value="default">Default</Option>
                    <Option value="viewsup">Views (low to high)</Option>
                    <Option value="viewsdown">Views (high to low)</Option>
                    <Option value="likesup">Likes (low to high)</Option>
                    <Option value="likesdown">Likes (high to low)</Option>
                    <Option value="sharesup">Shares (low to high)</Option>
                    <Option value="sharesdown">Shares (high to low)</Option>
                </Select>   
            </div>
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
        {allposts.length?
        <Pagination className="custom-pagination" current={currentPage} onChange={onChange} total={21} defaultPageSiz={7} />
        :null}
     </>

    )
}

export default Feed;