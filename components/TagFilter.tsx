
import React from 'react';
import { getTagColorClass } from './ArticleTable';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ allTags, selectedTags, onToggleTag, onClear }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button 
            onClick={onClear}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {allTags.sort().map(tag => {
          const isSelected = selectedTags.includes(tag);
          const colorClass = getTagColorClass(tag);
          
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                isSelected 
                  ? `${colorClass} border-transparent ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 shadow-lg` 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagFilter;
