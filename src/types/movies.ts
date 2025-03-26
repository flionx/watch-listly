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
    // for moviePage
    budget: number,
    video: boolean | string,
    production_countries: IProdCountries[],
    genres: IMovieGenre[]
}

interface IProdCountries {
    name: string
}
export interface IMovieGenre {
    id: number,
    name: string
}