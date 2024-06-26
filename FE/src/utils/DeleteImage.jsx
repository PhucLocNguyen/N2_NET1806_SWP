import { storage } from '../../firebaseConfig'
import { ref, deleteObject } from "firebase/storage";

const DeleteImage = async (url) => {

   // Trích xuất đường dẫn từ URL
   const baseUrl = "https://firebasestorage.googleapis.com/v0/b/<bucket-name>/o/";
   const imagePath = url
      .replace(baseUrl, "")
      .split("?")[0]
      .replace("%2F", "/"); // Thay thế ký tự mã hóa

   // Tạo tham chiếu đến tệp
   const imageRef = ref(storage, imagePath);

   // Xóa tệp
   try {
      await deleteObject(imageRef);
      console.log("File deleted successfully");
   } catch (error) {
      console.error("Error deleting file:", error);
   }
};

export default DeleteImage;