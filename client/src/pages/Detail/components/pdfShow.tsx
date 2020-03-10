import React, { FC, useEffect } from 'react';
import $ from 'jquery';
import { useFullscreen } from '@umijs/hooks';
import '../styles/pdfShow.css';
import { Button, Tooltip } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';

interface IPdfShow {
  pdf: {
    pdf: string;
    thumb: string;
    alt: string;
  }[];
}

const PdfShow: FC<IPdfShow> = ({ pdf }) => {
  const { ref, isFullscreen, setFull, exitFull, toggleFull } = useFullscreen<
    HTMLDivElement
  >();

  useEffect(() => {
    console.log(isFullscreen);
    $('.myPdf').css('height', $(window).height() - 98);
    $('.myPdf-show').css('height', ($(window).height() - 98) * 0.8);
    $('.myPdf-gallery').css('height', ($(window).height() - 98) * 0.2);
  }, []);

  return (
    <div className="myPdf">
      <div ref={ref} className="pdf-content-container">
        <embed
          src={pdf.length && pdf[0].pdf}
          type=""
          className="myPdf-show"
          style={{
            height: isFullscreen ? '100vh' : ($(window).height() - 98) * 0.8
          }}
        />
        <div
          style={{
            float: 'right',
            transform: 'translate(-20px, -42px)',
            backgroundColor: 'white',
            opacity: '0.4'
          }}
          onClick={toggleFull}>
          <Tooltip title="全屏">
            <FullscreenOutlined style={{ fontSize: '32px' }} />
          </Tooltip>
        </div>
      </div>
      <div className="myPdf-gallery">
        {pdf.map((item, index) => (
          <img
            key={index}
            src={item.thumb}
            className={
              index === 0 ? 'gallery-img gallery-img-selected' : 'gallery-img'
            }
            alt={item.alt}
            onClick={e => {
              $('.myPdf-show').attr('src', item.pdf);
              $('.gallery-img').removeClass('gallery-img-selected');
              $(e.target).addClass('gallery-img-selected');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PdfShow;
