//  import hook useSWR từ thư viện swr. useSWR là một hook dùng để thực hiện các yêu cầu dữ liệu từ một API và quản lý trạng thái của dữ liệu đó.
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
const useBillboard = () => {
    //sử dụng hook useSWR để thực hiện yêu cầu dữ liệu từ API có đường dẫn /api/random 
    //bằng cách gọi hàm fetcher. Kết quả của yêu cầu dữ liệu được lưu trữ trong các biến data, error và isLoading.
    const {data, error, isLoading } = useSWR('/api/random', fetcher, {
        revalidateIfStale: false, // Không tái xác thực dữ liệu nếu dữ liệu đã lỗi thời.
        revalidateOnFocus: false, //  Không tái xác thực dữ liệu khi cửa sổ trình duyệt được tập trung.
        revalidateOnReconnect: false, // Không tái xác thực dữ liệu khi kết nối mạng được thiết lập lại.
    });

    return {
        data,
        error,
        isLoading
    }
};

export default useBillboard;