import axios from "axios"; // : Import thư viện Axios để thực hiện các yêu cầu HTTP.

// hàm fetcher nhận vào URL và sử dụng axios để thực hiện yêu cầu get tời URL đó.
// Sau đó trả về dữ liệu phản hồi từ yêu cầu
const fetcher = (url: string) => axios.get(url).then((res)=>res.data);

export default fetcher;