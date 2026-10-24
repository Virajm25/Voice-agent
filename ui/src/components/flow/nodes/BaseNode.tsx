import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const BaseNode = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & {
        selected?: boolean;
        invalid?: boolean;
        selected_through_edge?: boolean;
        hovered_through_edge?: boolean;
        runtimeActive?: boolean;
    }
>(({ children, className, selected, invalid, selected_through_edge, hovered_through_edge, runtimeActive, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            // Base styling - larger with max width, uses semantic colors
            "relative rounded-lg border bg-card shadow-[0_1px_2px_rgba(60,45,20,0.06)] text-card-foreground min-w-[320px] max-w-[400px] min-h-[120px]",
            // Border styling
            "border-border",
            className,
            // Selected state - prominent halo effect
            selected ? "border-primary ring-2 ring-primary/40 shadow-[0_4px_18px_rgba(40,110,85,0.18)]" : "",
            // Invalid state
            invalid ? "border-destructive shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "",
            // Hovered through edge takes precedence over selected through edge
            hovered_through_edge ? "ring-2 ring-primary/60 shadow-[0_2px_10px_rgba(40,110,85,0.15)]" : "",
            !hovered_through_edge && selected_through_edge ? "ring-1 ring-primary/50 shadow-[0_1px_6px_rgba(40,110,85,0.1)]" : "",
            runtimeActive ? "ring-2 ring-sky-400/60 shadow-[0_0_0_1px_rgba(56,189,248,0.18),0_0_24px_rgba(14,165,233,0.18)]" : "",
            !selected_through_edge && !hovered_through_edge && "hover:border-muted-foreground/50",
        )}
        tabIndex={0}
        {...props}
    >
        {children}
    </div>
));

BaseNode.displayName = "BaseNode";
