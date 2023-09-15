import NavbarItem from "./NavbarItem";
import {BsChevronDown} from 'react-icons/bs';
import { BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

const Navbar=() => {
    const router = useRouter();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const toogleMobileMenu = useCallback( ()=> {
        setShowMobileMenu((current)=>!current);
    },[]);

    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const toogleAccountMenu = useCallback( ()=> {
        setShowAccountMenu((current)=>!current);
    },[]);

    const [showBackground, setShowBackground] = useState(false);
    useEffect(()=> {
        const handleScroll = () => {
            if (window.scrollY >=TOP_OFFSET) {
                setShowBackground(true);
            }
            else {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);

        }
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground? 'bg-zinc-900 opacity-90': ''} `}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo"/>
                <div className="flex-row ml-8 gap-7 hidden lg:flex ">
                    <NavbarItem link={()=>router.push('/')} label="Home"/>
                    <NavbarItem link={()=>router.push('/')} label="Series"/>
                    <NavbarItem link={()=>router.push('/movielist')}  label="Films"/>
                    <NavbarItem link={()=>router.push('/mylist')}  label="New & Popular"/>
                    <NavbarItem link={()=>router.push('/mylist')} label="My List"/>
                    <NavbarItem link={()=>router.push('/')}   label="Browse by languages"/>
                </div>
                {/* Hiển thị mobile */}
                <div onClick={toogleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu? 'rotate-180' : 'rotate-0' }` }/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row items-center ml-auto gap-7 ">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition"> 
                        <BsSearch/>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition"> 
                        <BsBell/>
                    </div>
                    <div onClick={toogleAccountMenu} className="flex flex-row gap-2 items-center relative cursor-pointer">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden ">
                            <img src="/images/default-blue.png" alt="Profiles"></img>
                        </div>                   
                                                 {/* dấu tích back nha */}
                        <BsChevronDown className={`text-white transition ${showAccountMenu? 'rotate-180' : 'rotate-0' }` }/>
                        <AccountMenu visible= {showAccountMenu}/>

                    </div>
                </div>

            </div>
        </nav>
    )
}
export default Navbar;