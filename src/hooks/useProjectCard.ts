import { useState, useCallback } from 'react';

interface UseProjectCardProps {
  pageUrl?: string;
  githubUrl?: string;
}

export const useProjectCard = ({ pageUrl, githubUrl }: UseProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isViewButtonHovered, setIsViewButtonHovered] = useState(false);

  const handleViewClick = useCallback(() => {
    if (pageUrl) {
      window.open(pageUrl, '_blank');
    }
  }, [pageUrl]);

  const handleCodeClick = useCallback(() => {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  }, [githubUrl]);

  const handlePageClick = useCallback(() => {
    if (pageUrl) {
      window.open(pageUrl, '_blank');
    }
  }, [pageUrl]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleViewButtonMouseEnter = useCallback(() => {
    setIsViewButtonHovered(true);
  }, []);

  const handleViewButtonMouseLeave = useCallback(() => {
    setIsViewButtonHovered(false);
  }, []);

  return {
    isHovered,
    isViewButtonHovered,
    handleViewClick,
    handleCodeClick,
    handlePageClick,
    handleMouseEnter,
    handleMouseLeave,
    handleViewButtonMouseEnter,
    handleViewButtonMouseLeave
  };
}; 