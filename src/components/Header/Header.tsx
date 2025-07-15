import React from 'react';
import { Search, ArrowLeft, Home, Trash2, Plus, FileText } from 'lucide-react';
import { exportAllLinksToPDF } from '../../utils/pdfExport';
import { Category } from '../../types';

interface HeaderProps {
  selectedCategory: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  openUnifiedForm: (mode: 'link' | 'folder' | 'category') => void;
  onResetAllBookmarks: () => void;
  selectedCategoryData?: { name: string } | null;
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  openUnifiedForm,
  onResetAllBookmarks,
  selectedCategoryData,
  categories
}) => {
  const handleExportToPDF = () => {
    exportAllLinksToPDF(categories, {
      includeDescriptions: true,
      includeCategories: true,
      includeFolders: true,
      sortOrder: 'original'
    });
  };
  return (
    <header className="bg-white shadow-sm border-bottom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between py-3">
          <div className="flex items-center space-x-6">
            {/* Logo/Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  DevOps Hub
                </h1>
                <p className="text-sm text-gray-600">Your centralized resource center</p>
              </div>
            </div>

            {/* Breadcrumb */}
            {selectedCategory && (
              <div className="flex items-center space-x-2 text-sm">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Categories</span>
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">
                  {selectedCategoryData?.name}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 w-64 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex align-items-center">
              <button
                onClick={() => openUnifiedForm('link')}
                className="btn btn-primary btn-sm me-2 d-flex align-items-center"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Plus className="w-3 h-3 me-1" />
                <span>Add New</span>
              </button>

              <button
                onClick={handleExportToPDF}
                className="btn btn-success btn-sm me-2 d-flex align-items-center"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
                title="Export all links to PDF"
              >
                <FileText className="w-3 h-3 me-1" />
                <span>Export PDF</span>
              </button>

              <button
                onClick={onResetAllBookmarks}
                className="btn btn-outline-danger btn-sm d-flex align-items-center"
                style={{
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                title="Reset all bookmarks to default"
              >
                <Trash2 className="w-3 h-3 me-1" />
                <span>Reset All</span>
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
