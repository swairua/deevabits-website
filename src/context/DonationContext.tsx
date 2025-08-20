import React, { createContext, useContext, useState, ReactNode } from "react";

interface DonationContextType {
  isModalOpen: boolean;
  selectedProject: string | null;
  openDonationModal: (projectId?: string) => void;
  closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const useDonation = (): DonationContextType => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
};

export const DonationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const openDonationModal = (projectId?: string) => {
    setSelectedProject(projectId || null);
    setIsModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const value: DonationContextType = {
    isModalOpen,
    selectedProject,
    openDonationModal,
    closeDonationModal,
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};