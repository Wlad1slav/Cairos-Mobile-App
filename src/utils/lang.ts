export function replaceStringPlaceholders(template: string, ...replacements: string[]): string {
    let result = template;
    replacements.forEach(replacement => {
        result = result.replace('%s', replacement);
    });
    return result;
}