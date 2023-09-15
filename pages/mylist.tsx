import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovies from "@/hooks/useMovies";


const PageMyList = () =>{
    const { data: favorites=[] } = useFavorites();
    const {isOpen, closeModal} = useInfoModal();
    return (
       <>
        <InfoModal visible={isOpen} onClose={closeModal}/>
        <MovieList title="My List" data={favorites}/>
       </>
    )
    
};

export default PageMyList
