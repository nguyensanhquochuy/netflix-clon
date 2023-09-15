import bcrypt from 'bcrypt'; // thư viện dùng để băm mật khẩu
import {NextApiRequest, NextApiResponse} from 'next'; // thêm 2 interface NextApiRequest và NextApiResponse từ thư viện Next.js để định dạng lại đối tượng yêu cầu và dtuong phản hồi từ máy chủ 
import prismadb from '@/lib/prismadb';// thực hiện các tác vụ liên quan đến CSDL

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    // Nếu yêu cầu không phải phương thức Post thì trả về mã lỗi 405 và kết thúc xử lý bằng hàm res.end()
    if (req.method != 'POST'){
        return res.status(405).end();
    }


    try {
        // sử dụng destructuring assignment để gán giá trị các thuộc tính tronng 'req.body'
        // cho các biến email, name, password. 'req.body' là 1 đối tượng chứa thông tin dc gửi lên server trong phần thân của HTTP request thông qua method POST
        const {email, name, password} = req.body;
        // tạo 1 biến để kiểm tra xem đã có email đó trong CSDL chưa,
        //findUnique tìm người dùng có email trên hay không, nếu không có user nào có email trên thì => null
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        // Nếu email đã tồn tại trong CSDL thì trả về mã lỗi 422 (thực thể không xử lý)
        // và thông báo email đã tồn tại
        if (existingUser){
            return res.status(422).json({error: 'Email taken'});
        }
        // dùng hàm 'hash' trong bcrypt để mã hóa mật khẩu, 12 là độ dài hay số vòng lặp
        const hashedPassword = await bcrypt.hash(password, 12);

        // Tạo user mới vào CSDL bằng method create() với các thông tin của user gồm email, name, hasedpassword, image, emailVerified.
        // Kết quả trả về lưu vào biến user
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });
        //Tạo thành công user
        // gửi dữ liệu user dưới dạng đối tượng JSON với trang thái 200
        return res.status(200).json(user);

    } catch (error){
        // Nếu xảy ra lỗi trong quá trinh xử lý API thì trả về mã trạng thái phản hồi 400(Yêu cầu ko hợp lệ)
        // Và kết thúc quá trinh xử lý API bằng hàm 'res.end()'
        console.log(error);
        return res.status(400).end();
    }
    
}