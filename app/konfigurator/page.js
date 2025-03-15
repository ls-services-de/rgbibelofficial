import React from 'react';
import Configurator from "../components/Configurator";
import Header from '../components/Header';
import Footer from '../components/Footer';


function Page() {
  return (
    <div className="background-container lg:h-[100vh]">
      <Header />
      <Configurator />

    </div>
  );
}

export default Page;
