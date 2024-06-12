export const validateConcentrationLevel = (level: string) => {
    const levelNumber = parseFloat(level);
    return levelNumber >= 0 && levelNumber <= 10;
}