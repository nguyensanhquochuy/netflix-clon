import axios from "axios";
import { useCallback, useState } from "react";
import Input from "../components/Input";
import {signIn} from 'next-auth/react';

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';


const Auth = () => {
    {/* useState là 1 hook trong React giúp quản lý các state tron functional component
        tạo 1 state mới có tên là "email" với giá trị khởi tạo là ''
Và 1 hàm setEmail để cập nhật giá trị cho email đó */}

    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassWord] = useState('');
    {/*
        'variant' đại diện cho trạng thái tùy chọn trong giao diện người dùng như chế đô đăng nhập hay đăng ký
        'toogleVariant' đại diện cho hành động chuyển đổi giữa các trạng thái đó (chuyển đối giữa đăng nhập và đăng ký)
    */}

    const [variant,setVariant] = useState('login'); // thiết lập giá trị 'variant' ban đầu = login
    const toogleVariant = useCallback(()=>{
        setVariant((currentVariant) =>  currentVariant == 'login'? 'register' : 'login'
    )}, []);
        // useCallback nhận vào 2 tham số là 1 hàm callback và 1 mảng phụ thuộc, thay đổi chi khi các phụ thuộc thay đổi


        // dùng useCallback để tối ưu hóa hiệu suất của ứng dụng React
    const login = useCallback(async ()=>{
        try {
            await signIn('credentials',{
                email,
                password,
                callbackUrl: '/profiles'

                
            } );
        } catch (error) {
            console.log(error);
            
            
        }
    },[email,password]);        
    const register = useCallback(async () => {
        try {
             // dùng thư viện axios để gửi 1 yêu cầu HTTP Post đến API endpoint 'api/register' với 1 obiect chưa email, name, password như 1 REQUEST BODY
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            login();
            // Nếu request thành công thì đăng nhập
            // Ngược lại thì bắt lỗi đó và in ra lỗi            
        } catch(error){
            console.log(error);
        }
    }, [email, name, password, login]);   // mảng phụ thuộc gồm email, name, password. Khi 1 trong các giá trị trên thay đổi thì sẽ gọi lại hàm useCallback
    


    return(
        <div className="relative h-full bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat bg-center bg-fixed">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-16 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"></img>
                </nav>
                <div className="flex justify-center"> 
                    <div className=" bg-black bg-opacity-70 px-16 py-16 mt-2 lg:w-2/5 lg:max-w-md w-full self-center ">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            { // nếu variant = 'login' thì hiển thị Sign in ngược lại hiển thị Register
                                variant =='login' ? 'Sign in' : 'Register'   
                            }
                            
                        </h2>
                        <div className=" flex flex-col gap-4">
                            {/* Nếu varriant = 'register' thì hiển thị thẻ input username */}
                            { variant == 'register' && (
                                <Input 
                                    id="name"
                                    label="Username" // ev đại diện cho sự thay đổi giá trị của 'input'
                                    onchange={(ev:any)=>setName( ev.target.value)}
                                    type="text"
                                    value={name}                
                                    /> 
                            )}
                            <Input 
                                id="email"
                                label="Email" // ev đại diện cho sự thay đổi giá trị của 'input'
                                onchange={(ev:any)=>setEmail( ev.target.value)}// gọi hàm setEmail khi có sự thay đổi input.  Giá trị mới của input được lấy từ 'ev.target.value' sau đó được đưa vào hàm setEmail() để cập nhật giá trị của state 'email'
                                type="email"
                                value={email} // lấy giá trị của state 'email', value là giá trị của input                    
                                />  
                            <Input 
                                id="password"
                                label="Password" // ev đại diện cho sự thay đổi giá trị của 'input'
                                onchange={(ev:any)=>setPassWord( ev.target.value)}// gọi hàm setEmail khi có sự thay đổi input.  Giá trị mới của input được lấy từ 'ev.target.value' sau đó được đưa vào hàm setEmail() để cập nhật giá trị của state 'email'
                                type="password"
                                value={password} // lấy giá trị của state 'email', value là giá trị của input                    
                                />  
                        </div>
                        <button onClick={ variant=='login'? login : register} className="bg-red-600 rounded-md text-white w-full mt-10 py-3 hover:bg-red-700 translation  ">
                            {variant=='login'?  'Login' : 'Sign up'}
                        </button>  
                        <div className="flex flex-row mt-8 items-center justify-center gap-4">
                            <div 
                                onClick={()=> signIn('google', { callbackUrl: '/profiles'})}
                                className="bg-white w-10 h-10 rounded-full hover:opacity-80 transition cursor-pointer flex items-center justify-center ">
                            
                                <FcGoogle size={30}></FcGoogle>
                            </div>
                            <div 
                                onClick={ () =>  signIn('github', {callbackUrl: '/profiles' })} 
                                className="bg-white w-10 h-10 rounded-full hover:opacity-80 transition cursor-pointer flex items-center justify-center ">
                                    <FaGithub size={30}></FaGithub>
                            </div>

                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant=='login'?  'First time using Netflix?' : 'Already an account'}
                            <span onClick={toogleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                 {variant=='login'? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>

                </div>
                
            </div>

        </div>
    )
}
export default Auth;