import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import './styles/index.css';

const AdminCovert = () => {
  function setIframeHeight(iframe) {
    if (iframe) {
      var iframeWin =
        iframe.contentWindow || iframe.contentDocument.parentWindow;
      if (iframeWin.document.body) {
        iframe.height =
          iframeWin.document.documentElement.scrollHeight ||
          iframeWin.document.body.scrollHeight;
      }
    }
  }
  return (
    <AdminLayout id="admin-covert" title="媒体工具">
      <iframe
        width="100%"
        height={520}
        src="https://www.aconvert.com/cn/"></iframe>
    </AdminLayout>
  );
};

export default AdminCovert;
