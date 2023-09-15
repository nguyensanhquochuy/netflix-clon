import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import useInfoModal from "@/hooks/useInfoModal";
import useMovies from "@/hooks/useMovies";


const movielist2 = () => {
    const { data: movie=[] } = useMovies();
    const {isOpen, closeModal} = useInfoModal();

    return (
        <>
        <InfoModal visible={isOpen} onClose={closeModal}/>
        <MovieList title="Trending Now" data={movie}/>
    </>
    )
};
export default movielist2;