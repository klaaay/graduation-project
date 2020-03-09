import React, { useState } from 'react';
import { Tabs } from 'antd';
import UploadModal from './UploadModal';
import BlockContainer, { IBlockItem } from './BlockContainer';
import { getProjectMedias } from '@/service';
const { TabPane } = Tabs;

const ProjectsTabs = () => {
  const [mode, setMode] = useState('pic');
  const [blockList, setBlockList] = useState<IBlockItem[]>([]);

  function callback(key) {
    console.log(key);
    setMode(key);
  }

  const handleGetProjectMedias = projectId => {
    getProjectMedias({ id: projectId }).then(res => {
      const { data, isError, msg } = res;
      if (!isError) {
        // message.success(msg);
        setBlockList(data);
      }
    });
  };

  return (
    <div className="project-tabs">
      <Tabs
        defaultActiveKey="pic"
        onChange={callback}
        animated={false}
        tabBarExtraContent={
          <UploadModal
            mode={mode}
            handleGetProjectMedias={handleGetProjectMedias}
          />
        }>
        <TabPane tab="图片" key="pic">
          <BlockContainer
            mode={mode}
            handleGetProjectMedias={handleGetProjectMedias}
            blockList={blockList}
          />
        </TabPane>
        <TabPane tab="视频" key="video">
          <BlockContainer
            mode={mode}
            handleGetProjectMedias={handleGetProjectMedias}
            blockList={blockList}
          />
        </TabPane>
        <TabPane tab="演示文稿" key="pdf">
          <BlockContainer
            mode={mode}
            handleGetProjectMedias={handleGetProjectMedias}
            blockList={blockList}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProjectsTabs;
