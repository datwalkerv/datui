import useEmblaCarousel from "embla-carousel-react";
import { Pause, Play } from "lucide-react";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ScrollArrow } from "../../internal/ScrollArrow/ScrollArrow";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { useDirection } from "../DirectionProvider/DirectionProvider";

export interface GalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled index of the current slide. Without `onChange` the gallery can't be dragged. */
  slideIndex?: number;
  /** @default 0 */
  defaultSlideIndex?: number;
  onChange?: (index: number) => void;
  /** Width of every slide. `"custom"` leaves sizing to the slides themselves. @default "100%" */
  slideWidth?: number | string | "custom";
  /** Where the current slide sits in the viewport. @default "start" */
  align?: "start" | "center" | "end";
  /** Wrap around from the last slide to the first. @default false */
  looped?: boolean;
  /** Advance every `autoplay` ms (0 = off). Pauses on hover, focus and drag; off under reduced motion. @default 0 */
  autoplay?: number;
  /** Dot indicators drawn over the slides. @default false */
  bullets?: "dark" | "light" | false;
  /** `true` shows prev/next buttons on devices with a fine pointer, `"always"` on every device. @default false */
  showArrows?: boolean | "always";
  /** @default "m" */
  arrowSize?: "s" | "m";
  /** Disable pointer/touch dragging. Arrows and keyboard keep working. @default false */
  dragDisabled?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  /** @default "Previous slide" */
  prevLabel?: string;
  /** @default "Next slide" */
  nextLabel?: string;
  /** Pause button label while autoplay runs. @default "Pause slideshow" */
  pauseLabel?: string;
  /** Play button label while autoplay is paused. @default "Play slideshow" */
  playLabel?: string;
  /** Accessible name of each slide. @default (index, total) => `${index + 1} of ${total}` */
  slideLabel?: (index: number, total: number) => string;
  /** @default "slide" */
  slideRoleDescription?: string;
  /** @default "carousel" */
  roleDescription?: string;
}

const defaultSlideLabel = (index: number, total: number) => `${index + 1} of ${total}`;
const clamp = (value: number, max: number) => Math.min(Math.max(0, value), Math.max(0, max));

/**
 * Swipeable carousel built on embla. Each child is a slide. Follows the carousel pattern: a labelled region,
 * slides as labelled groups, prev/next buttons, Left/Right/Home/End keys while the gallery is focused.
 */
