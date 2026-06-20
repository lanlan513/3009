export type Category = 'bacteria' | 'fungi' | 'virus' | 'archaea';

export interface Microbe {
  id: number;
  name: string;
  scientificName: string;
  category: Category;
  habitat: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MicrobeQuery {
  category?: Category;
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const CategoryLabels: Record<Category, string> = {
  bacteria: '细菌',
  fungi: '真菌',
  virus: '病毒',
  archaea: '古菌',
};

export const CategoryColors: Record<Category, string> = {
  bacteria: '#F87171',
  fungi: '#FBBF24',
  virus: '#A78BFA',
  archaea: '#22D3EE',
};
