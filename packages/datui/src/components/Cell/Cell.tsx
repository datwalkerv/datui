import { useDndMonitor } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as React from "react";
import { CellCheckbox } from "../../internal/CellCheckbox";
import { CellDragger } from "../../internal/CellDragger";
import { ListItemIndexContext } from "../../internal/ListContext";
import { cn } from "../../lib/utils";
import { Removable } from "../Removable/Removable";
import { SimpleCell, type SimpleCellProps } from "../SimpleCell/SimpleCell";

export interface CellProps extends Omit<SimpleCellProps, "draggable" | "defaultChecked"> {
  /** `selectable` turns the row into a label with a checkbox or radio; `removable` adds a trailing remove button. */
  mode?: "selectable" | "removable";
  /** Control used by `mode="selectable"`. Radios sharing a `name` form a single-choice group. @default "checkbox" */
  selectionType?: "checkbox" | "radio";
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Form field name of the selection input. */
  name?: string;
  /** Form value of the selection input. */
  value?: string;
  /** `mode="removable"`: called with the click event and the Cell's root element. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>, rootEl: HTMLDivElement | null) => void;
  /** @default "Remove" */
  removeLabel?: string;
  /** Show a reorder handle. Works for direct children of `List`; the consumer reorders data in `onDragFinish`. */
  draggable?: boolean;
  /** Called after a drop with the original and new index within the List. */
  onDragFinish?: (move: { from: number; to: number }) => void;
  /** @default "Reorder" */
  dragHandleLabel?: string;
}

type Sortable = ReturnType<typeof useSortable>;

const CellFrame = React.forwardRef<HTMLDivElement, CellProps & { sortable?: Sortable }>(function CellFrame(
  {
    mode,
    selectionType = "checkbox",
    checked,
    defaultChecked,
    onCheckedChange,
    name,
    value,
    onRemove,
    removeLabel = "Remove",
    draggable,
    onDragFinish,
    dragHandleLabel = "Reorder",
    sortable,
    disabled,
    before,
    onClick,
    className,
    style,
    ...rest
  },
  forwardedRef,
) {
  const inList = React.useContext(ListItemIndexContext) !== undefined;
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const isDragging = sortable?.isDragging ?? false;
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    sortable?.setNodeRef(node);
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const selectable = mode === "selectable";
  const row = (
    <SimpleCell
      as={selectable ? "label" : undefined}
      disabled={disabled}
      className={cn(isDragging && "pointer-events-none")}
      before={
        selectable ? (
          <span className="flex items-center gap-3">
            <CellCheckbox
              type={selectionType}
              name={name}
              value={value}
              disabled={disabled}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
            />
            {before}
          </span>
        ) : (
          before
        )
      }
      onClick={
        onClick &&
        ((event: React.MouseEvent<HTMLElement>) => {
          if (isDragging) return event.preventDefault();
          onClick(event);
        })
      }
      {...rest}
    />
  );

  const handleId = React.useId();
  const contentId = `${handleId}-content`;
  // "Reorder" alone is ambiguous in a list; the handle is named "Reorder <row text>".
  const content = (
    <div id={contentId} className="contents">
      {row}
    </div>
  );

  return (
    <div
      ref={setRef}
      role={inList ? "listitem" : undefined}
      className={cn(
        "relative flex items-stretch",
        selectable && "has-[input:focus-visible]:focus-ring",
        isDragging && "z-sticky bg-background shadow-md",
        className,
      )}
      style={
        sortable
          ? { transform: CSS.Translate.toString(sortable.transform), transition: sortable.transition, ...style }
          : style
      }
    >
      {sortable && (
        <CellDragger
          ref={sortable.setActivatorNodeRef}
          id={handleId}
          label={dragHandleLabel}
          aria-labelledby={`${handleId} ${contentId}`}
          disabled={disabled}
          {...sortable.attributes}
          {...sortable.listeners}
        />
      )}
      {mode === "removable" ? (
        <Removable
          className="flex-1"
          removeLabel={removeLabel}
          disabled={disabled}
          onRemove={(event) => onRemove?.(event, rootRef.current)}
        >
          {content}
        </Removable>
      ) : (
        <div className="flex min-w-0 flex-1">{content}</div>
      )}
    </div>
  );
});

const SortableCell = React.forwardRef<HTMLDivElement, CellProps & { index: number }>(function SortableCell(
  { index, ...props },
  ref,
) {
  const id = String(index);
  const sortable = useSortable({ id, disabled: props.disabled });
  const { onDragFinish } = props;
  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      if (active.id === id && over) onDragFinish?.({ from: index, to: Number(over.id) });
    },
  });
  return <CellFrame ref={ref} sortable={sortable} {...props} />;
});

/**
 * SimpleCell with list-editing modes: selectable (checkbox/radio), removable and draggable reorder.
 * `ref`, `className` and `style` go to the outer row element.
 */
export const Cell = React.forwardRef<HTMLDivElement, CellProps>(function Cell(props, ref) {
  const index = React.useContext(ListItemIndexContext);
  if (props.draggable && index !== undefined) return <SortableCell ref={ref} index={index} {...props} />;
  return <CellFrame ref={ref} {...props} />;
});
