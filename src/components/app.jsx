import React from 'react';
import Timer from './timer';
import Countdown from './countdown';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

class App extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Timer" key="1">
          <Timer />
        </TabPane>

        <TabPane tab="Countdown" key="2">
          <Countdown />
        </TabPane>
      </Tabs>
    )
  }
}

export default App;