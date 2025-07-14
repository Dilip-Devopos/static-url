import { Category } from '../types';
import { defaultCategories } from '../constants/defaultData';

const STORAGE_KEY = 'techBookmarks';

export const loadCategories = (): Category[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Validate and fix the data structure
      const fixedData = parsedData.map((category: any) => ({
        ...category,
        // Fix gradient format if it's still using CSS classes
        gradient: category.gradient && category.gradient.startsWith('from-')
          ? category.color || '#3b82f6'
          : category.gradient || category.color || '#3b82f6',
        color: category.color || '#3b82f6',
        links: Array.isArray(category.links) ? category.links : [],
        subdirectories: Array.isArray(category.subdirectories)
          ? category.subdirectories.map((subdir: any) => ({
              ...subdir,
              links: Array.isArray(subdir.links) ? subdir.links : []
            }))
          : []
      }));
      return fixedData;
    }
    return defaultCategories;
  } catch (error) {
    console.error('Error loading categories from localStorage:', error);
    return defaultCategories;
  }
};

export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories to localStorage:', error);
  }
};

export const resetToDefaults = (): Category[] => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return defaultCategories;
  } catch (error) {
    console.error('Error resetting to defaults:', error);
    return defaultCategories;
  }
};
