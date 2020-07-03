import React, { useState } from 'react';
import './App.css';
import Feed  from "./containers/feed";
import { Drawer } from 'antd';
import PostCard from './components/post-card';

function App() {

  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const openDrawer = (post) =>{
    console.log(post);
    setSelectedPost(post);
    setVisible(true)
  }
  return (
    <main className="container">
      <div className="banner">
          Event Feed
      </div>
      <Feed postSelected={(a)=>openDrawer(a)}/>
      <Drawer
          title={selectedPost.event_name}
          closable={false}
          onClose={()=>setVisible(false)}
          visible={visible}
          getContainer={false}
          className={'custom-drawer'}
          placement={'bottom'}
        >
          <PostCard data={selectedPost} isFeatured={true}/>
        </Drawer>
    </main>
  );
}

export default App;
