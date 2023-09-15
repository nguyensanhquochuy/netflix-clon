import NextAuth , {AuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from '@/lib/prismadb';
import {compare} from 'bcrypt';
//  xác thực qua Google và Github
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


 export const authOptions: AuthOptions=          //default NextAuth 
{
    providers: [ // chứa danh sách các nhà cung cấp được sử dụng để xác thực và đăng nhập người dùng.

        GithubProvider({
            clientId: process.env.GITHUB_ID || '', // Đây là Client ID của ứng dụng được tạo trên GitHub Developer Settings. Tương tự như GoogleProvider, đây là một chuỗi định danh duy nhất để xác định ứng dụng của bạn trên GitHub.
            clientSecret: process.env.GITHUB_SECRET || '' //  Đây là Client Secret của ứng dụng được tạo trên GitHub Developer Settings. Nó cũng là một chuỗi bí mật được sử dụng để xác thực ứng dụng của bạn với GitHub.
            // Các biến môi trường (process.env) được sử dụng để truy cập các giá trị cấu hình này. 
            //Nếu giá trị không được tìm thấy (hoặc không được cung cấp), một chuỗi trống sẽ được sử dụng làm giá trị mặc định.
              
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID  || '', //  Đây là Client ID của ứng dụng được tạo trên Google API Console. Nó là một chuỗi định danh duy nhất được cung cấp bởi Google để xác định ứng dụng của bạn.
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '' //  Đây là Client Secret của ứng dụng được tạo trên Google API Console. Nó là một chuỗi bí mật được sử dụng để xác thực ứng dụng của bạn với Google.
        }),

        // Trong đoạn code dưới tôi dùng 'Credentials'
        // Credentials() là 1 provider của NextAuth, cho phép ng dùng đăng nhập bằng email và pass
        Credentials({
            id: 'credentials', // định danh provider là 'credentials'
            name: 'Credentials', // tên của provider
            credentials: { // cung cấp email và pass để đăng nhập => xác thực ng dùng
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                
                }
            },
            // Khi ng dùng đăng nhập bằng email và pass thì NextAuth sẽ gọi hàm này
            // để xác thực thông tin đăng nhập
            async authorize(credentials) {
                // Nếu ko nhập đủ email hoặc pass thì ném ra 1 lỗi
                if (!credentials?.email || !credentials?.password){
                    
                    throw new Error('Email and password required');
                    
                }
                
                // tìm kiếm ng dùng trong CSDL sử dụng prismadb vơi "findUnique"
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                
                // Nếu không tìm thấy ng dùng hoặc ng dùng ko co pass băm thì ném ra 1 lỗi
                if (!user || !user.hashedPassword){
                    
                    throw new Error('Email does not exist');
                }
                    // so sánh mật khẩu nhập vào với mật khẩu băm đã dc lưu trong CSDL dùng hàm compare               
                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                
                // Nếu mật khẩu ko đúng thì ném lỗi ra
                if(!isCorrectPassword){
                    throw new Error('Incorrect password');
                }
                
                //  Khi ko có lỗi gì nữa ==> trả về thông tin người dùng đó
                return user;
            }

        })
    ],

    // đây là một đối tượng để xác định các URL liên quan đến xác thực và đăng nhập. 
    // Ở đây, signIn được thiết lập để trỏ đến /auth URL, khi người dùng truy cập vào /auth, nó sẽ đưa người dùng đến trang đăng nhập.
    pages: {
        signIn: '/auth',
    },

    // debug là 1 thuộc tính đc sử dụng cho phép điều tra và hiển thị thông tin bổ sung khi xảy ra sự cố.
    // Nếu ở chế độ 'development' thì debug sẽ dc thiết lập thành 'true'
    debug: process.env.NODE_ENV == "development",

    adapter: PrismaAdapter(prismadb), // adapter dùng để kết nối với CSDL. Dùng prismaAdapter và truyền vào đối tượng prismadb đã dc khởi tạo từ Prisma

    // cấu hình phiên
    session: {
        strategy: 'jwt' // sử dụng chiến lược 'jwt' để xác thực phiên ng dùng
    },

    // là 1 đối tượng chứa cấu hình cho việc tạo  JWT (JSON Web Token).
    jwt: {
        // Ở đây, secret được thiết lập để sử dụng giá trị của biến môi trường NEXTAUTH_JWT_SECRET làm khóa bí mật cho việc tạo JWT.
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    // đối tượng này chứa khóa bí mật được sử dụng để mã hóa phiên và tạo JWT. Ở đây, khóa bí mật được lấy từ biến môi trường NEXTAUTH_SECRET.
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);