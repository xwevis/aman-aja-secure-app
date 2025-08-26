import * as React from "react";
import { cn } from "@/lib/utils";

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const NeuInput = React.forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          className={cn(
            "neu-input w-full text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-bmw-blue/50 transition-all duration-200",
            error && "ring-2 ring-bmw-red/50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-bmw-red font-medium">{error}</p>
        )}
      </div>
    );
  }
);

NeuInput.displayName = "NeuInput";

export { NeuInput };