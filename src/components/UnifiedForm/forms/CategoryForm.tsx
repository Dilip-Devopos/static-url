import React from 'react';
import { Cloud } from 'lucide-react';
import { CategoryFormData } from '../../../types';
import { iconOptions, iconMap } from '../../../constants/icons';

interface CategoryFormProps {
  formData: CategoryFormData;
  onChange: (data: Partial<CategoryFormData>) => void;
  onCustomColorChange: (color: string) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  formData,
  onChange,
  onCustomColorChange
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter category name"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Icon
        </label>
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
            style={{
              background: `linear-gradient(135deg, ${formData.color || '#3b82f6'}, ${formData.color || '#3b82f6'}CC)`
            }}
          >
            {(() => {
              const IconComponent = iconMap[formData.icon] || Cloud;
              return <IconComponent className="w-6 h-6 text-white" />;
            })()}
          </div>
          <select
            value={formData.icon}
            onChange={(e) => onChange({ icon: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {iconOptions.map(iconName => (
              <option key={iconName} value={iconName}>
                {iconName}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Theme
        </label>

        {/* Custom Color Picker */}
        <div>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={formData.customColor}
              onChange={(e) => onCustomColorChange(e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              title="Choose custom color"
            />
            <div className="flex-1">
              <input
                type="text"
                value={formData.customColor}
                onChange={(e) => onCustomColorChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#3b82f6"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Click the color box or enter a hex color code</p>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
