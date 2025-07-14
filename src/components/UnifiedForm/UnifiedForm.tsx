import React from 'react';
import { X, ExternalLink, Folder, Plus } from 'lucide-react';
import { FormMode, FormData, CategoryFormData, SubdirectoryFormData, Category, EditingLink } from '../../types';
import LinkForm from './forms/LinkForm';
import FolderForm from './forms/FolderForm';
import CategoryForm from './forms/CategoryForm';

interface UnifiedFormProps {
  isOpen: boolean;
  formMode: FormMode;
  editingItem: any;
  editingLink: EditingLink | null;
  formData: FormData;
  categoryFormData: CategoryFormData;
  subdirectoryFormData: SubdirectoryFormData;
  categories: Category[];
  onClose: () => void;
  onSwitchMode: (mode: 'link' | 'folder' | 'category') => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: Partial<FormData>) => void;
  onCategoryFormDataChange: (data: Partial<CategoryFormData>) => void;
  onSubdirectoryFormDataChange: (data: Partial<SubdirectoryFormData>) => void;
  onCustomColorChange: (color: string) => void;
  getAvailableSubdirectories: (categoryId: string) => any[];
}

const UnifiedForm: React.FC<UnifiedFormProps> = ({
  isOpen,
  formMode,
  editingItem,
  editingLink,
  formData,
  categoryFormData,
  subdirectoryFormData,
  categories,
  onClose,
  onSwitchMode,
  onSubmit,
  onFormDataChange,
  onCategoryFormDataChange,
  onSubdirectoryFormDataChange,
  onCustomColorChange,
  getAvailableSubdirectories
}) => {
  if (!isOpen) return null;

  const getFormTitle = () => {
    if (formMode === 'edit-link') return 'Edit Link';
    if (formMode === 'edit-category') return 'Edit Category';
    if (formMode === 'edit-folder') return 'Edit Folder';
    return 'Add New Item';
  };

  const getSubmitButtonText = () => {
    if (formMode === 'link') return editingLink ? 'Update Link' : 'Add Link';
    if (formMode === 'edit-link') return 'Update Link';
    if (formMode === 'folder') return 'Add Folder';
    if (formMode === 'category') return 'Add Category';
    if (formMode === 'edit-category') return 'Update Category';
    if (formMode === 'edit-folder') return 'Update Folder';
    return 'Save';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {getFormTitle()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Tabs - Only show for non-edit modes */}
        {!formMode.startsWith('edit-') && (
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => onSwitchMode('link')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                formMode === 'link'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Link</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('folder')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                formMode === 'folder'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Folder className="w-4 h-4" />
                <span>Folder</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('category')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                formMode === 'category'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Category</span>
              </div>
            </button>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {/* Link Form Fields */}
          {(formMode === 'link' || formMode === 'edit-link') && (
            <LinkForm
              formData={formData}
              categories={categories}
              onChange={onFormDataChange}
              getAvailableSubdirectories={getAvailableSubdirectories}
              isEditing={formMode === 'edit-link'}
            />
          )}

          {/* Folder Form Fields */}
          {(formMode === 'folder' || formMode === 'edit-folder') && (
            <FolderForm
              formData={subdirectoryFormData}
              categories={categories}
              onChange={onSubdirectoryFormDataChange}
              isEditing={formMode === 'edit-folder'}
            />
          )}

          {/* Category Form Fields */}
          {(formMode === 'category' || formMode === 'edit-category') && (
            <CategoryForm
              formData={categoryFormData}
              onChange={onCategoryFormDataChange}
              onCustomColorChange={onCustomColorChange}
            />
          )}

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {getSubmitButtonText()}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnifiedForm;
