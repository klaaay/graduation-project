import React from 'react';
import { Tabs } from 'antd';
import UploadModal from './UploadModal';
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const ProjectsTabs = () => {
  return (
    <div className="project-tabs">
      <Tabs
        defaultActiveKey="pic"
        onChange={callback}
        animated={false}
        tabBarExtraContent={<UploadModal />}>
        <TabPane tab="图片" key="pic">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="视频" key="video">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="演示文稿" key="pdf">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProjectsTabs;
