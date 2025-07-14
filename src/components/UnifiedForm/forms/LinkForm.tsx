import React from 'react';
import { FormData, Category } from '../../../types';

interface LinkFormProps {
  formData: FormData;
  categories: Category[];
  onChange: (data: Partial<FormData>) => void;
  getAvailableSubdirectories: (categoryId: string) => any[];
  isEditing?: boolean;
}

const LinkForm: React.FC<LinkFormProps> = ({
  formData,
  categories,
  onChange,
  getAvailableSubdirectories,
  isEditing = false
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter link title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL *
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => onChange({ url: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the resource"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category * {isEditing && <span className="text-sm text-gray-500">(Change parent category)</span>}
        </label>
        <select
          value={isEditing ? (formData.newCategoryId || formData.categoryId) : formData.categoryId}
          onChange={(e) => onChange(isEditing ? {
            newCategoryId: e.target.value,
            newSubdirectoryId: '' // Reset subdirectory when category changes
          } : {
            categoryId: e.target.value,
            subdirectoryId: '' // Reset subdirectory when category changes
          })}
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
          Subdirectory (Optional) {isEditing && <span className="text-sm text-gray-500">(Change folder)</span>}
        </label>
        <select
          value={isEditing ? (formData.newSubdirectoryId || formData.subdirectoryId) : formData.subdirectoryId}
          onChange={(e) => onChange(isEditing ? { newSubdirectoryId: e.target.value } : { subdirectoryId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a subdirectory (optional)</option>
          {getAvailableSubdirectories(isEditing ? (formData.newCategoryId || formData.categoryId) : formData.categoryId).map(subdir => (
            <option key={subdir.id} value={subdir.id}>
              {subdir.name}
            </option>
          ))}
        </select>
        {isEditing && formData.subdirectoryId && (
          <p className="text-xs text-gray-500 mt-1">
            Current: {getAvailableSubdirectories(formData.categoryId).find(s => s.id === formData.subdirectoryId)?.name || 'Unknown'}
          </p>
        )}
      </div>
    </>
  );
};

export default LinkForm;
