import React, { memo, useMemo } from 'react';
import { Category } from '../../types';
import CategoryCard from '../CategoryCard/CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  searchQuery: string;
  onSelectCategory: (categoryId: string) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  searchQuery,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory
}) => {
  // Memoize filtered categories to prevent unnecessary filtering on every render
  // Time Complexity: O(n*m) where n is categories and m is average links per category
  // Space Complexity: O(k) where k is number of filtered categories
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    const searchLower = searchQuery.toLowerCase();
    return categories.filter(category => {
      const categoryMatches = category.name.toLowerCase().includes(searchLower);
      const linkMatches = category.links.some(link =>
        link.title.toLowerCase().includes(searchLower) ||
        link.description.toLowerCase().includes(searchLower)
      );
      const subdirMatches = category.subdirectories.some(subdir =>
        subdir.name.toLowerCase().includes(searchLower) ||
        subdir.links.some(link =>
          link.title.toLowerCase().includes(searchLower) ||
          link.description.toLowerCase().includes(searchLower)
        )
      );

      return categoryMatches || linkMatches || subdirMatches;
    });
  }, [categories, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats */}
      <div className="flex justify-end mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.subdirectories.length, 0)}
              </div>
              <div className="text-gray-600">Folders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, cat) => 
                  sum + cat.links.length + 
                  cat.subdirectories.reduce((subSum, subdir) => subSum + subdir.links.length, 0), 0
                )}
              </div>
              <div className="text-gray-600">Resources</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid - Responsive Bootstrap Grid */}
      <div className="row g-4">
        {filteredCategories.map(category => (
          <div key={category.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <CategoryCard
              category={category}
              onSelect={onSelectCategory}
              onEdit={onEditCategory}
              onDelete={onDeleteCategory}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            {searchQuery ? 'No categories match your search.' : 'No categories found.'}
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
// Time Complexity: O(1) for shallow comparison
// Space Complexity: O(1) additional memory for memoization
export default memo(CategoryGrid);
