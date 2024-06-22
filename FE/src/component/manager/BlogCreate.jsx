import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

function BlogCreate() {
   const [value, setValue] = useState('');

   const modules = {
      toolbar: [
         [{ header: [1, 2, 3, 4, 5, 6, false] }],
         ['bold', 'italic', 'underline'],
         [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
         ],
         ['image', 'link']
      ]
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

   console.log(value)

   return (
      <div className="min-h-[100vh] py-[3rem] px-[3rem] bg-[#f7f9fc] w-[80%] ml-[auto]">
         <div>
            <input placeholder="Title" type="text" className="border-[1px] border-solid border-[black] px-[10px] py-[5px] h-[40px] w-[100%] font-medium leading-[40px] text-[30px]" />
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

         {/* Description */}
         <div className='flex items-center justify-center w-[100%] h-[500px] bg-[#fff]'>

            <div className='relative flex items-center justify-center w-[50%] h-[500px]  border-r-[1px] border-solid border-[#000]'>
               <ReactQuill
                  theme='snow'
                  value={value}
                  onChange={setValue}
                  modules={modules}
                  className='w-[100%] min-h-[500px]'
               />
            </div>
            
            <div className='w-[50%] min-h-[500px] pt-[10px]' dangerouslySetInnerHTML={{ __html: value }} />
         </div>

      </div>
   )
}

export default BlogCreate;