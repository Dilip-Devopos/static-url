import React from 'react';
import { Category, Subdirectory } from '../../types';
import LinkCard from '../LinkCard/LinkCard';
import FolderSection from '../FolderSection/FolderSection';

interface CategoryViewProps {
  category: Category;
  searchQuery: string;
  onAddLink: (categoryId: string, subdirectoryId?: string) => void;
  onEditLink: (categoryId: string, linkId: string, subdirectoryId?: string) => void;
  onDeleteLink: (categoryId: string, linkId: string, subdirectoryId?: string) => void;
  onEditFolder: (subdirectory: Subdirectory & { categoryId: string }) => void;
  onDeleteFolder: (subdirectoryId: string) => void;
  onToggleFolder: (subdirectoryId: string) => void;
  onLinkClick: (url: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  searchQuery,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onEditFolder,
  onDeleteFolder,
  onToggleFolder,
  onLinkClick
}) => {
  const filterLinks = (links: any[]) => {
    if (!searchQuery) return links;
    const searchLower = searchQuery.toLowerCase();
    return links.filter(link =>
      link.title.toLowerCase().includes(searchLower) ||
      link.description.toLowerCase().includes(searchLower)
    );
  };

  const filteredMainLinks = filterLinks(category.links);
  const filteredSubdirectories = category.subdirectories
    .map(subdir => ({
      ...subdir,
      links: filterLinks(subdir.links)
    }))
    .filter(subdir => 
      !searchQuery || 
      subdir.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subdir.links.length > 0
    );

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          {/* Main Category Links */}
          {filteredMainLinks.length > 0 && (
            <div className="mb-5">
              <h2 className="h3 fw-bold text-dark mb-4">Main Resources</h2>
              <div className="row g-4">
                {filteredMainLinks.map(link => (
                  <div key={link.id} className="col-12 col-md-6 col-lg-4">
                    <LinkCard
                      link={link}
                      onEdit={() => onEditLink(category.id, link.id)}
                      onDelete={() => onDeleteLink(category.id, link.id)}
                      onClick={() => onLinkClick(link.url)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

      {/* Subdirectories */}
      {filteredSubdirectories.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Folders</h2>
          {filteredSubdirectories.map(subdirectory => (
            <FolderSection
              key={subdirectory.id}
              subdirectory={subdirectory}
              categoryId={category.id}
              onToggle={() => onToggleFolder(subdirectory.id)}
              onEdit={onEditFolder}
              onDelete={onDeleteFolder}
              onAddLink={(categoryId, subdirectoryId) => onAddLink(categoryId, subdirectoryId)}
              onEditLink={(linkId) => onEditLink(category.id, linkId, subdirectory.id)}
              onDeleteLink={(linkId) => onDeleteLink(category.id, linkId, subdirectory.id)}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
          {filteredMainLinks.length === 0 && filteredSubdirectories.length === 0 && (
            <div className="text-center py-5">
              <div className="text-muted">
                {searchQuery ? 'No resources match your search in this category.' : 'No resources in this category yet.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
