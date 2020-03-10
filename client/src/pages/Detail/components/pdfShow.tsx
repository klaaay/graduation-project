import React, { FC, useEffect } from 'react';
import $ from 'jquery';
import { useFullscreen } from '@umijs/hooks';
import '../styles/pdfShow.css';

interface IPdfShow {
  pdf: {
    pdf: string;
    thumb: string;
    alt: string;
  }[];
}

const PdfShow: FC<IPdfShow> = ({ pdf }) => {
  useEffect(() => {
    $('.myPdf').css('height', $(window).height() - 98);
    $('.myPdf-show').css('height', ($(window).height() - 98) * 0.8);
    $('.myPdf-gallery').css('height', ($(window).height() - 98) * 0.2);
  }, []);

  return (
    <div className="myPdf">
      <embed src={pdf.length && pdf[0].pdf} type="" className="myPdf-show" />
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
