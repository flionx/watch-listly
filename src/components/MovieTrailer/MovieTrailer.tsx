import { FC } from 'react'
import { IMovieVideo } from '@/types/movies'
import { TitleMiddle } from '@/ui/Text/Text'
interface Props {
    trailerKey: IMovieVideo['key'],
}

const MovieTrailer: FC <Props> = ({trailerKey}) => {
    return (
    <section className='movie-main__trailer'>
        <h3><TitleMiddle>Trailer</TitleMiddle></h3>
        <div className="movie-main__trailer-block">
            <iframe 
                src={`https://www.youtube.com/embed/${trailerKey}?origin=${window.location.origin}`} 
                allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-same-origin allow-scripts allow-presentation"
                title="Movie Trailer - YouTube"
                loading='lazy'
            >    
            </iframe>
        </div>
    </section>
  )
}

export default MovieTrailer

export function renderTrailer(videos: IMovieVideo[]) {
    if (!videos || videos.length === 0) {
        return null
    }
    const trailers = videos.filter(video => video.type === 'Trailer');
    if (trailers.length === 0) {
        return null
    }
    const trailerKey = trailers.length > 1 ? trailers.find(video => video.official)?.key : trailers[0].key;
    const reg = /^[a-zA-Z0-9_-]{11}$/;
    if (trailerKey?.length === 0) {
        return null
    }
    if (!reg.test(trailerKey!)) {
        return null
    }

    return (
        <MovieTrailer 
            trailerKey={trailerKey as IMovieVideo['key']}
        />
    )
}