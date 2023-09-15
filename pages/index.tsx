import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "../components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";

import useMovies from "@/hooks/useMovies";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

import PageMovieList from "./movielist";
import PageMyList from "./mylist";

// Với hàm getServerSideProps này, khi truy cập vào trang được áp dụng nó, Next.js sẽ thực thi hàm này trước khi render trang, kiểm tra phiên đăng nhập của người dùng.
// Nếu không có phiên đăng nhập, người dùng sẽ được chuyển hướng đến trang /auth.
// Nếu có phiên đăng nhập, trang sẽ được tạo với props rỗng.

// hàm nhận vào context của trang và thực hiện kiểm tra phiên đăng nhập của user.
// Nếu không có phiên đăng nhập chuyển sang trang 'auth'
export async function getServerSideProps (context: NextPageContext){
  // Sử dụng getSession để lấy phiên đăng nhập của người dùng thông qua context.
    const session = await getSession(context);

    // Nếu không có phiên đăng nhập thì trả về một đối tượng redirect để chuyển hướng người dùng đến trang '/auth'
    // destination: chỉ định URL đích, pernament: xác định xem chuyển hướng là tạm thời hay ko
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }

    }

    // nêu có phiên đăng nhập trả về 1 prop rỗng.  Điều này chỉ định rằng trang sẽ được tạo với các props rỗng.
    return {
      props: {}
    }
}

export default function Home() {
  const { data: movie=[] } = useMovies();
  const { data: favorites=[] } = useFavorites();
  const {isOpen, closeModal} = useInfoModal();
  return (
    <>
        <InfoModal visible={isOpen} onClose={closeModal}/>
        <Navbar/>
        <Billboard/>
        <div className="pb-40">
            <MovieList title="Trending Now" data={movie}/>
            <MovieList title="My List" data={favorites}/>
        </div>


    </>
    

  )
}
