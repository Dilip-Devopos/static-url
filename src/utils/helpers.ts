import { Category, Subdirectory } from '../types';

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 11);
};

export const handleLinkClick = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const getAvailableSubdirectories = (categoryId: string, categories: Category[]): Subdirectory[] => {
  const category = categories.find(cat => cat.id === categoryId);
  return category?.subdirectories || [];
};

export const toggleSubdirectory = (
  categories: Category[], 
  categoryId: string, 
  subdirectoryId: string
): Category[] => {
  return categories.map(category => 
    category.id === categoryId
      ? {
          ...category,
          subdirectories: category.subdirectories.map(subdir =>
            subdir.id === subdirectoryId
              ? { ...subdir, isExpanded: !subdir.isExpanded }
              : subdir
          )
        }
      : category
  );
};
