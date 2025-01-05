

// import React, { useCallback, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { useDispatch, useSelector } from 'react-redux';
// import HighligthText from '../HomePage/HighligthText';
// import { FiUploadCloud } from 'react-icons/fi';


// const FileUploadWithPreview = ({setValue, courseDetails, register, clearErrors,thumbnailPreview,videoPreview}) => {

//   // const {editOrNextStatus}=useSelector((state)=>state.course)
//   const {editOrNextStatus,editOrNextStatusOfVideo}=useSelector((state)=>state.profile)

//   const dispatch=useDispatch();

//   const [filePreview, setFilePreview] = useState(null); 
//   const [fileType, setFileType] = useState(null);

//   useEffect(()=>{
//     console.log("mode=>",videoPreview,editOrNextStatusOfVideo)
//     if(editOrNextStatus===0 && thumbnailPreview){
//       setFilePreview(thumbnailPreview)
//     }
//     if(editOrNextStatusOfVideo===0 && videoPreview){
//       setFilePreview(videoPreview)
//     }
//     console.log("previewurl=>",filePreview)
//   },[thumbnailPreview,videoPreview])


//   // Handle file drop
//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     console.log("acceptef Files=> ",acceptedFiles)
//     const acceptedFileType=acceptedFiles[0].type.split('/')[0]
//     setFileType(acceptedFileType)
//     console.log("filetype=> ",acceptedFileType)
//     console.log("filetype=> ",fileType)

//     const previewUrl = URL.createObjectURL(file);
//     setFilePreview(previewUrl)
//     setValue('thumbnail', file);
//   }, [setValue,fileType ]);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'image/*,video/*',
//   });

//   function setPreviewNull(){
//     console.log("clicked")
//     setFilePreview(null);
//   }


//   return (
//     <div  
//       className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center min-h-[200px] items-center flex justify-center bg-richblack-700 flex-col">
//       <div className='' {...getRootProps()}>
//         <input {...getInputProps()}  name='thumbnail'  />

//         <div>
//           {
//             filePreview ? (
//               <div>
//                 {fileType === 'image' ? (
//                   <img src={filePreview} alt="Preview" className="max-h-[200px] object-cover" />
//                 ) : (
//                   <video controls className="max-h-[200px] object-cover">
//                     <source src={filePreview || videoPreview} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//             ) : (
//               <div className='space-y-5 text-richblack-200'>
//                 <div className='mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]'>
//                   <div className='bg-richblack-800 rounded-full p-3'>
//                     <FiUploadCloud size={40} color='yellow' />
//                   </div>
//                   <p className='text-sm'>Drag and drop an image or video, or click to <HighligthText text={'Browse'} colour={'bg-yellow-50'} /></p>
//                 </div>
//                 <ul className='flex text-xs justify-between list-disc'>
//                   <li>Aspect ratio 16:9</li>
//                   <li>Recommended size 1024x576</li>
//                 </ul>
//               </div>
//             )
//           }

//         </div>
//       </div>

//       <div>
//       {
//         filePreview?
//         (
//           <div className='mt-2 text-yellow-50'>
//             <button type='button' onClick={setPreviewNull} className='border-b border-b-yellow-5'>Cancle</button>
//           </div>
//         ):
//         (
//           <div/>
//         )
//       }
//       </div>
//     </div>
//   );
// };

// export default FileUploadWithPreview;




import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import HighligthText from '../HomePage/HighligthText';
import { FiUploadCloud } from 'react-icons/fi';

const FileUploadWithPreview = ({ setValue, register, clearErrors, thumbnailPreview, videoPreview }) => {
  const { editOrNextStatus, editOrNextStatusOfVideo } = useSelector((state) => state.profile);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    // Handle initial preview based on edit mode and type
    if (editOrNextStatus === 0 && thumbnailPreview) {
      setPreview(thumbnailPreview);
      setFileType('image');
    }
    if (editOrNextStatusOfVideo === 0 && videoPreview) {
      setPreview(videoPreview);
      setFileType('video');
    }
  }, [thumbnailPreview, videoPreview, editOrNextStatus, editOrNextStatusOfVideo]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Determine file type
    const type = file.type.split('/')[0];
    setFileType(type);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setValue('thumbnail', file);
    clearErrors('thumbnail');

    // Cleanup previous preview URL
    return () => URL.revokeObjectURL(previewUrl);
  }, [setValue, clearErrors]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    },
    maxFiles: 1
  });

  const handleClearPreview = () => {
    setPreview(null);
    setFileType(null);
    setValue('thumbnail', null);
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (fileType === 'image') {
      return (
        <img 
          src={preview} 
          alt="Preview" 
          className="max-h-[200px] w-auto mx-auto object-contain rounded-lg"
        />
      );
    }

    if (fileType === 'video') {
      return (
        <video 
          controls 
          className="max-h-[200px] w-auto mx-auto object-contain rounded-lg"
        >
          <source src={preview} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center min-h-[200px] bg-richblack-700">
      <div 
        {...getRootProps()} 
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <input {...getInputProps()} name="thumbnail" />

        {preview ? (
          <div className="w-full">
            {renderPreview()}
          </div>
        ) : (
          <div className="space-y-5 text-richblack-200">
            <div className="mx-auto flex flex-col space-y-2 justify-center items-center w-[60%]">
              <div className="bg-richblack-800 rounded-full p-3">
                <FiUploadCloud size={40} color="yellow" />
              </div>
              <p className="text-sm">
                Drag and drop an image or video, or click to{' '}
                <HighligthText text="Browse" colour="bg-yellow-50" />
              </p>
            </div>
            <ul className="flex text-xs justify-between list-disc px-4">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleClearPreview}
            className="text-yellow-50 border-b border-b-yellow-50 hover:text-yellow-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadWithPreview;