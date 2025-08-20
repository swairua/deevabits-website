
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "main" | "light" | "icon";
  className?: string;
  width?: number;
  height?: number;
}

export const BrandLogo = ({ 
  variant = "main", 
  className,
  width = 200,
  height = 60 
}: BrandLogoProps) => {
  // Use different logos based on variant
  const logoSrc = variant === "light" 
    ? "/lovable-uploads/057f4522-743d-4f0b-87a7-4d5f9ec2e70e.png"  // Footer/light version
    : "/lovable-uploads/8bdc2bb4-b883-49a6-81ac-9830dc14d67f.png";   // Header/main version

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoSrc}
        alt="Deevabits Green Energy"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
};
