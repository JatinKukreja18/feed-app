import React, { useState } from 'react';
import './App.css';
import Feed  from "./containers/feed";
import { Drawer } from 'antd';

function App() {

  const [visible, setVisible] = useState(false);

  return (
    <main className="container">
      <div className="banner">
          Event Feed
      </div>
      <Feed/>
      <Drawer
          title="Basic Drawer"
          closable={false}
          onClose={()=>setVisible(false)}
          visible={visible}
          getContainer={false}
          className={'custom-drawer'}
          placement={'bottom'}
        >
          <p>Some contents...</p>
        </Drawer>
    </main>
  );
}

export default App;
