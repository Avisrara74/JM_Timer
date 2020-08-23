import * as React from 'react';
import { Tabs } from 'antd';
// eslint-disable-next-line import/extensions
import Timer from './timer/index';
// eslint-disable-next-line import/extensions
import Countdown from './countdown/index';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

const App: React.FC = () => (
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