export const Gallery = React.forwardRef<HTMLDivElement, GalleryProps>(function Gallery(
  {
    slideIndex,
    defaultSlideIndex = 0,
    onChange,
    slideWidth = "100%",
    align = "start",
    looped = false,
    autoplay = 0,
    bullets = false,
    showArrows = false,
    arrowSize = "m",
    dragDisabled = false,
    onDragStart,
    onDragEnd,
    prevLabel = "Previous slide",
    nextLabel = "Next slide",
    pauseLabel = "Pause slideshow",
    playLabel = "Play slideshow",
    slideLabel = defaultSlideLabel,
    slideRoleDescription = "slide",
    roleDescription = "carousel",
    "aria-label": ariaLabel = "Gallery",
    className,
    children,
    onKeyDown,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const slides = React.Children.toArray(children);
  const total = slides.length;
  const controlled = slideIndex !== undefined;
  const [rawIndex, setIndex] = useControllableState({ value: slideIndex, defaultValue: defaultSlideIndex, onChange });
  const [startIndex] = React.useState(() => clamp(rawIndex, total - 1));
  const rtl = useDirection() === "rtl";
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { hasPointer } = useAdaptivity();
  const viewportId = React.useId();

  const [viewportRef, api] = useEmblaCarousel({
    loop: looped,
    align,
    startIndex,
    direction: rtl ? "rtl" : "ltr",
    watchDrag: !dragDisabled && (!controlled || Boolean(onChange)),
  });

  // Snap points can be fewer than slides when slides are narrower than the viewport.
  const [snapCount, setSnapCount] = React.useState(total);
  const count = api ? snapCount : total;
  const index = clamp(rawIndex, count - 1);

  const dragHandlers = React.useRef({ onDragStart, onDragEnd });
  dragHandlers.current = { onDragStart, onDragEnd };
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    const onReInit = () => setSnapCount(api.scrollSnapList().length);
    const onDown = () => {
      setDragging(true);
      dragHandlers.current.onDragStart?.();
    };
    const onUp = () => {
      setDragging(false);
      dragHandlers.current.onDragEnd?.();
    };
    onReInit();
    api.on("select", onSelect).on("reInit", onReInit).on("pointerDown", onDown).on("pointerUp", onUp);
    return () => {
      api.off("select", onSelect).off("reInit", onReInit).off("pointerDown", onDown).off("pointerUp", onUp);
    };
  }, [api, setIndex]);

  React.useEffect(() => {
    if (api && api.selectedScrollSnap() !== index) api.scrollTo(index, reducedMotion);
  }, [api, index, reducedMotion]);

  const canPrev = looped ? count > 1 : index > 0;
  const canNext = looped ? count > 1 : index < count - 1;
  const goTo = (target: number) => setIndex(looped ? (target + count) % count : clamp(target, count - 1));

  // Autoplay: paused by hover, focus inside, dragging, the pause button, or reduced motion.
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [playing, setPlaying] = React.useState(true);
  const autoplayAvailable = autoplay > 0 && !reducedMotion && count > 1;
  const running = autoplayAvailable && playing && !hovered && !focused && !dragging;
  // biome-ignore lint/correctness/useExhaustiveDependencies: `index` restarts the countdown after every slide change.
  React.useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setIndex((i) => (clamp(i, count - 1) + 1) % count), autoplay);
    return () => clearTimeout(timer);
  }, [running, autoplay, count, index, setIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.target !== event.currentTarget) return;
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    const target =
      event.key === forward
        ? index + 1
        : event.key === back
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : null;
    if (target === null) return;
    event.preventDefault();
    goTo(target);
  };

  const arrowsShown = showArrows === "always" || (showArrows && hasPointer);
  const slideStyle: React.CSSProperties | undefined =
    slideWidth === "custom"
      ? undefined
      : { flex: `0 0 ${typeof slideWidth === "number" ? `${slideWidth}px` : slideWidth}` };

  return (
    // biome-ignore lint/a11y/useSemanticElements: the carousel pattern uses role="region" with aria-roledescription.
    <div
      ref={ref}
      role="region"
      aria-roledescription={roleDescription}
      aria-label={ariaLabel}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: the carousel takes focus so Left/Right/Home/End can move slides.
      tabIndex={0}
      dir={rtl ? "rtl" : undefined}
      className={cn("relative overflow-hidden outline-none focus-visible:focus-ring", className)}
      onKeyDown={handleKeyDown}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        setHovered(false);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        setFocused(true);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      {...rest}
    >
      <div ref={viewportRef} id={viewportId} className="overflow-hidden" aria-live={running ? "off" : "polite"}>
        <div className="flex touch-pan-y">
          {slides.map((slide, i) => (
            // biome-ignore lint/a11y/useSemanticElements: carousel slides are role="group"; <fieldset> is for form controls.
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: slides are positional.
              key={i}
              role="group"
              aria-roledescription={slideRoleDescription}
              aria-label={slideLabel(i, total)}
              className="min-w-0 shrink-0"
              style={slideStyle}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {arrowsShown && canPrev && (
        <ScrollArrow
          direction={rtl ? "right" : "left"}
          size={arrowSize}
          label={prevLabel}
          aria-controls={viewportId}
          className="absolute start-2 top-1/2 z-sticky -translate-y-1/2"
          onClick={() => goTo(index - 1)}
        />
      )}
      {arrowsShown && canNext && (
        <ScrollArrow
          direction={rtl ? "left" : "right"}
          size={arrowSize}
          label={nextLabel}
          aria-controls={viewportId}
          className="absolute end-2 top-1/2 z-sticky -translate-y-1/2"
          onClick={() => goTo(index + 1)}
        />
      )}

      {autoplayAvailable && (
        <ScrollArrow
          direction="left"
          size="s"
          label={playing ? pauseLabel : playLabel}
          aria-controls={viewportId}
          className="absolute end-2 top-2 z-sticky"
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause aria-hidden className="size-icon-sm" /> : <Play aria-hidden className="size-icon-sm" />}
        </ScrollArrow>
      )}

      {bullets && count > 1 && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1">
          {Array.from({ length: count }, (_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional.
              key={i}
              data-active={i === index || undefined}
              className={cn(
                "size-bullet rounded-full opacity-50 transition-opacity duration-fast data-active:opacity-100",
                bullets === "dark" ? "bg-bullet-dark" : "bg-bullet-light",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
});
