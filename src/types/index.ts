// Type definitions for the bookmark application

export interface BookmarkLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface Subdirectory {
  id: string;
  name: string;
  links: BookmarkLink[];
  isExpanded: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  links: BookmarkLink[];
  subdirectories: Subdirectory[];
}

export type FormMode = 'link' | 'folder' | 'category' | 'edit-link' | 'edit-category' | 'edit-folder';

export interface FormData {
  title: string;
  url: string;
  description: string;
  categoryId: string;
  subdirectoryId: string;
  // For editing - allow changing parent category/folder
  newCategoryId?: string;
  newSubdirectoryId?: string;
}

export interface CategoryFormData {
  name: string;
  icon: string;
  color: string;
  gradient: string;
  customColor: string;
}

export interface SubdirectoryFormData {
  name: string;
  categoryId: string;
  // For editing - allow changing parent category
  newCategoryId?: string;
}

export interface EditingLink {
  categoryId: string;
  subdirectoryId?: string;
  linkId: string;
}
