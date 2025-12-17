
export interface Article {
  id: number;
  name: string;
  tags: string[];
  url: string;
}

export interface FilterState {
  searchQuery: string;
  selectedTags: string[];
  page: number;
  itemsPerPage: number;
}
