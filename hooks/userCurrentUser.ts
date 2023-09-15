import useSWR from 'swr'; //  Import hook useSWR từ thư viện SWR để quản lý việc tải dữ liệu từ máy chủ.

import fetcher from '@/lib/fetcher'; // Import hàm fetcher từ lib/fetcher để sử dụng trong useSWR.

// hàm lấy thông tin ng dùng từ máy chủ bằng hook useSWR để có thể tương tác với dữ liệu ng dùng
//useSWR là một hook được cung cấp bởi thư viện SWR để quản lý việc tải dữ liệu từ máy chủ và quản lý bộ nhớ cache.
const userCurrentUser = () => {
    // Sử dụng hook 'useSWR' để tải dữ liệu từ đg dẫn 'api/current' từ máy chủ.
    // 'useSWR' nhận vào 2 tham số là URL cần tải và hàm fetcher để thực hiện y/cau HTTP
    const {data, error, isLoading, mutate} =  useSWR('/api/current', fetcher);

   // data: Dữ liệu được trả về từ yêu cầu HTTP. Nếu yêu cầu thành công, data sẽ chứa thông tin người dùng. 
    // error: Lỗi (nếu có) từ yêu cầu HTTP. Nếu có lỗi, error sẽ chứa thông tin về lỗi xảy ra.
    // isLoading: Trạng thái đang tải. Nếu đang tải dữ liệu, isLoading sẽ là true, ngược lại, nó sẽ là false.
// mutate: Phương thức để thực hiện tải lại dữ liệu. Khi gọi mutate(), hook useSWR sẽ thực hiện yêu cầu tải lại dữ liệu từ máy chủ.


    // Trả về một đối tượng chứa thông tin về dữ liệu, lỗi, trạng thái tải và phương thức mutate

    return {
        data,
        error,
        isLoading,
        mutate,
    }
    // . Điều này cho phép component sử dụng hook userCurrentUser có thể truy cập và sử dụng các giá trị này trong quá trình render.
};



export default userCurrentUser;