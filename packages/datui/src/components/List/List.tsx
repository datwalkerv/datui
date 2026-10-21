import {
  type Announcements,
  DndContext,
  KeyboardSensor,
  type Modifier,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import * as React from "react";
import { ListItemIndexContext } from "../../internal/ListContext";
import { cn } from "../../lib/utils";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space between items in px. @default 0 */
  gap?: number;
  /**
   * Screen reader announcements for drag reordering, for localization. Positions are 1-based; each function
   * overrides the English default for that event.
   */
  announcements?: ListAnnouncements;
  /** Instructions read when a drag handle is focused. */
  dragInstructions?: string;
}

const lockToVerticalAxis: Modifier = ({ transform }) => ({ ...transform, x: 0 });
const position = (id: string | number) => Number(id) + 1;

export interface ListAnnouncementEvent {
  /** 1-based position the item started at. */
  from: number;
  /** 1-based position under the item, or `null` when it is outside the list. */
  to: number | null;
  total: number;
}

/** datui-owned shape so the public types don't depend on the drag-and-drop engine's types. */
export interface ListAnnouncements {
  onDragStart?: (event: Omit<ListAnnouncementEvent, "to">) => string | undefined;
  onDragOver?: (event: ListAnnouncementEvent) => string | undefined;
  onDragEnd?: (event: ListAnnouncementEvent) => string | undefined;
  onDragCancel?: (event: Omit<ListAnnouncementEvent, "to">) => string | undefined;
}

const defaultAnnouncements: Required<ListAnnouncements> = {
  onDragStart: ({ from, total }) => `Picked up item ${from} of ${total}.`,
  onDragOver: ({ from, to, total }) => (to ? `Item ${from} moved to position ${to} of ${total}.` : undefined),
  onDragEnd: ({ from, to, total }) => `Item ${from} dropped at position ${to ?? from} of ${total}.`,
  onDragCancel: ({ from }) => `Reordering cancelled. Item ${from} returned to its place.`,
};

/**
 * Container for Cells (`role="list"`). Also hosts drag-and-drop reordering for `draggable` Cells,
 * which must be its direct children.
 */
export const List = React.forwardRef<HTMLDivElement, ListProps>(function List(
  {
    gap = 0,
    announcements,
    dragInstructions = "To reorder, press Space or Enter on the handle, use the arrow keys to move, then Space or Enter to drop. Press Escape to cancel.",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const id = React.useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const total = React.Children.count(children);
  const items = Array.from({ length: total }, (_, i) => String(i));
  const say = { ...defaultAnnouncements, ...announcements };
  const dndAnnouncements: Announcements = {
    onDragStart: ({ active }) => say.onDragStart({ from: position(active.id), total }),
    onDragOver: ({ active, over }) =>
      say.onDragOver({ from: position(active.id), to: over ? position(over.id) : null, total }),
    onDragEnd: ({ active, over }) =>
      say.onDragEnd({ from: position(active.id), to: over ? position(over.id) : null, total }),
    onDragCancel: ({ active }) => say.onDragCancel({ from: position(active.id), total }),
  };

  return (
    <DndContext
      id={id}
      sensors={sensors}
      modifiers={[lockToVerticalAxis]}
      accessibility={{
        announcements: dndAnnouncements,
        screenReaderInstructions: { draggable: dragInstructions },
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {/* biome-ignore lint/a11y/useSemanticElements: children may be any element; Cells add role="listitem" themselves. */}
        <div ref={ref} role="list" className={cn("flex flex-col", className)} style={{ gap, ...style }} {...rest}>
          {React.Children.map(children, (child, i) => (
            <ListItemIndexContext.Provider value={i}>{child}</ListItemIndexContext.Provider>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
});
