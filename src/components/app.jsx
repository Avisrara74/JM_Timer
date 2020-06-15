import React from 'react';
import { Tabs } from 'antd';
import Timer from './timer';
import Countdown from './countdown';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const App = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="Timer" key="1">
      <Timer />
    </TabPane>

    <TabPane tab="Countdown" key="2">
      <Countdown />
    </TabPane>
  </Tabs>
);

export default App;
