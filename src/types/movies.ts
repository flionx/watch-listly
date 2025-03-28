export interface IMovie {
    id: number,
    title?: string,
    name?: string,
    overview: string,
    backdrop_path: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    vote_count: number,
    runtime: number,
    media_type?: string,
    // for moviePage
    budget: number,
    video: boolean | string,
    production_countries: IProdCountries[],
    genres: IMovieGenre[],
    // series
    first_air_date?: string,
    number_of_seasons?: number,
    number_of_episodes?: number,

}

interface IProdCountries {
    name: string
}
export interface IMovieGenre {
    id: number,
    name: string
}