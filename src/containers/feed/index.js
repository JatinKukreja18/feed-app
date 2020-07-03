import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PostCard from "../../components/post-card";
import { Skeleton, Row, Col,Select,Pagination, Button} from 'antd';
import { BarsOutlined, AppstoreOutlined} from '@ant-design/icons';
import "./style.scss";
import { get, set } from 'idb-keyval';


const { Option } = Select;

let OriginalPostArr = [];
const pagedEndpoints = [
    'http://www.mocky.io/v2/59b3f0b0100000e30b236b7e',
    'http://www.mocky.io/v2/59ac28a9100000ce0bf9c236',
    'http://www.mocky.io/v2/59ac293b100000d60bf9c239',
]
const Feed = (props)=>{

    const [state,setState] = useState({
        isLoading: false,
        allposts : [],
        isGrid:false,
        currentPage:1
    })
    
    async function onChange(page){
        try{
            setState({...state,isLoading:true})
            document.scrollingElement.style.scrollBehavior = 'smooth';
            document.scrollingElement.scrollTop = 0;
            const response = await axios.get(pagedEndpoints[page - 1]);
            setState({...state, isLoading:false, allposts:response.data.posts,currentPage:page});
            OriginalPostArr = [...response.data.posts];
        }
        catch(err){
            setState({...state, isLoading:false, allposts:[]});
            console.log(err);
        }
    };
    const handleChange = (value)=> {
        const {allposts} = state;
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
                
                break;
            
            default:
                sortedPosts = [...OriginalPostArr];
                break;
        }
        
        setState({...state,allposts: [...sortedPosts]})
      }
    useEffect( ()=>{
        console.log('useeffect');
        
        async function getPosts(){
            try{
                console.log('try');
                const response = await axios.get(pagedEndpoints[0]);
                setState({...state,isLoading:false,allposts: response.data.posts});
                OriginalPostArr = [...response.data.posts];
                // set('posts', OriginalPostArr);
                
            }
            catch(err){
                
                setState({...state,isLoading:false});
                console.log(err);
                // const offlinePosts = get('posts');
                // console.log(offlinePosts);
                
            } 
        }
        getPosts();
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
        {/* {alert(state.isLoading)} */}
        <div className={`feed-options ${state.allposts.length === 0? 'disabled':null}`}>
            <div className="list-options">
                <a className={`${!state.isGrid&&'active'}`} onClick={()=>setState({...state,isGrid:false})}>
                    <BarsOutlined />
                </a>
                <a className={`${state.isGrid&&'active'}`} onClick={()=>setState({...state,isGrid:true})}>
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
        {!state.isLoading? 
        <>
            <div className={`post-list`}>
            
                {state.allposts.length? state.allposts.map((post,i) => {
                    return(
                            <PostCard postClick={() => props.postSelected(post)} key={`post-${i}`} data={post} isGrid={state.isGrid}/>
                        
                    )
                }): <div className="error-block">
                        <img src="/assets/blank.svg"/>
                        <p>Something seems to be not working!
                            <br/>
                            <span>
                            Try refreshing the page or check back later.
                            </span>
                        </p>
                        <Button type="primary" onClick={()=>window.location.reload()}>Refresh</Button>
                    </div>}

            </div>
            {state.allposts.length?
            <Pagination className="custom-pagination" current={state.currentPage} onChange={onChange} total={21} defaultPageSize={7} />
            :null}
        </>
        :
        <div style={{'width':'100%'}}>
            {skeleton}
        </div>}
     </>
    )
}

export default Feed;