import { useState, useEffect, useCallback, useMemo } from 'react';
import { Category, BookmarkLink, Subdirectory, FormMode, FormData, CategoryFormData, SubdirectoryFormData, EditingLink } from '../types';
import { loadCategories, saveCategories, resetToDefaults } from '../utils/storage';
import { generateId, getAvailableSubdirectories, toggleSubdirectory } from '../utils/helpers';

export const useBookmarks = () => {
  // State
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state
  const [showUnifiedForm, setShowUnifiedForm] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('link');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingLink, setEditingLink] = useState<EditingLink | null>(null);
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    url: '',
    description: '',
    categoryId: 'aws',
    subdirectoryId: ''
  });
  
  const [categoryFormData, setCategoryFormData] = useState<CategoryFormData>({
    name: '',
    icon: 'Cloud',
    color: '#3b82f6',
    gradient: '#3b82f6',
    customColor: '#3b82f6'
  });
  
  const [subdirectoryFormData, setSubdirectoryFormData] = useState<SubdirectoryFormData>({
    name: '',
    categoryId: 'aws',
    newCategoryId: ''
  });

  // Load categories on mount
  useEffect(() => {
    const loadedCategories = loadCategories();
    setCategories(loadedCategories);
  }, []);

  // Save categories when they change
  useEffect(() => {
    if (categories.length > 0) {
      saveCategories(categories);
    }
  }, [categories]);

  // Memoized form management functions for better performance
  // Time Complexity: O(1) for each function call
  // Space Complexity: O(1) additional memory for memoization
  const openUnifiedForm = useCallback((mode: FormMode, item?: any) => {
    setFormMode(mode);
    setEditingItem(item || null);
    setShowUnifiedForm(true);
    
    // Reset forms based on mode
    if (mode === 'link') {
      setFormData({ title: '', url: '', description: '', categoryId: selectedCategory || 'aws', subdirectoryId: '' });
    } else if (mode === 'folder') {
      setSubdirectoryFormData({ name: '', categoryId: selectedCategory || 'aws', newCategoryId: '' });
    } else if (mode === 'category') {
      setCategoryFormData({ name: '', icon: 'Cloud', color: '#3b82f6', gradient: '#3b82f6', customColor: '#3b82f6' });
    } else if (mode === 'edit-category' && item) {
      setCategoryFormData({
        name: item.name,
        icon: item.icon,
        color: item.color,
        gradient: item.gradient,
        customColor: item.color || '#3b82f6'
      });
    } else if (mode === 'edit-folder' && item) {
      setSubdirectoryFormData({
        name: item.name,
        categoryId: item.categoryId || selectedCategory || 'aws',
        newCategoryId: ''
      });
    }
  }, [selectedCategory]);

  const closeUnifiedForm = useCallback(() => {
    setShowUnifiedForm(false);
    setFormMode('link');
    setEditingItem(null);
    setFormData({ title: '', url: '', description: '', categoryId: selectedCategory || 'aws', subdirectoryId: '' });
    setSubdirectoryFormData({ name: '', categoryId: selectedCategory || 'aws', newCategoryId: '' });
    setCategoryFormData({ name: '', icon: 'Cloud', color: '#3b82f6', gradient: '#3b82f6', customColor: '#3b82f6' });
  }, [selectedCategory]);

  const switchFormMode = (newMode: 'link' | 'folder' | 'category') => {
    setFormMode(newMode);
    
    // Reset forms when switching tabs
    if (newMode === 'link') {
      setFormData({ title: '', url: '', description: '', categoryId: selectedCategory || 'aws', subdirectoryId: '' });
    } else if (newMode === 'folder') {
      setSubdirectoryFormData({ name: '', categoryId: selectedCategory || 'aws', newCategoryId: '' });
    } else if (newMode === 'category') {
      setCategoryFormData({ name: '', icon: 'Cloud', color: '#3b82f6', gradient: '#3b82f6', customColor: '#3b82f6' });
    }
  };

  // Custom color handler
  const handleCustomColorChange = (hexColor: string) => {
    setCategoryFormData({
      ...categoryFormData,
      customColor: hexColor,
      color: hexColor,
      gradient: hexColor
    });
  };

  // Reset all bookmarks with confirmation
  const handleResetAllBookmarks = () => {
    const userInput = window.prompt(
      'This will permanently delete ALL your bookmarks and reset to default data.\n\n' +
      'Type "confirm" (without quotes) to proceed:'
    );

    if (userInput === 'confirm') {
      try {
        // Clear all localStorage data
        localStorage.clear();

        // Reset to default categories
        const defaultCategories = resetToDefaults();
        setCategories(defaultCategories);
        setSelectedCategory(null);

        // Show success message
        alert('All bookmarks have been reset to default successfully!');

        // Optional: Reload page to ensure clean state
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } catch (error) {
        console.error('Error resetting bookmarks:', error);
        alert('An error occurred while resetting bookmarks. Please try again.');
      }
    } else if (userInput !== null) {
      // User typed something other than "confirm"
      alert('Reset cancelled. You must type "confirm" exactly to proceed.');
    }
    // If userInput is null, user clicked Cancel - do nothing
  };

  return {
    // State
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    
    // Form state
    showUnifiedForm,
    formMode,
    editingItem,
    setEditingItem,
    editingLink,
    setEditingLink,
    
    // Form data
    formData,
    setFormData,
    categoryFormData,
    setCategoryFormData,
    subdirectoryFormData,
    setSubdirectoryFormData,
    
    // Form management
    openUnifiedForm,
    closeUnifiedForm,
    switchFormMode,
    handleCustomColorChange,
    
    // Utilities
    getAvailableSubdirectories: (categoryId: string) => getAvailableSubdirectories(categoryId, categories),
    toggleSubdirectory: (categoryId: string, subdirectoryId: string) => {
      setCategories(prev => toggleSubdirectory(prev, categoryId, subdirectoryId));
    },
    handleResetAllBookmarks
  };
};
