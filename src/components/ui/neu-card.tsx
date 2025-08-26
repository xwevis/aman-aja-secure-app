import * as React from "react";
import { cn } from "@/lib/utils";

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const NeuCard = React.forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("neu-card p-8 fade-in", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeuCard.displayName = "NeuCard";

export { NeuCard };