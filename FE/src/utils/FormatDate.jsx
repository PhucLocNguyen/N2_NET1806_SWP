function FormatDate(isoString){
const date = new Date(isoString);

const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0
const year = date.getFullYear();

const formattedTime = `${hours}:${minutes}`;
const formattedDate = `${day}/${month}/${year}`;

    return `${formattedTime} ${formattedDate}`;
}
export default FormatDate;