import React, { memo, useCallback } from 'react';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { BookmarkLink } from '../../types';

interface LinkCardProps {
  link: BookmarkLink;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const LinkCard: React.FC<LinkCardProps> = ({
  link,
  onEdit,
  onDelete,
  onClick
}) => {
  // Memoize click handlers to prevent child re-renders
  // Time Complexity: O(1) for each handler
  const handleEdit = useCallback(() => onEdit(), [onEdit]);
  const handleDelete = useCallback(() => onDelete(), [onDelete]);
  const handleClick = useCallback(() => onClick(), [onClick]);
  return (
    <div className="card h-100 shadow border-0 position-relative"
         style={{
           transition: 'all 0.3s ease',
           minHeight: '160px'
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.transform = 'translateY(-3px)';
           e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
           const buttons = e.currentTarget.querySelector('.action-buttons');
           if (buttons) (buttons as HTMLElement).style.opacity = '1';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.transform = 'translateY(0)';
           e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
           const buttons = e.currentTarget.querySelector('.action-buttons');
           if (buttons) (buttons as HTMLElement).style.opacity = '0.7';
         }}>
      <div className="card-body p-4 d-flex flex-column">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1 me-2">
            <h5 className="card-title h6 fw-semibold text-dark mb-1 text-truncate">
              {link.title}
            </h5>
            <p className="text-muted small mb-0 text-truncate">
              {new URL(link.url).hostname}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons d-flex" style={{opacity: 0.7, transition: 'opacity 0.2s'}}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="btn btn-sm btn-outline-secondary me-1"
              title="Edit link"
              style={{border: 'none', background: 'rgba(255,255,255,0.8)'}}
            >
              <Edit className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="btn btn-sm btn-outline-danger"
              title="Delete link"
              style={{border: 'none', background: 'rgba(255,255,255,0.8)'}}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Description */}
        {link.description && (
          <p className="text-muted small mb-3" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {link.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto">
          <button
            onClick={handleClick}
            className="btn btn-primary btn-sm d-flex align-items-center"
          >
            <span className="me-2">Visit</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
// Time Complexity: O(1) for shallow comparison
// Space Complexity: O(1) additional memory for memoization
export default memo(LinkCard);
