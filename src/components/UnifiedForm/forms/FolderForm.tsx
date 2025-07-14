import React from 'react';
import { SubdirectoryFormData, Category } from '../../../types';

interface FolderFormProps {
  formData: SubdirectoryFormData;
  categories: Category[];
  onChange: (data: Partial<SubdirectoryFormData>) => void;
  isEditing?: boolean;
}

const FolderForm: React.FC<FolderFormProps> = ({
  formData,
  categories,
  onChange,
  isEditing = false
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Parent Category * {isEditing && <span className="text-sm text-gray-500">(Change parent category)</span>}
        </label>
        <select
          value={isEditing ? (formData.newCategoryId || formData.categoryId) : formData.categoryId}
          onChange={(e) => onChange(isEditing ? { newCategoryId: e.target.value } : { categoryId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {isEditing && (
          <p className="text-xs text-gray-500 mt-1">
            Current: {categories.find(c => c.id === formData.categoryId)?.name || 'Unknown'}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Folder Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter folder name (e.g., EC2, S3, Lambda)"
          required
        />
      </div>
    </>
  );
};

export default FolderForm;
