import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Feed  from "./containers/feed";
import { Drawer, Button } from 'antd';

function App() {

  const [visible, setVisible] = useState(false);

  return (
    <main className="container">
      <Feed/>
      <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={()=>setVisible(false)}
          visible={visible}
          getContainer={false}
          className={'custom-drawer'}
          // style={{ position: 'absolute' }}
          placement={'bottom'}
        >
          <p>Some contents...</p>
        </Drawer>
    </main>
  );
}

export default App;
