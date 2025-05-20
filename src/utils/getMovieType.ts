import { IMovie } from "@/types/movies"

const getMovieType = (tv_air_date: IMovie['first_air_date']) => {
    return tv_air_date ? 'tv' : 'movie';
}

export default getMovieType