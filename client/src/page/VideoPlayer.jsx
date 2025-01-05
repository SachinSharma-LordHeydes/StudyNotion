import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaChevronUp } from "react-icons/fa";
import { MdLaptopChromebook } from "react-icons/md";
import Loader from "./Loader";

function VideoPlayer() {
  const { courseDetails } = useSelector((state) => state.course);
  const {loader}=useSelector((state)=>state.auth);

  // State to track expanded section and currently playing video
  const [showContent, setShowContent] = useState(null); 
  const [videoToPlay, setVideoToPlay] = useState(
    courseDetails?.courseContent[0]?.subSection[0]?.videoURL || ""
  );

  useEffect(() => {
    console.log("CourseDetails------------->", courseDetails);
    console.log("Default video to play------------->", videoToPlay);
  }, [courseDetails, videoToPlay]);

  const handleShowSubSection = (index) => {
    console.log("Clicked on arrow/subsection");
    setShowContent((prev) => (prev === index ? null : index));
  };

  const handleVideoToPlay = (videoURL) => {
    console.log("Video URL-------->", videoURL);
    setVideoToPlay(videoURL); // Update the video URL to play
  };

  return (
    <div>
      {
        loader?
        (
          <Loader></Loader>
        )
        :
        (
          <div className="py-14 text-white flex space-x-5">
            {/* Section---Subsection */}
            <div className="w-[25%] bg-richblack-800 pt-5 h-screen hover:cursor-pointer">
              <div className="font-bold text-lg px-4 py-2">
                {courseDetails?.courseName}
              </div>
              <hr className="bg-richblack-200 mb-5 w-[95%] mx-auto" />

              <div>
                {courseDetails?.courseContent.map((element, index) => (
                  <div key={index}>
                    <div className="bg-richblack-700">
                      {/* Section Header */}
                      <div
                        onClick={() => handleShowSubSection(index)}
                        className="flex justify-between px-5 py-3"
                      >
                        <div>{element?.sectionName}</div>
                        <div
                          className={`transform transition-transform duration-200 ${
                            showContent === index ? "rotate-180" : ""
                          }`}
                        >
                          <FaChevronUp />
                        </div>
                      </div>

                      {/* Subsection (Visible only if expanded) */}
                      {showContent === index && (
                        <div>
                          {element?.subSection.map((ele, indx) => (
                            <div key={indx}>
                              <div
                                onClick={() => handleVideoToPlay(ele.videoURL)}
                                className="flex items-center hover:bg-richblack-600 p-2 cursor-pointer"
                              >
                                <div>
                                  <p className="px-7 text-sm text-richblack-100">
                                    {ele?.title}
                                  </p>
                                </div>
                                <div>
                                  <MdLaptopChromebook />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Player */}
            <div className="w-[75%] bg-richblack-900 flex justify-center items-center">
              <div className="w-[80%] bg-black rounded-lg overflow-hidden">
                {videoToPlay ? (
                  <video
                    src={videoToPlay}
                    controls
                    autoPlay
                    className="w-full h-auto"
                  ></video>
                ) : (
                  <div className="text-center text-richblack-200 py-7">
                    Select a video to play
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default VideoPlayer;
