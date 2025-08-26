import * as React from "react";
import { cn } from "@/lib/utils";

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "red" | "neutral";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant = "blue", size = "md", children, ...props }, ref) => {
    const baseClasses = "neu-button font-medium tracking-wide transition-all duration-200";
    
    const variantClasses = {
      blue: "btn-bmw-blue",
      red: "btn-bmw-red", 
      neutral: "bg-card-surface text-text-primary hover:bg-card-surface/80"
    };
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeuButton.displayName = "NeuButton";

export { NeuButton };