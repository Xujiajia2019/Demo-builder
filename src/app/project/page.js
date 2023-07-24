"use client"
import {ImageBanner} from '../../components/ImageBanner';
import {ImageCards} from '../../components/ImageCards';
import {ImageGrid} from '../../components/ImageGrid';
import {ImagewithText} from '../../components/ImagewithText';
import {Testimonial} from '../../components/Testimonial';
import {SampleProducts} from '../../components/SampleProducts';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';
import { useEffect, useState } from 'react';

const renderComponent = (componentName, props) => {
  switch (componentName) {
    case 'ImageBanner':
      return <ImageBanner {...props} />;
    case 'ImagewithText':
      return <ImagewithText {...props} />;
    case 'FeaturedCollection':
      return <SampleProducts {...props} />;
    case 'ImageCards':
      return <ImageCards {...props} />;
    case 'ImageGrid':
      return <ImageGrid {...props} />;
    case 'Testimonial':
      return <Testimonial {...props} />;
    default:
      return null;
  }
};

export default function Index() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/getData`);
      const result = await response.json();
      if (response.ok) {
        console.log(JSON.parse(result))
        setData(JSON.parse(result));
      } else {
        throw new Error(result.error);
      }
    };
    fetchData();
  }, [])

  return (
    <>
    <Header />
    <div>
      {data.map((item) => {
        const componentName = item[Object.keys(item)[0]];
        const props = item[Object.keys(item)[1]];
        return (
          <div key={componentName}>{renderComponent(componentName, props)}</div>
        );
      })}
    </div>
    <Footer />
    </>
  );
}
