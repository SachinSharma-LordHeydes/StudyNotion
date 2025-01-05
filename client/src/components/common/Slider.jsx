import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Import modules from 'swiper/modules'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import { getCourseByCatagory } from '../../services/operations/courseOperation';
import { useDispatch } from 'react-redux';
import { apiConnector } from '../../services/apiConnector';
import { courseEndpoints } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const { GET_COURSE_BY_CATAGORY } = courseEndpoints;

function Slider({ catagoryName }) {

  const [slider, setSlider] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector('POST', GET_COURSE_BY_CATAGORY, { catagoryName });
        console.log('Slider response => ', response);
        setSlider(response.data.data);
      } catch (error) {
        console.log('Unable to fetch courses by Category', error);
      }
    };

    fetchData();
    console.log('Slider sliderData =>', slider);
  }, [catagoryName, dispatch]);

  function showCompleteDetail(ele) {
    console.log('Complete Detail about Course ID is => ', ele._id);
    navigate(`/catalog/${catagoryName}/courseDetail/${ele._id}`);
  }

  return (
    <div className='text-white'>
      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 1500, // Increased the delay to make slides visible longer
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className='w-[90%] min-h-fit '
      >
        <div>
          {Array.isArray(slider) && slider.length > 0 ? (
            slider.map((ele, index) => (
              <SwiperSlide className=' py-9' key={index}>
                <div onClick={() => showCompleteDetail(ele)} className='space-y-1'>
                  <div className=''>
                    <img height={225} width={325} className='rounded-md ' src={ele.thumbnail} alt='' />
                  </div>

                  <div className='text-sm font-semibold'>{ele.courseDescp}</div>

                  <div className='text-xs text-richblack-500 '>{ele.courseName}</div>
                  <div className='text-sm text-yellow-100'>Rating</div>

                  <div className='text-md '>
                    <p>Rs. {ele.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div>
              <p>No data Available</p>
              <p>Courses Will be added Soon</p>
            </div>
          )}
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
