function formatVND(amount) {
    // Chuyển đổi số thành chuỗi và sử dụng hàm toLocaleString để thêm dấu chấm
   if(amount!=null){
       return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

   }else{
    return 0;
   }
}
export default formatVND;