import * as React from "react";
import type { ModalCloseReason } from "../../internal/ModalShell/ModalShell";

interface ModalChildProps {
  id?: string;
  open?: boolean;
  onClose?: (reason: ModalCloseReason) => void;
}

export interface ModalRootProps {
  /** `id` of the child modal to show; `null` shows none. */
  activeModal?: string | null;
  /** Called with the active modal's id when it asks to close. */
  onClose?: (id: string, reason: ModalCloseReason) => void;
  /** `ModalPage` / `ModalCard` elements, each with a unique `id`. */
  children?: React.ReactNode;
}

/**
 * Shows one of its child modals by id. Each child is an ordinary controlled modal; ModalRoot only sets its `open`
 * and forwards `onClose`, so a plain `open` state per modal works just as well.
 */
export function ModalRoot({ activeModal = null, onClose, children }: ModalRootProps) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<ModalChildProps>(child) || !child.props.id) return child;
        const { id, onClose: own } = child.props;
        return React.cloneElement(child, {
          open: id === activeModal,
          onClose: (reason: ModalCloseReason) => {
            own?.(reason);
            onClose?.(id, reason);
          },
        });
      })}
    </>
  );
}
