export interface ILink {
    path: string,
    text: string
}

export const mainSidebarLinks: ILink[] = [
    {
        path: '/',
        text: 'Home'
    },
    {
        path: '/library',
        text: 'Library'
    },
    {
        path: '/friends',
        text: 'Friends'
    },
] 