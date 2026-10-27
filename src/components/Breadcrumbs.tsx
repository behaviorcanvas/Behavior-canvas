import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    onClick?: () => void;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-xs text-[#6B5A6E]">
        <li className="flex items-center gap-1.5">
          <button
            onClick={items[0]?.onClick}
            className="flex items-center gap-1 hover:text-[#3B223D] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-[#B0A2B3]" />
            {index === items.length - 1 ? (
              <span className="font-semibold text-[#2D1F30] truncate max-w-[240px]">
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-[#3B223D] transition-colors truncate max-w-[180px]"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
