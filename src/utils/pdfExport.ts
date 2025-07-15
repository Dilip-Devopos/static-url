import jsPDF from 'jspdf';
import { Category, BookmarkLink } from '../types';

export interface PDFExportOptions {
  includeDescriptions?: boolean;
  includeCategories?: boolean;
  includeFolders?: boolean;
  sortOrder?: 'alphabetical' | 'original';
}

export const exportAllLinksToPDF = (
  categories: Category[],
  options: PDFExportOptions = {}
) => {
  const {
    includeDescriptions = true,
    includeCategories = true,
    includeFolders = true,
    sortOrder = 'original'
  } = options;

  // Check if there are any links to export
  const linkCount = categories.reduce((total, cat) => {
    return total + cat.links.length + cat.subdirectories.reduce((subTotal, sub) => subTotal + sub.links.length, 0);
  }, 0);

  if (linkCount === 0) {
    // Create a better notification instead of alert
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f87171;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: 400px;
      ">
        📄 No links available to export. Please add some links first.
      </div>
    `;
    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 4000);

    return;
  }

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Helper function to wrap text
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return lines.length * (fontSize * 0.35); // Approximate line height
  };

  // Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DevOps Hub - All Links Export', margin, yPosition);
  yPosition += 15;

  // Export date and summary
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Exported on: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 8;

  // Count total links
  const totalLinks = categories.reduce((total, cat) => {
    return total + cat.links.length + cat.subdirectories.reduce((subTotal, sub) => subTotal + sub.links.length, 0);
  }, 0);

  pdf.text(`Total Links: ${totalLinks} | Categories: ${categories.length}`, margin, yPosition);
  yPosition += 20;

  // Collect all links with their hierarchy
  const allLinks: Array<{
    link: BookmarkLink;
    categoryName: string;
    folderName?: string;
    order: number;
  }> = [];

  let linkOrder = 0;

  categories.forEach(category => {
    // Add main category links
    category.links.forEach(link => {
      allLinks.push({
        link,
        categoryName: category.name,
        order: linkOrder++
      });
    });

    // Add subdirectory links
    if (includeFolders) {
      category.subdirectories.forEach(subdirectory => {
        subdirectory.links.forEach(link => {
          allLinks.push({
            link,
            categoryName: category.name,
            folderName: subdirectory.name,
            order: linkOrder++
          });
        });
      });
    }
  });

  // Sort links if requested
  if (sortOrder === 'alphabetical') {
    allLinks.sort((a, b) => a.link.title.localeCompare(b.link.title));
  }

  // Group by category if includeCategories is true
  if (includeCategories) {
    const categoriesMap = new Map<string, typeof allLinks>();
    
    allLinks.forEach(item => {
      if (!categoriesMap.has(item.categoryName)) {
        categoriesMap.set(item.categoryName, []);
      }
      categoriesMap.get(item.categoryName)!.push(item);
    });

    // Render by category
    categoriesMap.forEach((categoryLinks, categoryName) => {
      checkPageBreak(30);
      
      // Category header
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(categoryName, margin, yPosition);
      yPosition += 10;
      
      // Category separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 15;

      // Group by folder within category if includeFolders is true
      if (includeFolders) {
        const foldersMap = new Map<string, typeof categoryLinks>();
        const mainLinks: typeof categoryLinks = [];

        categoryLinks.forEach(item => {
          if (item.folderName) {
            if (!foldersMap.has(item.folderName)) {
              foldersMap.set(item.folderName, []);
            }
            foldersMap.get(item.folderName)!.push(item);
          } else {
            mainLinks.push(item);
          }
        });

        // Render main links first
        if (mainLinks.length > 0) {
          mainLinks.forEach((item, index) => {
            renderLink(item.link, index + 1);
          });
        }

        // Render folder links
        foldersMap.forEach((folderLinks, folderName) => {
          checkPageBreak(25);
          
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`📁 ${folderName}`, margin + 10, yPosition);
          yPosition += 12;

          folderLinks.forEach((item, index) => {
            renderLink(item.link, index + 1, true);
          });
          
          yPosition += 5; // Extra space after folder
        });
      } else {
        // Render all category links without folder grouping
        categoryLinks.forEach((item, index) => {
          renderLink(item.link, index + 1);
        });
      }
      
      yPosition += 10; // Extra space after category
    });
  } else {
    // Render all links without category grouping
    allLinks.forEach((item, index) => {
      renderLink(item.link, index + 1);
    });
  }

  // Helper function to render a single link
  function renderLink(link: BookmarkLink, index: number, isInFolder: boolean = false) {
    const indent = isInFolder ? margin + 20 : margin;
    const requiredHeight = includeDescriptions ? 35 : 20;
    
    checkPageBreak(requiredHeight);

    // Link number and title
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    const titleText = `${index}. ${link.title}`;
    const titleHeight = addWrappedText(titleText, indent, yPosition, maxWidth - (indent - margin), 11);
    yPosition += titleHeight + 3;

    // URL
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 255); // Blue color for URL
    const urlHeight = addWrappedText(link.url, indent, yPosition, maxWidth - (indent - margin), 9);
    yPosition += urlHeight + 3;

    // Description
    if (includeDescriptions && link.description) {
      pdf.setTextColor(0, 0, 0); // Black color for description
      const descHeight = addWrappedText(link.description, indent, yPosition, maxWidth - (indent - margin), 9);
      yPosition += descHeight + 8;
    } else {
      yPosition += 5;
    }

    pdf.setTextColor(0, 0, 0); // Reset to black
  }

  // Save the PDF
  const fileName = `DevOps_Hub_Links_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

export const exportCategoryToPDF = (category: Category, options: PDFExportOptions = {}) => {
  // Check if category has any links
  const categoryLinkCount = category.links.length + category.subdirectories.reduce((total, sub) => total + sub.links.length, 0);

  if (categoryLinkCount === 0) {
    // Create a better notification instead of alert
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f87171;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: 400px;
      ">
        📄 No links available in "${category.name}" category to export. Please add some links first.
      </div>
    `;
    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 4000);

    return;
  }

  exportAllLinksToPDF([category], {
    ...options,
    includeCategories: false // Don't show category headers for single category export
  });
};
