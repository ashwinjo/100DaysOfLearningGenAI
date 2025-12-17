
import React, { useState, useMemo, useEffect } from 'react';
import { ARTICLES_DATA } from './data/articles';
import { FilterState } from './types';
import ArticleTable from './components/ArticleTable';
import TagFilter from './components/TagFilter';
import { Search, BrainCircuit, Sparkles, LayoutGrid, Linkedin, Github, Mail, Terminal, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Omit<FilterState, 'page' | 'itemsPerPage'>>({
    searchQuery: '',
    selectedTags: [],
  });

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    ARTICLES_DATA.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filtering Logic
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter(article => {
      const matchesSearch = article.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesTags = filters.selectedTags.length === 0 || 
        filters.selectedTags.some(tag => article.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [filters.searchQuery, filters.selectedTags]);

  const handleToggleTag = (tag: string) => {
    setFilters(prev => {
      const selectedTags = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];
      return { ...prev, selectedTags };
    });
  };

  const handleClearTags = () => {
    setFilters(prev => ({ ...prev, selectedTags: [] }));
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      <header className="container mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                <BrainCircuit size={28} />
              </span>
              <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest">The 2025 Journey</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              100 Days of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Learning GenAI</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
              I believe the best way to learn is to learn in public. This hub documents my curious exploration into GenAI—100 days of building, breaking, and sharing knowledge with the community as I navigate the rapidly evolving AI landscape.
            </p>
            
            {/* Contact Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/ashjoresume/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500 transition-all group"
              >
                <Linkedin size={18} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">LinkedIn</span>
              </a>
              <a 
                href="https://github.com/ashwinjo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500 transition-all group"
              >
                <Github size={18} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">GitHub</span>
              </a>
              <a 
                href="mailto:ashwinjosh@gmail.com" 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500 transition-all group"
              >
                <Mail size={18} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">Email</span>
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl">
                <div className="text-indigo-400 mb-2"><Sparkles size={24} /></div>
                <div className="text-3xl font-bold text-white tracking-tighter">100</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Articles</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl">
                <div className="text-cyan-400 mb-2"><LayoutGrid size={24} /></div>
                <div className="text-3xl font-bold text-white tracking-tighter">{allTags.length}</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Search size={14} className="text-indigo-400" /> Search Content
              </h3>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  placeholder="Find a specific topic..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="block w-full pl-14 pr-6 py-5 bg-slate-800/50 border border-slate-700 text-white rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-500 text-xl"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <TagFilter 
                allTags={allTags} 
                selectedTags={filters.selectedTags} 
                onToggleTag={handleToggleTag} 
                onClear={handleClearTags}
              />
            </div>
          </div>
        </div>

        {/* Status indicator for all articles */}
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="text-sm font-medium text-slate-400">
            Showing <span className="text-indigo-400 font-bold px-1">{filteredArticles.length}</span> articles matching your curiosity
          </div>
        </div>

        {/* Main Content: Table */}
        <div className="relative group mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <ArticleTable articles={filteredArticles} />
        </div>

        {/* Professional Overview Section (Terminal Style) */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
              <div className="flex items-center gap-2 ml-4 text-[10px] font-mono-terminal text-slate-500 uppercase tracking-widest">
                <Terminal size={12} />
                ashwinjosh-profile --overview
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-8 font-mono-terminal">
              <h2 className="text-green-400 text-2xl font-bold mb-6 flex items-center gap-3">
                Professional Overview
              </h2>
              
              <div className="text-slate-300 text-lg leading-relaxed mb-8">
                I am a seasoned <span className="text-green-400 font-bold">Network Automation and Solutions Engineer</span> with over a decade of experience building intelligent, scalable automation systems across enterprise and cloud environments. My career spans:
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Software Development',
                  'DevOps',
                  'Network Testing',
                  'Cloud-Native Architectures'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform"></div>
                    <span className="text-slate-400 text-lg group-hover:text-green-300 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 pt-6 border-t border-slate-900 flex items-center gap-2 text-slate-600">
                <ChevronRight size={16} className="text-green-500 animate-pulse" />
                <span className="text-sm">Ready to build the next generation of AI-native systems...</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <footer className="container mx-auto px-6 pt-16 mt-16 border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white">AJ</div>
            <div className="text-left">
              <div className="text-white font-bold">Ashwin Josh</div>
              <div className="text-slate-500 text-xs tracking-wide">GenAI Explorer & Learner</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/ashjoresume/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/ashwinjo" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="mailto:ashwinjosh@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="text-center py-6 border-t border-slate-800/50">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1.5">
            Crafted for the GenAI community <span className="text-slate-700">&bull;</span> 2025 Journey <span className="text-slate-700">&bull;</span> Built to inspire
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
