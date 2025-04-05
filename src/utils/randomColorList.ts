let lastColor = 0;

const randomColorList = (): string => {
    lastColor = (lastColor + 120 + Math.random() * 60) % 360;
    return `hsl(${lastColor}, 85%, 30%)`;
};

export default randomColorList;