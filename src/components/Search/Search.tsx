import { useEffect, useState } from "react";
import { URL_BASE } from "../../consts";
import { type Content } from "../../pages/content.json";

interface SearchedContent {
  title: string;
  matchTexts: string[];
  link: string;
  targetText: string;
}

function Search() {
  const contentJsonUrl = `${URL_BASE}/content.json`;
  const [contentList, setContentList] = useState<Content[]>([]);
  const [searchedContentList, setSearchedContentList] = useState<SearchedContent[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) return;
    const escaped = e.target.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?:.{0,15}(${escaped}).{0,15})+`, "gi");
    const searched = contentList
      .map(content => {
        const matches = [...content.content.matchAll(regex)];
        const matchTexts = matches.map(match => {
          return [...match[0].split(new RegExp(`(${match[1]})`, "gi")), "[...] "];
        });

        if (matches.length === 0) return;
        return {
          title: content.title,
          matchTexts: matchTexts.flat(),
          link: content.link,
          targetText: matches[0][1],
        };
      })
      .filter((content): content is SearchedContent => content !== undefined);
    setSearchedContentList(searched);
  };

  useEffect(() => {
    fetch(contentJsonUrl)
      .then(response => response.json())
      .then(data => {
        setContentList(data);
      });
  }, []);

  return (
    <div>
      <div className="relative my-4">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg className="h-4 w-4 text-gray-500 " fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          placeholder="Search..."
          onChange={onChange}
          required
        />
      </div>
      <div>
        <ul>
          {searchedContentList.map(searchedContent => (
            <li key={searchedContent.link} className="border-b px-2 pb-1 pt-2 hover:border-sky-400">
              <a href={searchedContent.link}>
                <h4 className="mb-0 text-xl font-bold">{searchedContent.title}</h4>
                <p className="mb-0 ml-2 line-clamp-2 text-sm text-gray-600">
                  {searchedContent.matchTexts.map((text, index) => {
                    if (text.toLowerCase() === searchedContent.targetText.toLowerCase()) {
                      return (
                        <span key={index} className="bg-yellow-400">
                          {text}
                        </span>
                      );
                    }
                    return text;
                  })}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
