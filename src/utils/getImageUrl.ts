function getImageUrl(path: string, size = 'w500') {
    if (!path) return '/placeholder-image.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
export default getImageUrl;