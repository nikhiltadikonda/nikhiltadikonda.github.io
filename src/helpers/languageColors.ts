/**
 * GitHub Linguist language colors — matches the colored dots on GitHub repos.
 * Source: https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
 */
export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Swift: '#F05138',
  TeX: '#3D6117',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Kotlin: '#A97BFF',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  R: '#198CE7',
  Lua: '#000080',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  'Jupyter Notebook': '#DA5B0B',
  Vue: '#41b883',
  SCSS: '#c6538c',
  YAML: '#cb171e',
  JSON: '#292929',
  Markdown: '#083fa1',
};

/** Default fallback color for unrecognized languages */
export const DEFAULT_LANGUAGE_COLOR = '#8b949e';

/**
 * Returns the GitHub-style color for a given language name.
 */
export const getLanguageColor = (language: string | null): string => {
  if (!language) return DEFAULT_LANGUAGE_COLOR;
  return GITHUB_LANGUAGE_COLORS[language] ?? DEFAULT_LANGUAGE_COLOR;
};

