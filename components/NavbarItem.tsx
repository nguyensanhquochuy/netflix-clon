import React from 'react';

interface NavbarItemProps{
    label: string;
    link: any
}


const NavbarItem: React.FC<NavbarItemProps> =({
    label,
    link
}) => {
    return(
        <div
            onClick={link} 
            className="text-white cursor-pointer hover:text-gray-300 transition ">
            {label}
        </div>
    );
}
export default NavbarItem;