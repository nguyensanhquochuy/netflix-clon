import {NextApiRequest, NextApiResponse} from 'next';//  Import interface NextApiRequest và NextApiResponse từ thư viện Next.js để đại diện cho yêu cầu và phản hồi từ máy chủ.
import serverAuth from '@/lib/serverAuth';// Import hàm serverAuth từ lib/serverAuth để xác thực người dùng và lấy thông tin người dùng.

// hàm xử lý nhân vào yêu cầu và phản hồi từ máy chủ và trả về thông tin ng dùng
export default async function handler (req: NextApiRequest, res: NextApiResponse){

    // Nếu phương thức của yêu cầu không phải 'GET' thì trả về mã trạng thái 405 (Phương thức không được phép) và kết thúc
    if(req.method !='GET'){
        return res.status(405).end();
    }
    try{
        // Gọi hàm serverAuth để xác thực và lấy thông tin ng dùng, trả về 1 đối tượng  {currentUser}; 
        const {currentUser} = await serverAuth(req,res);

        //Trả về phản hồi với mã trạng thái 200 (OK) và đối tượng currentUser chứa thông tin người dùng dưới dạng JSON.
        return res.status(200).json(currentUser);
        
    } catch (error){
        //Ghi log lỗi và trả về phản hồi với mã trạng thái 400 (Yêu cầu không hợp lệ).
        console.log(error);
        return res.status(400).end();
    }
    
}