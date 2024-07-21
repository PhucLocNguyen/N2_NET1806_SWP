import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

function BlogCreate() {
   const [value, setValue] = useState('');

   const [data, setData] = useState({
      title: '',
      image: '',
      content: ''
   });

   const handleFormChange = (e) => {
      const { name, value } = e.target;
      setData({
         ...data,
         [name]: value
      })
   }

   const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
   });

   console.log(data)

   return (
      <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc]">
         <div>

            <input data-testid='title' name='title' onChange={handleFormChange} placeholder="Title" type="text" className="border-[1px] border-solid border-[black] px-[10px] py-[5px] h-[40px] w-[100%] font-medium leading-[40px] text-[30px]" />

         </div>

         {/* Them hinh anh cho BLog */}
         <div className='my-[1.5rem] min-h-[50px]'>
            <Button
               component="label"
               role={undefined}
               variant="outlined"
               tabIndex={-1}
               startIcon={<CloudUploadIcon />}
               sx={{
                  border: '2px solid'
               }}
            >
               Upload Blog Image
               <VisuallyHiddenInput type="file" />
            </Button>
         </div>


         <div>
            <textarea data-testid='textarea' name='content' onChange={handleFormChange} className='w-[100%]  min-h-[500px]'></textarea>
         </div>

         <div className='mt-[10px]'>
            <Button variant="outlined" sx={{ border: '2px solid' }}>Save</Button>

         </div>

      </div>
   )
}

export default BlogCreate;