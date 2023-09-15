import useFavorites from "@/hooks/useFavorites";
import userCurrentUser from "@/hooks/userCurrentUser";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import {AiOutlineCheck, AiOutlinePlus} from 'react-icons/ai'
interface FavoriteButtonProps {
    movieId: string
}
const FavoriteButton:React.FC<FavoriteButtonProps> = ({
    movieId
}) => {
    const {mutate: mutateFavorites} = useFavorites();
    const {data: currentUser, mutate} = userCurrentUser();

    const isFavorite = useMemo(()=> {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);
    
    const toggleFavorites = useCallback( async () => {
        let response;

        if (isFavorite){
            response = await axios.delete(`/api/favorite?movieId=${movieId}`);
        } else {
            response = await axios.post('/api/favorite', {movieId});

        }

        const updateFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ... currentUser,
            favoriteIds: updateFavoriteIds
        });

        mutateFavorites();
    },[movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite? AiOutlineCheck : AiOutlinePlus;
    return (
        <div className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:bg-neutral-300  "
        onClick={toggleFavorites}>
            <Icon className="text-white" size={25}/>
        </div>
    )
};

export default FavoriteButton;