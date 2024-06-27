import { storage } from '../../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify';

const UploadImage = async (folder, data) => {

   const storageRef = ref(storage, `${folder}/${data?.name}`);
   const uploadTask = uploadBytesResumable(storageRef, data);

   const downloadURL = await new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
         (snapshot) => {
            // Theo dõi tiến trình upload nếu cần
         },
         (error) => {
            console.log('>>> Upload Image Error ', error);
            toast.error('Upload image error')
            reject(error);
         },
         async () => {
            try {
               const url = await getDownloadURL(uploadTask.snapshot.ref);
               // console.log('File available at', url);
               toast.success('Upload image success')
               resolve(url);
            } catch (error) {
               reject(error);
            }
         }
      );
   });

   return downloadURL;

}

export default UploadImage;
