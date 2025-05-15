'use client'

import React from "react";
import Header from "./components/Header";
import Slider from './components/Slider';
import { images, producttop, promises, partners } from '../public/constants';
import TopProducts from './components/TopProducts';
import Promises from './components/Promises';
import Video from './components/Video';
import PartnerSection from './components/PartnerSection';
import Footer from './components/Footer';



const Page = () => {
  return (

    <div className="w-full h-screen hide-scrollbar">
      <Header />
      <Slider images={images} />
      <TopProducts producttop={producttop} />
      <Promises promises={promises} />
      <div id='vision'>
        <Video />
      </div>
      
      <Footer />
    </div>

  );
}

export default Page;
