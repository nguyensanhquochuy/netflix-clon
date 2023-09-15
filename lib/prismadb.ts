import { PrismaClient } from "@prisma/client"; // import PrismaClient vào file

// tạo 1 biến client dùng || để kiểm tra xem global.prismadb đã dc khởi tạo hay chưa
// nếu đã khởi tạo thì gán biến client bằng biến global.prismadb
// nếu chưa thì khởi tạo 1 instansce(thể hiện) của PrismaClient và gán vào biến client
const client = global.prismadb || new PrismaClient();

// nếu process đang chạy ở môi trường  khác 'production' thì gán client vào global.prismadb để lần sau sử dụng, không cần phải tạo mới
if (process.env.NODE_ENV !='production') global.prismadb = client;

{/* 
    Khi khởi tạo 1 PrismaCLient, nó tạo ra 1 kết nối đến CSDL và nó sẽ duy trì kết nối này trong suốt vòng đời của ứng dụng.
    
    Lý do tại sao cần phải khởi tạo 1 thể hiện của PrismaClient()
    Nếu ko khởi tạo 1 thể hiện của PrismaClient thì mỗi lần truy vấn thì phải tạo 1 kết nối mới ==>> tốn tài nguyên, ứng dụng chạy châm hơn
    Bằng cách khởi tạo 'client' và lưu nó trong 'global.prismadb'
    khi ứng dụng dc khởi động đầu tiên thì 'PrismaClient' sẽ đc khởi tạo 1 lần và dc sử dụng cho tất cả các truy vấn trong toàn bộ vòng đời của ứng dụng 
    ==>> Tăng hiệu suất, tiết kiệm tài nguyên
*/}


export default client;

// từ từ đã nào: 
// if (process.env.NODE_ENV !='production') global.prismadb = client; thì code code chạy nhanh hơn vì không cần phải tạo mới khi import file khi ở mode 'production'

// if (process.env.NODE_ENV !== 'production') global.prismadb = client;
// Đoạn code này gán đối tượng client cho biến toàn cục global.prismadb trong môi trường không phải là 'production'. Điều này có nghĩa là client chỉ được khởi tạo một lần duy nhất trong quá trình chạy ứng dụng khi chế độ môi trường không phải là 'production'. 
//Mỗi lần file này được import trong quá trình chạy ứng dụng, biến global.prismadb sẽ được sử dụng lại.

// Đoạn code đã được sửa đổi:

// if (process.env.NODE_ENV === 'production') global.prismadb = client;

// Đoạn code này gán đối tượng client cho biến toàn cục global.prismadb trong môi trường là 'production'. Điều này có nghĩa là client sẽ được khởi tạo lại mỗi khi file này được import trong quá trình chạy ứng dụng trong chế độ môi trường là 'production'.

// Về hiệu năng, đoạn code gốc chỉ khởi tạo client một lần duy nhất trong quá trình chạy ứng dụng khi không ở chế độ môi trường 'production'. Điều này có thể cải thiện hiệu suất của ứng dụng vì không cần tạo một kết nối mới mỗi khi file này được import.

// Đoạn code đã được sửa đổi tạo ra một kết nối mới với CSDL mỗi khi file này được import trong chế độ môi trường 'production'. Điều này đảm bảo rằng mỗi request trong môi trường sản xuất sẽ có một kết nối riêng biệt với CSDL, tăng tính đáng tin cậy và tránh các vấn đề liên quan đến chia sẻ kết nối.

// Vì vậy, khi lựa chọn giữa hai đoạn code, nên dựa vào mục đích và yêu cầu của ứng dụng. Nếu bạn muốn tối ưu hiệu suất và không cần tạo kết nối mới mỗi lần import file, bạn có thể sử dụng đoạn code gốc. Tuy nhiên, nếu bạn ưu tiên tính đáng tin cậy và muốn có kết nối riêng biệt cho mỗi request trong môi trường sản xuất, bạn nên sử dụng đoạn code đã được sửa đổi.