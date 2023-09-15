import React from "react";

interface InputProps{
    id: string;
    onchange:any;
    label: string;
    type:string;
    value:string
}
const Input:React.FC<InputProps>  = ({
    id,
    onchange,
    label,
    type,
    value
}) => {
    return( 
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onchange}
                className="
                    block
                    rounded-md
                    px-6
                    pt-6
                    pb-1
                    text-md
                    w-full
                    text-white
                    bg-neutral-700
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    peer
                "
                placeholder=" "
            
        
            />
            <label
                className="
                    absolute
                    text-md
                    text-zinc-400
                    duration-150
                    transform
                    -translate-y-3
                    scale-75 
                    top-4
                    z-10
                    origin-[0]
                    left-6
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-3                

                " 
            
                // scale : thu phóng
                //z-10: các phần từ có z-index cao hơn sẽ hiển thị trên các phần tử có z-index thấp hơn
                // origin-[0]: chỉ định gốc tọa độ của label là góc trái trên
                // peer-focus: scale-75: áp dụng kiểu CSS cho phần tử label khi phần tử input đang được focus, thu nhỏ phần tử label xuống 75%.
                //peer-focus:-translate-y-3: áp dụng kiểu CSS cho phần tử label khi phần tử input đang được focus, dịch chuyển phần tử label lên trên 3 đơn vị.
                htmlFor={id}>{label}
                
                </label>
                
        </div>

    );
}

export default Input;