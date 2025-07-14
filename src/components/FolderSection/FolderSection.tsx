import React from 'react';
import { ChevronDown, ChevronRight, Folder, Edit, Trash2, Plus } from 'lucide-react';
import { Subdirectory } from '../../types';
import LinkCard from '../LinkCard/LinkCard';

interface FolderSectionProps {
  subdirectory: Subdirectory;
  categoryId: string;
  onToggle: () => void;
  onEdit: (subdirectory: Subdirectory & { categoryId: string }) => void;
  onDelete: (subdirectoryId: string) => void;
  onAddLink: (categoryId: string, subdirectoryId: string) => void;
  onEditLink: (linkId: string) => void;
  onDeleteLink: (linkId: string) => void;
  onLinkClick: (url: string) => void;
}

const FolderSection: React.FC<FolderSectionProps> = ({
  subdirectory,
  categoryId,
  onToggle,
  onEdit,
  onDelete,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onLinkClick
}) => {
  return (
    <div className="mb-8">
      {/* Folder Header */}
      <div className="group flex items-center justify-between mb-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:bg-gray-100/80 transition-colors">
        <button
          onClick={onToggle}
          className="flex items-center space-x-3 text-left flex-1 hover:text-blue-600 transition-colors"
        >
          {subdirectory.isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <Folder className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {subdirectory.name}
            </h3>
            <p className="text-sm text-gray-500">
              {subdirectory.links.length} resources
            </p>
          </div>
        </button>

        <div className="flex space-x-1 opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddLink(categoryId, subdirectory.id);
            }}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-105"
            title="Add link to this folder"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit({ ...subdirectory, categoryId });
            }}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105"
            title="Edit folder"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(subdirectory.id);
            }}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-105"
            title="Delete folder"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Folder Content */}
      {subdirectory.isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-8">
          {subdirectory.links.map(link => (
            <LinkCard
              key={link.id}
              link={link}
              onEdit={() => onEditLink(link.id)}
              onDelete={() => onDeleteLink(link.id)}
              onClick={() => onLinkClick(link.url)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderSection;
