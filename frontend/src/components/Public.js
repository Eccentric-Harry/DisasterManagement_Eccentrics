import React from 'react';
import Navbar from '../components/Navbar/Navbar'; // Ensure the path is correct
import { Link } from 'react-router-dom';
import one from '../assets/one.jpeg';
import two from '../assets/two.jpeg';
import three from '../assets/three.jpg';
// import four from '../assets/four.jpg';


const Public = () => {
  return (
    <>
    <div className="bg-white min-h-screen"> {/* Set background to light gray */}
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-16"> {/* Adjust padding-top to avoid content overlap with the fixed navbar */}
        <section className="flex flex-col items-center justify-center min-h-screen mt-[-50px]"> {/* Move section upwards */}
          <div className="text-center">
            <h1 className="text-8xl font-bold text-gray-900 mb-4">Active Cases</h1>
            <h1 className="text-[100px] text-gray-700 mb-8"> {/* Further increase the size of the number */}
              50
            </h1>
          </div>
        </section>
      </main>
    </div>

    <div className='flex flex-col lg:flex-row bg-white w-full h-auto p-6 lg:p-10'>
    <div className='lg:w-1/2 text-black text-base lg:text-lg mt-6 lg:mt-0 lg:ml-6'>
          <div>
            <p className='text-2xl font-bold'>Earthquake</p>
             <p className='font-serif font-medium mt-3'>
             An earthquake is a sudden and intense shaking of the ground caused by the movement of tectonic plates beneath the Earth's surface. This movement releases energy that has built up due to the stress and friction between the plates, resulting in seismic waves that cause the ground to shake. Earthquakes can range in severity from minor tremors, barely noticeable by humans, to catastrophic events that cause widespread destruction. They often strike without warning and can trigger secondary hazards such as tsunamis, landslides, and aftershocks. Monitoring and early warning systems are crucial for mitigating the devastating effects of earthquakes, especially in areas prone to seismic activity.
            </p>
            </div> 
        </div>
        <div className='lg:w-1/2 flex justify-center items-center  '>
            <img src={one} alt="earthquake" className='w-80 h-80 rounded' />
        </div>
       
    </div>

    {/* Third Section */}
    <div className='flex flex-col lg:flex-row bg-white w-full h-auto p-6 lg:p-10 mt-14'>
    <div className='lg:w-1/2 text-black text-base lg:text-lg mt-10 lg:mt-0 lg:ml-6'>
          <div>
            <p className='text-2xl font-bold'>Flood</p>
             <p className='font-serif font-medium mb-24 mt-2 mr-10'>
             A flood occurs when water overflows onto normally dry land, often as a result of heavy rainfall, rapid snowmelt, or the failure of a dam or levee. Floods can develop slowly over several days or happen suddenly in the case of flash floods, where water levels rise quickly due to intense rainfall or rapid water runoff. Floodwaters can inundate homes, disrupt transportation, destroy crops, and damage infrastructure. Coastal flooding, caused by storm surges or high tides, can be exacerbated by rising sea levels. While floods are natural occurrences, proper flood management and early warning systems are critical in minimizing their impact on communities and preventing loss of life and property.
            </p>
            </div> 
        </div>
        <div className='lg:w-1/2 flex justify-center items-center mb-16  '>
            <img src={two} alt="flood" className='w-full lg:w-80 h-auto lg:h-80 rounded' />
        </div>
       
    </div>


    {/* Fourth Section */}
    <div className='flex flex-col lg:flex-row bg-white w-full h-auto p-6 lg:p-10'>
    <div className='lg:w-1/2 text-black text-base lg:text-lg mt-6 lg:mt-0 lg:ml-6'>
          <div>
            <p className='text-2xl font-bold'>Landslides</p>
             <p className='font-serif font-medium mb-24 mt-2 '>
             A landslide is the downward movement of rock, soil, or debris due to gravity, often triggered by natural events like heavy rain, earthquakes, volcanic activity, or human activities such as deforestation or construction. Landslides can occur suddenly, with little warning, or slowly over time as unstable slopes gradually lose their integrity. They can bury roads, homes, and infrastructure, posing serious risks to life and property. Areas with steep terrain and weak geological formations are particularly vulnerable to landslides. Effective land-use planning, slope management, and monitoring systems are essential for reducing landslide hazards, especially in areas prone to frequent slope instability.
            </p>
            </div> 
        </div>
        <div className='lg:w-1/2 flex justify-center items-center mb-16 '>
            <img src={three} alt="landslides" className='w-full lg:w-80 h-auto lg:h-80 rounded' />
        </div>
    </div>

    
</>

  );
  
};

export default Public;








