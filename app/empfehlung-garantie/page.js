import React from 'react';
import Empfehlung from '../components/Empfehlung';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Page() {
  return (
    <>
      {/* Hintergrundbild */}
      <div className='fixed h-[100vh] top-0 left-0 w-full -z-40' style={{ backgroundImage: "url('/bg-details.png')" }}></div>
      
      {/* Hauptcontainer für flexibles Layout */}
      <div className="flex flex-col min-h-screen"> {/* Flexbox aktivieren und min-h für den Bildschirm setzen */}
      <div className='mb-[200px]'>
          <Header />
        </div>
        
        <div className='flex-grow'> {/* Flex-grow sorgt dafür, dass der Inhalt Platz einnimmt */}
          <Empfehlung />
        </div>

        {/* Footer wird immer am Ende der Seite angezeigt */}
        <Footer />
      </div>
    </>
  );
}

export default Page;
