import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'GET'){
        return res.status(405).end();
    }

    try {
        // chúng ta gọi hàm serverAuth(req) để xác thực phiên đăng nhập của người dùng. Nếu có lỗi xảy ra trong quá trình xác thực, nó sẽ được bắt bởi khối catch, in ra lỗi và trả về một phản hồi lỗi với mã trạng thái 400 (Bad Request).
        await serverAuth(req, res);
        //lấy tổng số lượng bộ phim có trong cơ sở dữ liệu.
        const movieCount = await prismadb.movie.count();

        //Dòng này tạo một số nguyên ngẫu nhiên randomIndex trong phạm vi từ 0 đến tổng số lượng bộ phim. Nó sử dụng hàm Math.random() để tạo một số ngẫu nhiên từ 0 đến 1, và sau đó nhân với movieCount và áp dụng Math.floor() để làm tròn xuống số nguyên gần nhất.
        const randomIndex = Math.floor(Math.random() * movieCount);

        // : Dòng này sử dụng phương thức findMany() của prismadb.movie để lấy một danh sách các bộ phim. skip: số lượng bản ghi mà nó sẽ bỏ qua từ đầu, take: lấy số lượng bản ghi
        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex,
        });

        // trả về một phản hồi thành công với mã trạng thái 200 (OK) và dữ liệu của bộ phim ngẫu nhiên đầu tiên trong danh sách (randomMovies[0]) dưới dạng JSON.
        return res.status(200).json(randomMovies[0]);

    } catch (error){
        console.log(error);
        return res.status(400).end();
    }
}