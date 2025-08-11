import { useState, useCallback } from 'react';

interface UseProjectCardProps {
  pageUrl?: string;
  githubUrl?: string;
  backendUrl?: string;
}

export const useProjectCard = ({ pageUrl, githubUrl, backendUrl }: UseProjectCardProps) => {
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

  const handleBackendClick = useCallback(() => {
    if (backendUrl) {
      window.open(backendUrl, '_blank');
    }
  }, [backendUrl]);

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
    handleBackendClick,
    handleMouseEnter,
    handleMouseLeave,
    handleViewButtonMouseEnter,
    handleViewButtonMouseLeave
  };
}; 