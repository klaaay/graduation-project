import React, { FC } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import queryString from 'query-string';

type IBreadProps = {};

const Bread: FC<IBreadProps & RouteComponentProps> = ({ location }) => {
  const pathnameArray = location.pathname.split('/').slice(2);

  const mapInfo = {
    home: { getText: () => '我的项目', to: '/admin/home' },
    projectDetail: {
      getText: () => {
        return queryString.parse(location.search).name;
      }
    }
  };

  return (
    <Breadcrumb>
      {pathnameArray.map(item => {
        if (mapInfo[item]) {
          return (
            <Breadcrumb.Item key={item}>
              {mapInfo[item]['to'] ? (
                <Link to={mapInfo[item]['to']}>
                  {mapInfo[item]['getText']()}
                </Link>
              ) : (
                mapInfo[item]['getText']()
              )}
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
};

export default withRouter(Bread);
