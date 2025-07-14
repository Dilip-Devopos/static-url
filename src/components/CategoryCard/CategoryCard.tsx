import React, { memo } from 'react';
import { Edit, Trash2, Cloud } from 'lucide-react';
import { Category } from '../../types';
import { iconMap } from '../../constants/icons';

interface CategoryCardProps {
  category: Category;
  onSelect: (categoryId: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelect,
  onEdit,
  onDelete
}) => {
  // Get the icon component from the icon map
  const IconComponent = iconMap[category.icon] || Cloud;
  const totalLinks = category.links.length +
    category.subdirectories.reduce((sum, subdir) => sum + subdir.links.length, 0);

  return (
    <div
      onClick={() => onSelect(category.id)}
      className="card h-100 shadow border-0 position-relative"
      style={{
        background: `linear-gradient(135deg, ${category.gradient || category.color}15, ${category.gradient || category.color}05)`,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fallback for Edge
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minHeight: '220px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        // Show action buttons fully
        const buttons = e.currentTarget.querySelector('.action-buttons');
        if (buttons) (buttons as HTMLElement).style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        // Return action buttons to subtle visibility
        const buttons = e.currentTarget.querySelector('.action-buttons');
        if (buttons) (buttons as HTMLElement).style.opacity = '0.7';
      }}
    >
      <div className="card-body p-4 d-flex flex-column">
        {/* Action Buttons */}
        <div className="action-buttons position-absolute top-0 end-0 p-2" style={{opacity: 0.7, transition: 'opacity 0.2s', zIndex: 10}}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(category);
            }}
            className="btn btn-sm btn-outline-secondary me-1"
            title="Edit category"
            style={{border: 'none', background: 'rgba(255,255,255,0.8)'}}
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(category.id);
            }}
            className="btn btn-sm btn-outline-danger"
            title="Delete category"
            style={{border: 'none', background: 'rgba(255,255,255,0.8)'}}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${category.gradient || category.color}, ${category.gradient || category.color}CC)`,
          backgroundColor: category.gradient || category.color || '#3b82f6' // Fallback for Edge
        }}
      >
        <IconComponent className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          {category.name}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{totalLinks} resources</span>
          <span>{category.subdirectories.length} folders</span>
        </div>
      </div>

      {/* Hover Effect */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
          style={{
            background: `linear-gradient(135deg, ${category.gradient || category.color}, ${category.gradient || category.color})`,
            borderRadius: '0.375rem',
            transition: 'opacity 0.3s'
          }}
        />
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
// Time Complexity: O(1) for shallow comparison
// Space Complexity: O(1) additional memory for memoization
export default memo(CategoryCard);
