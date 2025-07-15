import React, { useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { handleLinkClick } from './utils/helpers';
import { useBookmarks } from './hooks/useBookmarks';
import { useBookmarkHandlers } from './hooks/useBookmarkHandlers';
import Header from './components/Header/Header';
import CategoryGrid from './components/CategoryGrid/CategoryGrid';
import CategoryView from './components/CategoryView/CategoryView';
import UnifiedForm from './components/UnifiedForm/UnifiedForm';

const App: React.FC = () => {
  // Use custom hooks for state management
  const bookmarkState = useBookmarks();
  const handlers = useBookmarkHandlers(bookmarkState);

  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showUnifiedForm,
    formMode,
    editingItem,
    editingLink,
    formData,
    setFormData,
    categoryFormData,
    setCategoryFormData,
    subdirectoryFormData,
    setSubdirectoryFormData,
    openUnifiedForm,
    closeUnifiedForm,
    switchFormMode,
    handleCustomColorChange,
    getAvailableSubdirectories,
    toggleSubdirectory,
    handleResetAllBookmarks
  } = bookmarkState;

  const {
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
  } = handlers;

  // Memoize selected category data to prevent unnecessary recalculations
  // Time Complexity: O(n) where n is number of categories, but only when selectedCategory changes
  // Space Complexity: O(1) additional memory for memoization
  const selectedCategoryData = useMemo(() =>
    selectedCategory ? categories.find(cat => cat.id === selectedCategory) : null,
    [selectedCategory, categories]
  );

  // Memoize form submission handler to prevent unnecessary re-renders
  // Time Complexity: O(1) for handler execution
  // Space Complexity: O(1) additional memory for memoization
  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    if (formMode === 'link') {
      if (editingLink) {
        handleUpdateLink(e);
      } else {
        handleAddLink(e);
      }
    } else if (formMode === 'edit-link') {
      handleUpdateLink(e);
    } else if (formMode === 'folder') {
      handleAddSubdirectory(e);
    } else if (formMode === 'edit-folder') {
      handleUpdateFolder(e);
    } else if (formMode === 'category') {
      handleAddCategory(e);
    } else if (formMode === 'edit-category') {
      handleUpdateCategory(e);
    }
  }, [
    formMode, editingLink, handleUpdateLink, handleAddLink,
    handleAddSubdirectory, handleUpdateFolder, handleAddCategory, handleUpdateCategory
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-fluid px-0">
        {/* Header */}
        <Header
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
          openUnifiedForm={openUnifiedForm}
          onResetAllBookmarks={handleResetAllBookmarks}
          selectedCategoryData={selectedCategoryData}
          categories={categories}
        />

        {/* Main Content */}
        <main className="relative">
        {selectedCategory ? (
          selectedCategoryData && (
            <CategoryView
              category={selectedCategoryData}
              searchQuery={searchQuery}
              onAddLink={handleAddLinkToFolder}
              onEditLink={handleEditLink}
              onDeleteLink={handleDeleteLink}
              onEditFolder={handleEditFolder}
              onDeleteFolder={(folderId) => handleDeleteSubdirectory(selectedCategory, folderId)}
              onToggleFolder={(folderId) => toggleSubdirectory(selectedCategory, folderId)}
              onLinkClick={handleLinkClick}
            />
          )
        ) : (
          <CategoryGrid
            categories={categories}
            searchQuery={searchQuery}
            onSelectCategory={setSelectedCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {/* Floating Navigation Arrows */}
        <div className="fixed top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-50 hidden md:flex" style={{ right: '16px' }}>
          {selectedCategory ? (
            <>
              {/* Back to Categories */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                title="Back to categories"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Next Category */}
              {(() => {
                const currentIndex = categories.findIndex(cat => cat.id === selectedCategory);
                const nextIndex = (currentIndex + 1) % categories.length;
                const nextCategory = categories[nextIndex];

                return nextCategory && nextCategory.id !== selectedCategory ? (
                  <button
                    onClick={() => setSelectedCategory(nextCategory.id)}
                    className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                    title={`Next: ${nextCategory.name}`}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                ) : null;
              })()}
            </>
          ) : (
            /* When on main grid, show arrow to enter first category */
            categories.length > 0 && (
              <button
                onClick={() => setSelectedCategory(categories[0].id)}
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                title={`Enter: ${categories[0].name}`}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )
          )}
        </div>

        {/* Mobile Navigation - Bottom */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50 md:hidden">
          {selectedCategory ? (
            <>
              {/* Back to Categories */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                title="Back to categories"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Next Category */}
              {(() => {
                const currentIndex = categories.findIndex(cat => cat.id === selectedCategory);
                const nextIndex = (currentIndex + 1) % categories.length;
                const nextCategory = categories[nextIndex];

                return nextCategory && nextCategory.id !== selectedCategory ? (
                  <button
                    onClick={() => setSelectedCategory(nextCategory.id)}
                    className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                    title={`Next: ${nextCategory.name}`}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                ) : null;
              })()}
            </>
          ) : (
            /* When on main grid, show arrow to enter first category */
            categories.length > 0 && (
              <button
                onClick={() => setSelectedCategory(categories[0].id)}
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-full p-3 transition-all duration-300 transform hover:scale-110"
                title={`Enter: ${categories[0].name}`}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )
          )}
        </div>
      </main>

      {/* Unified Form Modal */}
      <UnifiedForm
        isOpen={showUnifiedForm}
        formMode={formMode}
        editingItem={editingItem}
        editingLink={editingLink}
        formData={formData}
        categoryFormData={categoryFormData}
        subdirectoryFormData={subdirectoryFormData}
        categories={categories}
        onClose={closeUnifiedForm}
        onSwitchMode={switchFormMode}
        onSubmit={handleFormSubmit}
        onFormDataChange={(data) => setFormData({ ...formData, ...data })}
        onCategoryFormDataChange={(data) => setCategoryFormData({ ...categoryFormData, ...data })}
        onSubdirectoryFormDataChange={(data) => setSubdirectoryFormData({ ...subdirectoryFormData, ...data })}
        onCustomColorChange={handleCustomColorChange}
        getAvailableSubdirectories={getAvailableSubdirectories}
      />
      </div>
    </div>
  );
};

export default App;   