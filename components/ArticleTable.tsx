
import React from 'react';
import { Article } from '../types';
import { ExternalLink, Hash, Tag as TagIcon } from 'lucide-react';

interface ArticleTableProps {
  articles: Article[];
}

export const getTagColorClass = (tag: string) => {
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    'bg-sky-200 text-sky-900',       // Light Blue
    'bg-green-200 text-green-900',   // Light Green
    'bg-emerald-200 text-emerald-900', // Light Teal
    'bg-amber-100 text-amber-900',   // Light Yellow/Orange
    'bg-indigo-200 text-indigo-900', // Light Indigo
    'bg-purple-200 text-purple-900', // Light Purple
    'bg-rose-200 text-rose-900',     // Light Pink
    'bg-cyan-200 text-cyan-900',     // Light Cyan
  ];
  return colors[hash % colors.length];
};

const ArticleTable: React.FC<ArticleTableProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
        <p className="text-slate-400 text-lg">No articles found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800/30">
            <th className="px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-tight">
              <div className="flex items-center gap-2"><Hash size={14} /> Article Name</div>
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-tight">
              <div className="flex items-center gap-2"><TagIcon size={14} /> Tags</div>
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-tight text-center w-24">
              URL
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {articles.map((article) => (
            <tr key={article.id} className="group hover:bg-slate-800/40 transition-colors">
              <td className="px-6 py-5 text-slate-200">
                <span className="font-medium line-clamp-2">{article.name}</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-transform hover:scale-105 ${getTagColorClass(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-5 text-center">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-200"
                  title="Open in LinkedIn"
                >
                  <ExternalLink size={18} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
