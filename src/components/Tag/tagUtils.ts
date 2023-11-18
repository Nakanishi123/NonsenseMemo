const allColors: string[] = [
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
];

export function tag2Color(tag: string): string {
  const hash = [...tag].map(c => c.charCodeAt(0)).reduce((a, b) => a + b, 0);
  return allColors[hash % allColors.length];
}
