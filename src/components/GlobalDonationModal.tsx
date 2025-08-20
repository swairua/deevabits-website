import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DonationWidget } from "@/components/DonationWidget";
import { useDonation } from "@/context/DonationContext";

export const GlobalDonationModal: React.FC = () => {
  const { isModalOpen, closeDonationModal, selectedProject } = useDonation();

  return (
    <Dialog open={isModalOpen} onOpenChange={closeDonationModal}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DonationWidget initialProject={selectedProject} />
      </DialogContent>
    </Dialog>
  );
};