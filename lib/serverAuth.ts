import { NextApiRequest, NextApiResponse } from "next"; // Import interface NextApiRequest từ thư viện Next.js để đại diện cho yêu cầu từ máy chủ.
// import { getSession } from "next-auth/react";//  Import hàm getSession từ next-auth/react để lấy phiên đăng nhập của người dùng.
import {getServerSession} from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prismadb from '@/lib/prismadb';// Import đối tượng prismadb từ thư mục lib/prismadb, đại diện cho kết nối CSDL.

// hàm serverAuth nhận vào 1 yêu cầu từ máy chủ và thực hiện xác thực ng dùng và lấy thông tin ng dùng
const serverAuth = async (req: NextApiRequest, res: NextApiResponse)=> {

      // Lấy phiên đăng nhập của ng dùng bằng cách gọi hàm getSession và truyền yêu cầu từ máy chủ vào ('req')
     const session = await getServerSession(req, res,authOptions );

     // Kiêm tra phiên đăng nhập có tồn tại và chức email ng dùng hay ko
     // Nếu ko thì ném lỗi  'Not sign in'
     if (!session?.user?.email){
        throw new Error('Not signed2 in');
     }
     // Lấy thông tin ng dùng từ CSDL bằng phương thức findUnique của dtuog user trong prismadb
     // Tìm xem có user nào có email trùng với email của phiên đăng nhập hay ko
     const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
     });

     // Nếu ng dùng ko tôn tại thì ném lỗi
     if ( !currentUser){
        throw new Error('Not sign 1in');
     }
     return {currentUser}; // trả về đối tượng 'currentUser' chứa thông tin ng dùng nếu xác thực thành công
};

export default serverAuth; // Xuất hàm để sử dụng nơi khác