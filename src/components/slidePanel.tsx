// components/SlidePanel.tsx
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  position?: "right" | "left";
}

const SlidePanel = ({
  isOpen,
  onClose,
  title,
  children,
  position = "left", // Changed default to left
}: SlidePanelProps) => {
  return (
    <div
      className={`fixed inset-y-0 ${position}-0 z-50 w-full sm:w-96 transform transition-transform duration-300 bg-white dark:bg-gray-900 shadow-xl ${
        position === "left" ? "border-r" : "border-l"
      } dark:border-gray-700 h-full ${
        isOpen 
          ? "translate-x-0" 
          : position === "right" 
            ? "translate-x-full" 
            : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-medium">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlidePanel;