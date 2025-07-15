import { Category, BookmarkLink, Subdirectory, FormMode, FormData, CategoryFormData, SubdirectoryFormData, EditingLink } from '../types';
import { generateId } from '../utils/helpers';
import { flushSync } from 'react-dom';

interface UseBookmarkHandlersProps {
  categories: Category[];
  setCategories: (categories: Category[] | ((prev: Category[]) => Category[])) => void;
  formMode: FormMode;
  editingItem: any;
  setEditingItem: (item: any) => void;
  editingLink: EditingLink | null;
  setEditingLink: (link: EditingLink | null) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  categoryFormData: CategoryFormData;
  setCategoryFormData: (data: CategoryFormData) => void;
  subdirectoryFormData: SubdirectoryFormData;
  setSubdirectoryFormData: (data: SubdirectoryFormData) => void;
  closeUnifiedForm: () => void;
  openUnifiedForm: (mode: FormMode, item?: any) => void;
}

export const useBookmarkHandlers = ({
  categories,
  setCategories,
  formMode,
  editingItem,
  setEditingItem,
  editingLink,
  setEditingLink,
  formData,
  setFormData,
  categoryFormData,
  setCategoryFormData,
  subdirectoryFormData,
  setSubdirectoryFormData,
  closeUnifiedForm,
  openUnifiedForm
}: UseBookmarkHandlersProps) => {

  // Category handlers
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryFormData.name) return;

    if (formMode === 'edit-category' && editingItem) {
      // Update existing category
      setCategories(prev => prev.map(category => 
        category.id === editingItem.id
          ? {
              ...category,
              name: categoryFormData.name,
              icon: categoryFormData.icon,
              color: categoryFormData.color,
              gradient: categoryFormData.customColor
            }
          : category
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: categoryFormData.name.toLowerCase().replace(/\s+/g, '-'),
        name: categoryFormData.name,
        icon: categoryFormData.icon,
        color: categoryFormData.color,
        gradient: categoryFormData.gradient,
        links: [],
        subdirectories: []
      };

      setCategories(prev => [...prev, newCategory]);
    }

    setCategoryFormData({ name: '', icon: 'Cloud', color: '#3b82f6', gradient: '#3b82f6', customColor: '#3b82f6' });
    closeUnifiedForm();
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete all its links and subdirectories.')) {
      setCategories(prev => prev.filter(category => category.id !== categoryId));
    }
  };

  // Subdirectory handlers
  const handleAddSubdirectory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subdirectoryFormData.name || !subdirectoryFormData.categoryId) return;

    // Add new folder
    const newSubdirectory: Subdirectory = {
      id: generateId(),
      name: subdirectoryFormData.name,
      links: [],
      isExpanded: false
    };

    setCategories(prev => prev.map(category =>
      category.id === subdirectoryFormData.categoryId
        ? { ...category, subdirectories: [...category.subdirectories, newSubdirectory] }
        : category
    ));

    // Close form first, then reset data
    closeUnifiedForm();
    setSubdirectoryFormData({ name: '', categoryId: selectedCategory || 'aws', newCategoryId: '' });
  };

  const handleDeleteSubdirectory = (categoryId: string, subdirectoryId: string) => {
    if (window.confirm('Are you sure you want to delete this subdirectory? This will also delete all its links.')) {
      setCategories(prev => prev.map(category => 
        category.id === categoryId
          ? { ...category, subdirectories: category.subdirectories.filter(subdir => subdir.id !== subdirectoryId) }
          : category
      ));
    }
  };

  // Link handlers
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.url || !formData.categoryId) return;

    const newLink: BookmarkLink = {
      id: generateId(),
      title: formData.title,
      url: formData.url,
      description: formData.description
    };

    setCategories(prev => prev.map(category => {
      if (category.id !== formData.categoryId) return category;

      if (formData.subdirectoryId) {
        // Add to subdirectory
        return {
          ...category,
          subdirectories: category.subdirectories.map(subdir =>
            subdir.id === formData.subdirectoryId
              ? { ...subdir, links: [...subdir.links, newLink] }
              : subdir
          )
        };
      } else {
        // Add to main category
        return { ...category, links: [...category.links, newLink] };
      }
    }));

    setFormData({ title: '', url: '', description: '', categoryId: 'aws', subdirectoryId: '' });
    closeUnifiedForm();
  };

  const handleEditLink = (categoryId: string, linkId: string, subdirectoryId?: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    let link: BookmarkLink | undefined;

    if (subdirectoryId) {
      const subdirectory = category.subdirectories.find(sub => sub.id === subdirectoryId);
      link = subdirectory?.links.find(l => l.id === linkId);
    } else {
      link = category.links.find(l => l.id === linkId);
    }

    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description,
        categoryId,
        subdirectoryId: subdirectoryId || '',
        // Reset the new location fields
        newCategoryId: '',
        newSubdirectoryId: ''
      });
      setEditingLink({ categoryId, linkId, subdirectoryId });
      openUnifiedForm('edit-link');
    }
  };

  const handleUpdateLink = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingLink || !formData.title || !formData.url) return;

    const { categoryId: oldCategoryId, linkId, subdirectoryId: oldSubdirectoryId } = editingLink;
    const newCategoryId = formData.newCategoryId || oldCategoryId;
    const newSubdirectoryId = formData.newSubdirectoryId || oldSubdirectoryId || '';

    const updatedLink: BookmarkLink = {
      id: linkId,
      title: formData.title,
      url: formData.url,
      description: formData.description
    };

    setCategories(prev => {
      let newCategories = [...prev];

      // Step 1: Remove link from old location
      newCategories = newCategories.map(category => {
        if (category.id !== oldCategoryId) return category;

        if (oldSubdirectoryId) {
          // Remove from old subdirectory
          return {
            ...category,
            subdirectories: category.subdirectories.map(subdir =>
              subdir.id === oldSubdirectoryId
                ? { ...subdir, links: subdir.links.filter(link => link.id !== linkId) }
                : subdir
            )
          };
        } else {
          // Remove from old category
          return {
            ...category,
            links: category.links.filter(link => link.id !== linkId)
          };
        }
      });

      // Step 2: Add link to new location
      newCategories = newCategories.map(category => {
        if (category.id !== newCategoryId) return category;

        if (newSubdirectoryId) {
          // Add to new subdirectory
          return {
            ...category,
            subdirectories: category.subdirectories.map(subdir =>
              subdir.id === newSubdirectoryId
                ? { ...subdir, links: [...subdir.links, updatedLink] }
                : subdir
            )
          };
        } else {
          // Add to new category
          return {
            ...category,
            links: [...category.links, updatedLink]
          };
        }
      });

      return newCategories;
    });

    setFormData({ title: '', url: '', description: '', categoryId: 'aws', subdirectoryId: '', newCategoryId: '', newSubdirectoryId: '' });
    closeUnifiedForm();
    setEditingLink(null);
  };

  const handleDeleteLink = (categoryId: string, linkId: string, subdirectoryId?: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      setCategories(prev => prev.map(category => {
        if (category.id !== categoryId) return category;

        if (subdirectoryId) {
          return {
            ...category,
            subdirectories: category.subdirectories.map(subdir =>
              subdir.id === subdirectoryId
                ? { ...subdir, links: subdir.links.filter(link => link.id !== linkId) }
                : subdir
            )
          };
        } else {
          return { ...category, links: category.links.filter(link => link.id !== linkId) };
        }
      }));
    }
  };

  const handleEditCategory = (category: Category) => {
    openUnifiedForm('edit-category', category);
  };

  const handleEditFolder = (folderWithCategory: Subdirectory & { categoryId: string }) => {
    setSubdirectoryFormData({
      name: folderWithCategory.name,
      categoryId: folderWithCategory.categoryId,
      newCategoryId: '' // Reset for editing
    });
    setEditingItem(folderWithCategory);
    openUnifiedForm('edit-folder', folderWithCategory);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem || !categoryFormData.name) return;

    setCategories(prev => prev.map(category =>
      category.id === editingItem.id
        ? {
            ...category,
            name: categoryFormData.name,
            icon: categoryFormData.icon,
            color: categoryFormData.customColor || categoryFormData.color,
            gradient: categoryFormData.customColor || categoryFormData.gradient
          }
        : category
    ));

    setCategoryFormData({ name: '', icon: 'Cloud', color: '#3b82f6', gradient: '#3b82f6', customColor: '#3b82f6' });
    setEditingItem(null);
    closeUnifiedForm();
  };

  const handleUpdateFolder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem || !subdirectoryFormData.name.trim()) {
      return;
    }

    const oldCategoryId = editingItem.categoryId;
    const newCategoryId = subdirectoryFormData.newCategoryId || oldCategoryId;
    const folderId = editingItem.id;

    setCategories(prev => {
      let newCategories = [...prev];

      // If moving to a different category
      if (oldCategoryId !== newCategoryId) {
        // Step 1: Remove folder from old category
        newCategories = newCategories.map(category => {
          if (category.id !== oldCategoryId) return category;
          return {
            ...category,
            subdirectories: category.subdirectories.filter(subdir => subdir.id !== folderId)
          };
        });

        // Step 2: Add folder to new category
        const folderToMove = editingItem;
        newCategories = newCategories.map(category => {
          if (category.id !== newCategoryId) return category;
          return {
            ...category,
            subdirectories: [...category.subdirectories, {
              ...folderToMove,
              name: subdirectoryFormData.name
            }]
          };
        });
      } else {
        // Just update the name in the same category
        newCategories = newCategories.map(category => {
          if (category.id !== oldCategoryId) return category;
          return {
            ...category,
            subdirectories: category.subdirectories.map(subdir =>
              subdir.id === folderId
                ? { ...subdir, name: subdirectoryFormData.name }
                : subdir
            )
          };
        });
      }

      return newCategories;
    });

    // Use flushSync to ensure state updates are applied immediately
    flushSync(() => {
      setSubdirectoryFormData({ name: '', categoryId: editingItem.categoryId || 'aws', newCategoryId: '' });
      setEditingItem(null);
    });

    // Close the modal immediately
    closeUnifiedForm();

    // Backup closure attempts to ensure modal closes
    setTimeout(() => closeUnifiedForm(), 100);
    setTimeout(() => closeUnifiedForm(), 300);
  };

  const handleAddLinkToFolder = (categoryId: string, subdirectoryId?: string) => {
    // Set form data with the specific category and subdirectory
    setFormData({
      title: '',
      url: '',
      description: '',
      categoryId: categoryId,
      subdirectoryId: subdirectoryId || '',
      newCategoryId: '',
      newSubdirectoryId: ''
    });
    openUnifiedForm('link');
  };

  return {
    handleAddCategory,
    handleEditCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleAddSubdirectory,
    handleEditFolder,
    handleUpdateFolder,
    handleDeleteSubdirectory,
    handleAddLink,
    handleAddLinkToFolder,
    handleEditLink,
    handleUpdateLink,
    handleDeleteLink
  };
};
