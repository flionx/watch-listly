const randomUserId = (): string => {
    return `${Date.now() + '' + (Math.random() * 1e5).toFixed()}`
}
export default randomUserId;