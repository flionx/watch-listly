import copyToClipboard from "./copyToClipboard";

const shareLink = async (href: string) => {
  if (navigator.share) {
    try {
        await navigator.share({
            title: 'Watch Listly',
            text: 'Choose, watch, enjoy!',
            url: href,
        })
    } catch (error) {
        console.log('Error when trying to share:', error);
    }
    
  } else {
    copyToClipboard(href);
  }
}

export default shareLink