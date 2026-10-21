import { ChevronDown, type LucideProps } from "lucide-react";
import { cn } from "../../lib/utils";

export interface DropdownIconProps extends LucideProps {
  /** Flip the chevron while the popup is open. */
  opened?: boolean;
}

/** Chevron used by selects; decorative. */
export function DropdownIcon({ opened = false, className, ...rest }: DropdownIconProps) {
  return (
    <ChevronDown
      aria-hidden
      className={cn(
        "size-icon-md shrink-0 text-icon-secondary transition-transform duration-fast",
        opened && "rotate-180",
        className,
      )}
      {...rest}
    />
  );
}
