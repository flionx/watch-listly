const copyToClipboard = async (value: string) => {
    try {
        await navigator.clipboard.writeText(value);
    } catch (error) {
        alert('Failed to copy :(')   
    }
}

export default copyToClipboard