const allColors: string[] = ["primary"];

export function tag2Color(tag: string): string {
  const hash = [...tag].map(c => c.charCodeAt(0)).reduce((a, b) => a + b, 0);
  return allColors[hash % allColors.length];
}
