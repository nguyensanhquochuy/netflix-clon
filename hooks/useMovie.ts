//  import hook useSWR từ thư viện swr. useSWR là một hook dùng để thực hiện các yêu cầu dữ liệu từ một API và quản lý trạng thái của dữ liệu đó.
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
const useMovie = (id?: string) => {

    const {data, error, isLoading } = useSWR(id? ` /api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false, 
        revalidateOnFocus: false, 
        revalidateOnReconnect: false, 
    });

    return {
        data,
        error,
        isLoading
    }
};

export default useMovie;