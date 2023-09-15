import React from "react";
import {isEmpty} from 'lodash'
import MovieCard from "./MovieCard";

interface MovieListProps {
    data: Record<string, any>[]; // Một mảng các đối tượng chứa thông tin về các phim.
    title: string
}


const MovieList: React.FC<MovieListProps> = ({
    data,
    title
}) => {
    // Kiểm tra nếu data rỗng, trả về null
    if (isEmpty(data)) {
        return null;
    }
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <p className="text-white text-md md:text-xl lg: text-2xl font-semibold mb-4">
                {title}
            </p>
            {/* Tiếp theo, component sử dụng một khối div để chứa danh sách phim:
Một khối div có các lớp CSS grid grid-cols-4 gap-2 để tạo thành một lưới với 4 cột và khoảng cách giữa các phần tử là 2.
Sử dụng hàm map để lặp qua mỗi phần tử trong mảng data.
Đối với mỗi phần tử, render một component MovieCard với các props:
key là giá trị duy nhất của thuộc tính id trong đối tượng movie.
data là đối tượng movie đó. */}
            <div className="grid grid-cols-4 gap-2">
                    {/* Lặp qua mỗi phần tử trong mảng data */}
                {data.map((movie) => (
                    // Render MovieCard với dữ liệu từng phần tử
                    <MovieCard key={movie.id} data={movie}/>
               
                ))}
            </div>
        </div>
    )
};

export default MovieList;