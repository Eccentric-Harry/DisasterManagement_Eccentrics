import React from 'react';
import Slider from 'react-slick';
import image3 from '../assets/img1.png';
import Vijayawada from '../assets/floods.png';
import Wayanad from '../assets/wind.png';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faFire, faMapPin, faClock, faEarthAfrica } from '@fortawesome/free-solid-svg-icons';

const Public = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="w-full py-6 lg:py-10">
        <Slider {...settings}>
          <div className="flex justify-center items-center w-full">
            <img src={image3} alt="Disaster Image 1" className='w-full h-auto rounded' />
          </div>
          <div className="flex justify-center items-center w-full">
            <img src={Vijayawada} alt="Disaster Image 2" className='w-full h-auto rounded' />
          </div>
          <div className="flex justify-center items-center w-full">
            <img src={Wayanad} alt="Disaster Image 3" className='w-full h-auto rounded' />
          </div>
        </Slider>
      </div>
      <div>
        <section id="live-updates" className="bg-background py-12 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold">Live Updates</h2>
              <p className="text-muted-foreground">
                Stay informed on the latest natural disasters and emergency situations.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader
                  title={<Typography variant="h6">Hurricane Ida</Typography>}
                  subheader={<Typography variant="body2">Category 4 hurricane making landfall in Louisiana</Typography>}
                />
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faWind} className="h-6 w-6 text-primary" />
                    <span>155 mph winds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapPin} className="h-6 w-6 text-primary" />
                    <span>New Orleans, LA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="h-6 w-6 text-primary" />
                    <span>Updated 30 minutes ago</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader
                  title={<Typography variant="h6">Wildfires in California</Typography>}
                  subheader={<Typography variant="body2">Multiple wildfires burning across Northern California</Typography>}
                />
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFire} className="h-6 w-6 text-primary" />
                    <span>Over 50,000 acres burned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapPin} className="h-6 w-6 text-primary" />
                    <span>Northern California</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="h-6 w-6 text-primary" />
                    <span>Updated 1 hour ago</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader
                  title={<Typography variant="h6">Earthquake in Japan</Typography>}
                  subheader={<Typography variant="body2">Magnitude 7.1 earthquake strikes off the coast of Japan</Typography>}
                />
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEarthAfrica} className="h-6 w-6 text-primary" />
                    <span>Magnitude 7.1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapPin} className="h-6 w-6 text-primary" />
                    <span>Off the coast of Japan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="h-6 w-6 text-primary" />
                    <span>Updated 2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Public;
