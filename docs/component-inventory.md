# datui component inventory

Every component area the library covers, with its implementation status. Status is tracked **only in the table below**; the detail sections describe the intended API and behavior.

Statuses: `Not started` → `In progress` → `Implemented` (code exists, typechecks) → `Tested` (unit tests incl. a11y pass) → `Documented` (docs page with working example).

Kinds: **public** (exported), **internal** (folded into another component, not exported on its own), **replaced** (covered by another datui component; reason given).

Total entries: 226.

| Category | Component | Kind | Status |
|---|---|---|---|
| Providers & app | AppRoot | public | Documented |
| Providers & app | AppRootPortal | internal | Tested |
| Providers & app | ConfigProvider | public | Documented |
| Providers & app | ConfigProviderOverride | internal | Tested |
| Providers & app | ColorSchemeProvider | public | Documented |
| Providers & app | AdaptivityProvider | public | Documented |
| Providers & app | DirectionProvider | public | Documented |
| Providers & app | LocaleProvider | public | Documented |
| Providers & app | PlatformProvider | replaced | Tested |
| Providers & app | NavIdContext | internal | Tested |
| Providers & app | NavTransitionContext | internal | Tested |
| Providers & app | NavTransitionDirectionContext | internal | Tested |
| Primitives | Tappable | public | Documented |
| Primitives | Ripple | replaced | Tested |
| Primitives | Clickable | internal | Documented |
| Primitives | Touch | internal | Tested |
| Primitives | RootComponent | replaced | Tested |
| Primitives | Box | public | Documented |
| Primitives | Div | replaced | Documented |
| Primitives | VisuallyHidden | public | Documented |
| Primitives | FocusTrap | public | Documented |
| Primitives | AdaptiveIconRenderer | internal | Tested |
| Primitives | UnstyledTextField | internal | Tested |
| Primitives | InputLike | internal | Tested |
| Primitives | InputLikeDivider | internal | Tested |
| Primitives | NumberInputLike | internal | Tested |
| Primitives | SelectionControl | internal | Tested |
| Primitives | SelectionControlLabel | internal | Tested |
| Primitives | ImageBase | internal | Tested |
| Primitives | ImageBaseBadge | internal | Tested |
| Primitives | ImageBaseOverlay | internal | Tested |
| Primitives | ImageBaseFloatElement | internal | Tested |
| Primitives | TooltipBase | internal | Tested |
| Primitives | ModalCardBase | internal | Tested |
| Primitives | ChipsInputBase | internal | Tested |
| Primitives | Chip | public | Documented |
| Primitives | CarouselBase | replaced | Tested |
| Primitives | CarouselBullets | internal | Tested |
| Primitives | Popper | internal | Tested |
| Primitives | FloatingArrow | internal | Tested |
| Primitives | PopoutWrapper | replaced | Tested |
| Primitives | DropdownIcon | internal | Tested |
| Primitives | FormFieldClearButton | internal | Tested |
| Primitives | ScrollArrow | internal | Tested |
| Primitives | CarouselScrollArrows | internal | Tested |
| Primitives | CustomScrollView | replaced | Tested |
| Layout | SplitLayout | public | Documented |
| Layout | SplitCol | public | Documented |
| Layout | FixedLayout | public | Documented |
| Layout | Flex | public | Documented |
| Layout | FlexItem | public | Documented |
| Layout | SimpleGrid | public | Documented |
| Layout | Spacing | public | Documented |
| Layout | Separator | public | Documented |
| Layout | Group | public | Documented |
| Layout | GroupContainer | public | Documented |
| Layout | GroupHeader | public | Documented |
| Layout | GroupDescription | public | Documented |
| Layout | GroupExpandedContent | public | Documented |
| Layout | Header | public | Documented |
| Layout | Footer | public | Documented |
| Layout | CardGrid | public | Documented |
| Layout | CardScroll | public | Documented |
| Layout | HorizontalScroll | public | Documented |
| Layout | HorizontalCellShowMore | public | Documented |
| Layout | AspectRatio | public | Documented |
| Layout | Gradient | public | Documented |
| Typography | Typography | internal | Documented |
| Typography | DisplayTitle | public | Documented |
| Typography | Title | public | Documented |
| Typography | Headline | public | Documented |
| Typography | Text | public | Documented |
| Typography | Paragraph | public | Documented |
| Typography | Subhead | public | Documented |
| Typography | Footnote | public | Documented |
| Typography | Caption | public | Documented |
| Typography | EllipsisText | public | Documented |
| Typography | Mark | public | Documented |
| Buttons | Button | public | Documented |
| Buttons | ButtonGroup | public | Documented |
| Buttons | IconButton | public | Documented |
| Buttons | ToolButton | public | Documented |
| Buttons | CellButton | public | Documented |
| Buttons | CellButtonGroup | public | Documented |
| Buttons | CellButtonGroupSeparator | public | Documented |
| Buttons | Link | public | Documented |
| Navigation | Root | public | Documented |
| Navigation | View | public | Documented |
| Navigation | ViewInfinite | replaced | Tested |
| Navigation | Panel | public | Documented |
| Navigation | Epic | public | Documented |
| Navigation | PanelHeader | public | Documented |
| Navigation | PanelHeaderButton | public | Documented |
| Navigation | PanelHeaderBack | public | Documented |
| Navigation | PanelHeaderClose | public | Documented |
| Navigation | PanelHeaderSubmit | public | Documented |
| Navigation | PanelHeaderEdit | public | Documented |
| Navigation | PanelHeaderContent | public | Documented |
| Navigation | PanelHeaderContext | public | Documented |
| Navigation | Tabbar | public | Documented |
| Navigation | TabbarItem | public | Documented |
| Navigation | Tabs | public | Documented |
| Navigation | TabsItem | public | Documented |
| Navigation | SubnavigationBar | public | Documented |
| Navigation | SubnavigationButton | public | Documented |
| Navigation | Pagination | public | Documented |
| Navigation | PaginationPageButton / PaginationPageEllipsis / PaginationNavigationButton | internal | Tested |
| Forms | FormItem | public | Documented |
| Forms | FormItemTop | public | Documented |
| Forms | FormItemTopLabel | public | Documented |
| Forms | FormItemTopAside | public | Documented |
| Forms | FormField | public | Documented |
| Forms | FormLayoutGroup | public | Documented |
| Forms | FormStatus | public | Documented |
| Forms | Input | public | Documented |
| Forms | Textarea | public | Documented |
| Forms | Search | public | Documented |
| Forms | Checkbox | public | Documented |
| Forms | CheckboxInput | public | Documented |
| Forms | CheckboxSimple | internal | Tested |
| Forms | Radio | public | Documented |
| Forms | RadioInput | public | Documented |
| Forms | RadioGroup | public | Documented |
| Forms | Switch | public | Documented |
| Forms | Slider | public | Documented |
| Forms | SliderThumb | internal | Tested |
| Forms | SegmentedControl | public | Documented |
| Forms | SegmentedControlOption | internal | Tested |
| Forms | NativeSelect | public | Documented |
| Forms | Select | public | Documented |
| Forms | CustomSelect | public | Documented |
| Forms | CustomSelectInput | internal | Tested |
| Forms | CustomSelectClearButton | internal | Tested |
| Forms | CustomSelectDropdown | public | Documented |
| Forms | CustomSelectOption | public | Documented |
| Forms | SelectMimicry | public | Documented |
| Forms | SelectTypography | internal | Tested |
| Forms | ChipsInput | public | Documented |
| Forms | ChipsInputBase | internal | Tested |
| Forms | Chip | public | Documented |
| Forms | ChipsSelect | public | Documented |
| Forms | File | public | Documented |
| Forms | DropZone | public | Documented |
| Forms | DropZoneGrid | public | Documented |
| Forms | DateInput | public | Documented |
| Forms | DateRangeInput | public | Documented |
| Forms | Calendar | public | Documented |
| Forms | CalendarHeader | public | Documented |
| Forms | CalendarDays | internal | Tested |
| Forms | CalendarDay | internal | Tested |
| Forms | CalendarRange | public | Documented |
| Forms | CalendarTime | internal | Tested |
| Forms | WriteBar | public | Documented |
| Forms | WriteBarIcon | public | Documented |
| Forms | Removable | public | Documented |
| Forms | RemovableIos | replaced | Tested |
| Data display | Avatar | public | Documented |
| Data display | AvatarBadge | public | Documented |
| Data display | ImageOverlay | public | Documented |
| Data display | GridAvatar | public | Documented |
| Data display | GridAvatarBadge | internal | Tested |
| Data display | UsersStack | public | Documented |
| Data display | Badge | public | Documented |
| Data display | ContentBadge | public | Documented |
| Data display | ContentBadgeIconSlot | public | Documented |
| Data display | Counter | public | Documented |
| Data display | Image | public | Documented |
| Data display | ImageBadge | public | Documented |
| Data display | ImageFloatElement | public | Documented |
| Data display | Card | public | Documented |
| Data display | ContentCard | public | Documented |
| Data display | Banner | public | Documented |
| Data display | Placeholder | public | Documented |
| Data display | PlaceholderContainer | public | Documented |
| Data display | PlaceholderIcon | public | Documented |
| Data display | PlaceholderTitle | public | Documented |
| Data display | PlaceholderDescription | public | Documented |
| Data display | PlaceholderActions | public | Documented |
| Data display | SimpleCell | public | Documented |
| Data display | Chevron | internal | Tested |
| Data display | Cell | public | Documented |
| Data display | CellCheckbox | internal | Tested |
| Data display | CellDragger | internal | Tested |
| Data display | Removable | internal | Documented |
| Data display | RichCell | public | Documented |
| Data display | RichCellIcon | public | Documented |
| Data display | HorizontalCell | public | Documented |
| Data display | MiniInfoCell | public | Documented |
| Data display | InfoRow | public | Documented |
| Data display | List | public | Documented |
| Data display | Accordion | public | Documented |
| Data display | AccordionSummary | public | Documented |
| Data display | AccordionContent | public | Documented |
| Data display | AccordionIcon | public | Documented |
| Data display | Gallery | public | Documented |
| Overlays | ModalRoot | replaced | Tested |
| Overlays | ModalPage | public | Documented |
| Overlays | ModalPageHeader | public | Documented |
| Overlays | ModalPageContent | public | Documented |
| Overlays | ModalCard | public | Documented |
| Overlays | ModalOverlay | internal | Tested |
| Overlays | ModalOutlet | internal | Tested |
| Overlays | ModalDismissButton | public | Documented |
| Overlays | ModalOutsideButton | public | Documented |
| Overlays | ModalOutsideButtons | internal | Tested |
| Overlays | Alert | public | Documented |
| Overlays | AlertAction | internal | Tested |
| Overlays | ActionSheet | public | Documented |
| Overlays | ActionSheetItem | public | Documented |
| Overlays | ActionSheetCancelItem | replaced | Tested |
| Overlays | Popover | public | Documented |
| Overlays | Tooltip | public | Documented |
| Overlays | OnboardingTooltip | public | Documented |
| Feedback | Spinner | public | Documented |
| Feedback | ExpressiveSpinner | replaced | Tested |
| Feedback | PanelSpinner | public | Documented |
| Feedback | ScreenSpinner | public | Documented |
| Feedback | ScreenSpinnerContainer | public | Documented |
| Feedback | ScreenSpinnerLoader | internal | Tested |
| Feedback | ScreenSpinnerSwapIcon | internal | Tested |
| Feedback | Progress | public | Documented |
| Feedback | Skeleton | public | Documented |
| Feedback | Snackbar | public | Documented |
| Feedback | SnackbarBasic | public | Documented |
| Feedback | PullToRefresh | public | Documented |
| Feedback | PullToRefreshSpinner | internal | Tested |

# Details

## Providers & app

#### AppRoot
- **Kind:** public
- **Purpose:** Root container: applies theme/token classes, owns the portal root, scroll mode, safe-area insets and global layout.
- **Props (datui API):** `mode: 'full' | 'embedded' | 'partial'` ('full'); `scroll: 'global' | 'contain'` ('global'); `layout?: 'card' | 'plain'`; `safeAreaInsets?: { top?: number; right?: number; bottom?: number; left?: number }`; `portalContainer?: HTMLElement | RefObject<HTMLElement | null> | null`; `disablePortal: boolean` (false); `userSelect?: 'enabled' | 'enabled-with-pointer' | 'disabled'`; `disableRuntimeClasses: boolean` (false, for SSR); `children`.
- **Variants/sizes/states:** full (sets classes on `<html>`), embedded (own container, fixed elements contained via transform), partial (context only, no wrapper).
- **Interaction & keyboard:** none; `scroll="contain"` makes the root its own scroll container.
- **A11y:** no role; must not break document landmarks; respects `prefers-reduced-motion` via ConfigProvider.
- **Responsive:** none directly; exposes safe-area insets as CSS vars.
- **Depends on:** ConfigProvider, ColorSchemeProvider, AppRootPortal.
- **Foundation:** custom
- **Tests:** renders wrapper per mode; partial renders no DOM wrapper; html classes set/removed on mount/unmount in full mode; `disableRuntimeClasses`; safe-area CSS vars; portal container resolution from prop/ref/body; scroll contain vs global.

#### AppRootPortal
- **Kind:** internal (folded into AppRoot; used by every overlay)
- **Purpose:** Portals children into the AppRoot portal root (or `document.body`) while re-applying the current color scheme.
- **Props (datui API):** `usePortal?: boolean | HTMLElement | RefObject<HTMLElement | null> | null`; `className?: string`; `children`.
- **Variants/sizes/states:** portal on/off; default on except when AppRoot `mode="full"` with no explicit request.
- **Interaction & keyboard:** none.
- **A11y:** portalled content must keep focus management of its owner (Radix handles for dialogs/popovers).
- **Responsive:** none.
- **Depends on:** AppRoot, ColorSchemeProvider.
- **Foundation:** Radix via shadcn (`Portal` with `container`) or `createPortal`.
- **Tests:** renders into context portal root, explicit element, ref, body fallback; `false`/`null` renders inline; `disablePortal` on AppRoot wins; theme attribute copied onto portal wrapper.

#### ConfigProvider
- **Kind:** public
- **Purpose:** Global config context: color scheme, locale, direction, density, motion.
- **Props (datui API):** `colorScheme: 'light' | 'dark' | 'system'` ('system'); `locale: string` (BCP 47, 'en'); `direction?: 'ltr' | 'rtl'` (auto from `document.dir`); `density?: 'compact' | 'regular'`; `reducedMotion?: boolean` (auto from media query); `children`.
- **Variants/sizes/states:** nested providers merge with parent (undefined keys inherit).
- **Interaction & keyboard:** none.
- **A11y:** sets `dir`/`lang` consumers; motion off when user prefers reduced motion.
- **Responsive:** `system` follows `prefers-color-scheme` live.
- **Depends on:** ColorSchemeProvider, LocaleProvider, DirectionProvider.
- **Foundation:** custom (+ Radix `DirectionProvider` for direction).
- **Tests:** defaults; nested merge/override; `system` reacts to matchMedia change; direction auto-detect from `dir`; `useConfig()` hook outside provider returns defaults.

#### ConfigProviderOverride
- **Kind:** internal (folded into ConfigProvider)
- **Purpose:** Override a single config key for a subtree without re-running auto-detection.
- **Props (datui API):** `Partial<Config>` + `children`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** none.
- **Depends on:** ConfigProvider.
- **Foundation:** custom
- **Tests:** overrides only passed key; parent values preserved.

#### ColorSchemeProvider
- **Kind:** public
- **Purpose:** Force light/dark for a subtree (e.g. an always-dark media overlay).
- **Props (datui API):** `value: 'light' | 'dark' | 'system'`; `children`; `asChild?: boolean` (wrapper element carries `data-theme`).
- **Variants/sizes/states:** light, dark, system.
- **Interaction & keyboard:** none.
- **A11y:** contrast tokens must hold in both themes.
- **Responsive:** none.
- **Depends on:** ConfigProvider.
- **Foundation:** custom (`data-theme` attribute + Tailwind v4 `@custom-variant dark`).
- **Tests:** sets `data-theme`; nested override; `useColorScheme()` returns resolved value; portals inherit.

#### AdaptivityProvider
- **Kind:** public
- **Purpose:** Supplies viewport class (width/height buckets), density and pointer capability to components.
- **Props (datui API):** `viewWidth?: 'mobile' | 'smallTablet' | 'tablet' | 'smallDesktop' | 'desktop'`; `viewHeight?: 'extraSmall' | 'small' | 'medium'`; `density?: 'compact' | 'regular'`; `hasPointer?: boolean`; `children`.
- **Variants/sizes/states:** undefined values → CSS media queries decide (SSR-safe); explicit values pin behavior.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** density auto-derived: compact when narrow without pointer or short viewport, else regular.
- **Depends on:** ConfigProvider.
- **Foundation:** custom
- **Tests:** density derivation table (viewWidth × hasPointer × viewHeight); explicit density wins; undefined passthrough; `useAdaptivity()` hook.

#### DirectionProvider
- **Kind:** public
- **Purpose:** Override text direction for a subtree.
- **Props (datui API):** `value: 'ltr' | 'rtl'`; `children`.
- **Variants/sizes/states:** ltr, rtl.
- **Interaction & keyboard:** RTL flips arrow-key semantics in sliders/carousels/scrollers.
- **A11y:** consumer must also set `dir` on DOM.
- **Responsive:** none.
- **Depends on:** ConfigProvider.
- **Foundation:** Radix via shadcn (`Direction.Provider`).
- **Tests:** `useDirection()` value; Radix children receive dir.

#### LocaleProvider
- **Kind:** public
- **Purpose:** Override locale (BCP 47) for a subtree; drives built-in labels and date formatting.
- **Props (datui API):** `value: string`; `children`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** default aria labels (close, loading, etc.) localized by locale.
- **Responsive:** none.
- **Depends on:** ConfigProvider.
- **Foundation:** custom (date-fns locale lookup for date components).
- **Tests:** `useLocale()`; nested override; built-in label switches language.

#### PlatformProvider
- **Kind:** replaced (by ConfigProvider `density`/AdaptivityProvider, datui has one design, no per-OS styles)
- **Purpose:** Overrode OS platform styling for a subtree.
- **Props (datui API):** none.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** n/a.
- **A11y:** n/a.
- **Responsive:** n/a.
- **Depends on:** —
- **Foundation:** —
- **Tests:** none.

#### NavIdContext
- **Kind:** internal (folded into View/Panel navigation)
- **Purpose:** Two contexts (view id, panel id) + `useNavId()` so descendants know which view/panel they live in.
- **Props (datui API):** `NavViewIdContext.Provider value: string | undefined`; `NavPanelIdContext.Provider value: string | undefined`; hook `useNavId(): { view?: string; panel?: string }`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** none.
- **Depends on:** View, Panel.
- **Foundation:** custom
- **Tests:** hook returns nearest ids; undefined outside.

#### NavTransitionContext
- **Kind:** internal (folded into View/Root transitions)
- **Purpose:** Exposes `{ entering, animating }` of the current panel transition; nested providers OR-merge with parent.
- **Props (datui API):** `NavTransitionProvider { entering: boolean; animating: boolean; children }`; hook `useNavTransition()`.
- **Variants/sizes/states:** entering, animating.
- **Interaction & keyboard:** consumers defer focus/autofocus until animation ends.
- **A11y:** focus moved only after transition.
- **Responsive:** none.
- **Depends on:** View, Root.
- **Foundation:** custom
- **Tests:** parent true propagates; defaults false.

#### NavTransitionDirectionContext
- **Kind:** internal (folded into View/Root transitions)
- **Purpose:** Tells a panel whether it mounted via forward or back navigation (value frozen on mount).
- **Props (datui API):** `NavTransitionDirectionProvider { isBack?: boolean; children }`; hook `useNavDirection(): 'forwards' | 'backwards' | undefined`.
- **Variants/sizes/states:** forwards, backwards, undefined.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** none.
- **Depends on:** View, Root.
- **Foundation:** custom
- **Tests:** inherits parent when undefined; value does not change after mount when prop changes.

## Primitives

#### Tappable
- **Kind:** public
- **Purpose:** Base interactive surface: polymorphic element with hover/active/focus-visible states and optional ripple.
- **Props (datui API):** `asChild?: boolean`; `as?: ElementType`; `href?: string`; `onClick?`; `disabled?: boolean`; `hoverMode: 'background' | 'opacity' | 'none' | string` ('background'); `activeMode: 'background' | 'opacity' | 'none' | string` ('background'); `hasHover: boolean` (true); `hasActive: boolean` (true); `hovered?: boolean`; `activated?: boolean`; `activeEffectDelay: number` (≈600ms); `focusVisibleMode: 'inside' | 'outside'` ('inside'); `borderRadiusMode: 'auto' | 'inherit'` ('auto'); `hasHoverWithChildren?: boolean`; `unlockParentHover?: boolean`.
- **Variants/sizes/states:** hover, active (pressed), focus-visible, disabled, controlled hovered/activated; custom string mode = extra class.
- **Interaction & keyboard:** Enter/Space activate non-native elements; child hover does not bubble to parent unless unlocked; ripple only on touch (no pointer).
- **A11y:** `href` → `<a>` (disabled → `aria-disabled` + `role="link"`, no href); `onClick` on div → `role="button"` + `tabIndex=0` (disabled → `aria-disabled`, no tabindex); `<button>` gets `type="button"`.
- **Responsive:** `borderRadiusMode="auto"` → radius 0 below smallTablet.
- **Depends on:** Clickable.
- **Foundation:** Radix via shadcn (`Slot` for `asChild`) + custom.
- **Tests:** element resolution (href/onClick/as); keyboard Enter/Space; disabled blocks click and focus; hover/active classes and delay; nested hover lock; ripple on touch only; focus-visible ring only on keyboard.

#### Ripple
- **Kind:** replaced (by Tappable feedback: a uniform hover/press tint is used instead of a pointer-origin ripple)
- **Purpose:** Touch-ripple wave elements rendered on pointerdown.
- **Props (datui API):** `needRipple: boolean`; `clicks: { x: number; y: number; id: number }[]`.
- **Variants/sizes/states:** active/none.
- **Interaction & keyboard:** pointer only.
- **A11y:** `aria-hidden`.
- **Responsive:** only when `hasPointer` false.
- **Depends on:** Tappable.
- **Foundation:** custom
- **Tests:** wave added on pointerdown and removed after animation; disabled under reduced motion.

#### Clickable
- **Kind:** internal (folded into Tappable)
- **Purpose:** Element-type resolution + hover/active/focus-visible state machine without visual styling.
- **Props (datui API):** same as Tappable minus visual modes: `as`, `href`, `onClick`, `disabled`, `hoverClassName`, `activeClassName`, `hasHover`, `hasActive`, `hovered`, `activated`, `activeEffectDelay`, `focusVisibleMode`, `defaultElement: ElementType` ('div').
- **Variants/sizes/states:** clickable vs non-clickable (non-clickable strips handlers and state).
- **Interaction & keyboard:** Enter/Space click for role=button; hover reset when disabled toggles.
- **A11y:** see Tappable.
- **Responsive:** none.
- **Depends on:** RootComponent.
- **Foundation:** custom
- **Tests:** `checkClickable` truth table; state reset on disable; lock-bubbling context.

#### Touch
- **Kind:** internal (gesture hook for Gallery, Slider, swipe-to-close, PullToRefresh)
- **Purpose:** Unified mouse/touch gesture tracker emitting start/move/end with axis detection and shift values.
- **Props (datui API):** `as?: ElementType`; `onStart`, `onStartX`, `onStartY`, `onMove`, `onMoveX`, `onMoveY`, `onEnd`, `onEndX`, `onEndY`: `(e: Gesture & { originalEvent }) => void`; `onEnter`, `onLeave`: `(e: MouseEvent) => void`; `slideThreshold: number` (5); `noSlideClick?: boolean`; `useCapture?: boolean`; `stopPropagation?: boolean`; `usePointerHover?: boolean`.
- **Variants/sizes/states:** pressed, slideX, slideY.
- **Interaction & keyboard:** pointer only; suppresses click after slide when `noSlideClick`.
- **A11y:** consumers must provide keyboard equivalent.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** custom (pointer events; prefer `useGesture`-style hook over component).
- **Tests:** axis lock after threshold; shift/duration calc; click suppression after drag; touch + mouse parity; listener cleanup.

#### RootComponent
- **Kind:** replaced (by Radix `Slot`/`asChild` + plain `as` prop, a dedicated base wrapper is unnecessary)
- **Purpose:** Polymorphic base element merging base/user className and style, ref, `render` prop, `hidden` handling.
- **Props (datui API):** n/a (pattern: `as`, `asChild`, `className`, `ref`).
- **Variants/sizes/states:** `hidden` → display none.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** Radix via shadcn (`Slot`)
- **Tests:** covered by component tests (class merge via `cn`).

#### Box
- **Kind:** public
- **Purpose:** Generic layout box with spacing/size/flex-child props and `display`.
- **Props (datui API):** `as?: ElementType`; `asChild?: boolean`; `display?: 'none' | 'inline' | 'inline-block' | 'block' | 'contents'`; layout props `padding*`/`margin*`: `SpacingSize`; `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`: `number | string`; `flexGrow`, `flexShrink`, `flexBasis`, `alignSelf`, `justifySelf`; `position?`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** semantic element via `as`.
- **Responsive:** none (consumer uses Tailwind classes).
- **Depends on:** —
- **Foundation:** custom
- **Tests:** layout props → classes/styles; numeric → px; token sizes; `as`/`asChild`.

#### Div
- **Kind:** replaced (by Box, which covers padded containers through its spacing props)
- **Purpose:** Div with default horizontal/vertical padding.
- **Props (datui API):** none (use `<Box padding="m">`).
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** n/a.
- **A11y:** n/a.
- **Responsive:** n/a.
- **Depends on:** Box.
- **Foundation:** —
- **Tests:** none.

#### VisuallyHidden
- **Kind:** public
- **Purpose:** Hide content visually but keep it for assistive tech (default `span`; `input` variant stays focusable).
- **Props (datui API):** `as?: ElementType` ('span'); `asChild?: boolean`; native attrs.
- **Variants/sizes/states:** focusable-input variant.
- **Interaction & keyboard:** hidden native input still receives focus/keyboard.
- **A11y:** sr-only CSS; content in accessibility tree.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** Radix via shadcn (`VisuallyHidden`)
- **Tests:** rendered in a11y tree; not visible (clip styles); `as="input"` focusable.

#### FocusTrap
- **Kind:** public
- **Purpose:** Keeps Tab focus inside a region; auto-focuses and restores focus.
- **Props (datui API):** `autoFocus: boolean` (true); `restoreFocus: boolean | (() => HTMLElement | null)` (true); `disabled: boolean` (false); `autoFocusDelay: number` (0); `children`.
- **Variants/sizes/states:** active/disabled.
- **Interaction & keyboard:** Tab/Shift+Tab loop via sentinel guards; Escape left to owner.
- **A11y:** used by dialogs/popovers; restores focus to trigger.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** Radix via shadcn (`FocusScope`, `trapped`, `loop`)
- **Tests:** Tab wraps both ways; first focusable auto-focused; focus restored on unmount; disabled no trap; content mutations update focusables.

#### AdaptiveIconRenderer
- **Kind:** internal (folded into ToolButton)
- **Purpose:** Renders compact or regular icon depending on density.
- **Props (datui API):** `iconCompact: ReactNode`; `iconRegular: ReactNode` (or single lucide icon sized by density class).
- **Variants/sizes/states:** compact, regular (both rendered + CSS-hidden when density unknown).
- **Interaction & keyboard:** none.
- **A11y:** icons `aria-hidden`.
- **Responsive:** switches with density.
- **Depends on:** AdaptivityProvider.
- **Foundation:** lucide-react
- **Tests:** correct icon per density; both + CSS classes when density undefined.

#### UnstyledTextField
- **Kind:** internal (folded into Input/Textarea)
- **Purpose:** UA-style-reset `input`/`textarea` with body text typography.
- **Props (datui API):** `as: 'input' | 'textarea'`; `noPadding: boolean` (false); native input/textarea attrs; `ref`.
- **Variants/sizes/states:** padding/no padding.
- **Interaction & keyboard:** native.
- **A11y:** native semantics; label via FormItem.
- **Responsive:** font size follows density.
- **Depends on:** Text.
- **Foundation:** custom
- **Tests:** renders correct tag; ref forwarding; resets applied.

#### InputLike
- **Kind:** internal (folded into DateInput/DateRangeInput/time segments)
- **Purpose:** Fake focusable span showing a fixed-length segment value padded with figure-space mask.
- **Props (datui API):** `length: number`; `index: number`; `value?: string`; `label?: string`; `onElementSelect?: (index: number) => void`; `readOnly?: boolean`; `onKeyDown?`.
- **Variants/sizes/states:** empty, partial, full (full gets distinct style), read-only.
- **Interaction & keyboard:** focusable (tabIndex 0, -1 when read-only); focus selects segment; key handling by owner.
- **A11y:** hidden label via VisuallyHidden.
- **Responsive:** none.
- **Depends on:** VisuallyHidden.
- **Foundation:** custom
- **Tests:** mask count = length − value length; focus fires `onElementSelect(index)`; read-only removes keydown/tab stop.

#### InputLikeDivider
- **Kind:** internal (folded into DateInput)
- **Purpose:** Static separator span between segments (e.g. `.`, `:`, `—`).
- **Props (datui API):** `children`; `className?`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** `aria-hidden` recommended.
- **Responsive:** none.
- **Depends on:** InputLike.
- **Foundation:** custom
- **Tests:** renders children.

#### NumberInputLike
- **Kind:** internal (folded into DateInput/time segments)
- **Purpose:** InputLike for numeric segments, zero-padded, exposed as spinbutton.
- **Props (datui API):** InputLike props + `value?: number | string`; `minValue?: number`; `maxValue?: number`; `disabled?`.
- **Variants/sizes/states:** read-only, disabled.
- **Interaction & keyboard:** ArrowUp/Down/digits handled by owner.
- **A11y:** `role="spinbutton"`, `aria-valuemin/max/now/text`, `aria-readonly`, `aria-disabled`, `aria-label`.
- **Responsive:** none.
- **Depends on:** InputLike.
- **Foundation:** custom
- **Tests:** number padded to length; string passthrough; aria value attrs.

#### SelectionControl
- **Kind:** internal (folded into Checkbox/Radio/Switch)
- **Purpose:** Tappable `<label>` row wrapping a native control plus label content.
- **Props (datui API):** `noPadding: boolean` (false; switches hover/active to opacity); `hoverMode?`; `activeMode?`; `disabled?`; `focusVisibleMode?`; native label attrs.
- **Variants/sizes/states:** padded/unpadded, density compact, hover, active, disabled.
- **Interaction & keyboard:** click anywhere toggles the inner input; keyboard on input.
- **A11y:** native `<label>` association.
- **Responsive:** compact density shrinks padding/height.
- **Depends on:** Tappable, SelectionControlLabel.
- **Foundation:** custom (Radix Checkbox/Radio/Switch render the control).
- **Tests:** label click toggles; noPadding mode defaults; density class.

#### SelectionControlLabel
- **Kind:** internal (folded into SelectionControl as `SelectionControl.Label`)
- **Purpose:** Title + optional `titleAfter` + description block for selection controls.
- **Props (datui API):** `children` (title); `titleAfter?: ReactNode`; `description?: ReactNode`.
- **Variants/sizes/states:** with/without description; density compact.
- **Interaction & keyboard:** none.
- **A11y:** description should be linked via `aria-describedby` by owner.
- **Responsive:** density compact.
- **Depends on:** Text, Footnote.
- **Foundation:** custom
- **Tests:** description rendered only when present; titleAfter slot.

#### ImageBase
- **Kind:** internal (folded into Image and Avatar (src/internal/ImageBase))
- **Purpose:** Image container with fixed design sizes, fallback icon, border, object-fit and slot sub-components (badge, overlay, float element).
- **Props (datui API):** `src`, `srcSet`, `alt`, `sizes`, `crossOrigin`, `referrerPolicy`, `loading`; `size?: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56 | 64 | 72 | 80 | 88 | 96 | number`; `widthSize?`, `heightSize?: number | string`; `keepAspectRatio?: boolean`; `noBorder?: boolean`; `fallbackIcon?: ReactElement`; `transparentBackground?: boolean`; `objectFit?`, `objectPosition?`, `filter?`; `href?` (renders link); `onLoad?`, `onError?`; `slotProps?: { img?: ImgHTMLAttributes & { ref } }`; `children` (Badge/Overlay/FloatElement).
- **Variants/sizes/states:** loading, loaded, error (fallback shown), sizes list above.
- **Interaction & keyboard:** non-interactive unless `href`/overlay with onClick.
- **A11y:** `alt` required (empty for decorative); border `aria-hidden`.
- **Responsive:** none.
- **Depends on:** ImageBaseBadge, ImageBaseOverlay, ImageBaseFloatElement.
- **Foundation:** custom (Radix Avatar's image-loading status logic can be reused).
- **Tests:** fallback on error / no src; loaded state class; size → dimensions; keepAspectRatio; filter wrapper; href renders anchor; fallback icon size helper.

#### ImageBaseBadge
- **Kind:** internal (folded into ImageBadge)
- **Purpose:** Small icon badge at the image corner.
- **Props (datui API):** `background: 'stroke' | 'shadow'` ('shadow'); `children: ReactElement` (icon).
- **Variants/sizes/states:** stroke, shadow; icon size derived from image size.
- **Interaction & keyboard:** none.
- **A11y:** decorative unless icon has label.
- **Responsive:** none.
- **Depends on:** ImageBase.
- **Foundation:** lucide-react (icons)
- **Tests:** background variants; position class.

#### ImageBaseOverlay
- **Kind:** internal (folded into ImageOverlay)
- **Purpose:** Overlay layer over image, interactive (single icon button) or container for custom controls.
- **Props (datui API):** `theme?: 'light' | 'dark'`; `visibility?: 'on-hover' | 'always'` (auto by pointer); `onClick?: MouseEventHandler` (when set, children must be an icon); `children`; aria attrs.
- **Variants/sizes/states:** visible on hover/focus, always, interactive vs non-interactive.
- **Interaction & keyboard:** interactive: focusable, Enter/Space activate; shows on focus-within.
- **A11y:** interactive → `role="button"` + required `aria-label`.
- **Responsive:** without pointer defaults to `always`.
- **Depends on:** ImageBase, Tappable.
- **Foundation:** custom
- **Tests:** hover/focus show; always mode; keyboard activation; aria-label required in dev warning.

#### ImageBaseFloatElement
- **Kind:** internal (folded into ImageFloatElement)
- **Purpose:** Absolutely positioned slot on a 3×3 placement grid over the image.
- **Props (datui API):** `placement: 'top-start' | 'top' | 'top-end' | 'middle-start' | 'middle' | 'middle-end' | 'bottom-start' | 'bottom' | 'bottom-end'`; `inlineIndent?`, `blockIndent?: SpacingSize | number | string`; `visibility: 'always' | 'on-hover'` ('always').
- **Variants/sizes/states:** 9 placements, hover visibility.
- **Interaction & keyboard:** on-hover elements also show on focus-within.
- **A11y:** none intrinsic.
- **Responsive:** none.
- **Depends on:** ImageBase.
- **Foundation:** custom
- **Tests:** placement classes; logical (RTL) start/end; indent values; hover visibility.

#### TooltipBase
- **Kind:** internal (folded into Tooltip, OnboardingTooltip)
- **Purpose:** Visual tooltip bubble: title, description, arrow, optional close button.
- **Props (datui API):** `appearance: 'accent' | 'neutral' | 'white' | 'black' | 'inversion'` ('accent'); `title?: ReactNode`; `titleId?: string`; `description?: ReactNode`; `maxWidth: number | string | null` (220); `arrowProps?`; `arrowIcon?: ComponentType<SVGProps>`; `onCloseIconClick?: (e) => void`; `closeIconLabel: string` (localized "Close").
- **Variants/sizes/states:** 5 appearances, with/without arrow, closable.
- **Interaction & keyboard:** close button focusable; Escape handled by owner.
- **A11y:** `role="tooltip"` (or `dialog` + `aria-labelledby={titleId}` for onboarding).
- **Responsive:** none.
- **Depends on:** FloatingArrow, IconButton.
- **Foundation:** Radix via shadcn (Tooltip content + Arrow)
- **Tests:** appearance classes; maxWidth null removes style; close button renders only with handler and has label; arrow placement.

#### ModalCardBase
- **Kind:** internal (folded into ModalCard, Alert-like cards)
- **Purpose:** Card body for centered modal: icon, title, description, actions, dismiss button(s).
- **Props (datui API):** `icon?: ReactNode`; `title?: ReactNode`; `titleAs?: ElementType` ('span'); `titleId?: string`; `description?: ReactNode`; `descriptionAs?: ElementType` ('span'); `actions?: ReactNode`; `onClose?: () => void`; `dismissLabel: string` (localized "Close"); `dismissButtonMode: 'inside' | 'outside' | 'none'` ('outside'); `preventClose?: boolean`; `outsideButtons?: ReactNode`; `size?: number` (max width desktop).
- **Variants/sizes/states:** dismiss inside/outside/none, preventClose.
- **Interaction & keyboard:** dismiss button click closes; Escape owned by Dialog.
- **A11y:** dialog labelled by `titleId`; dismiss button `aria-label`.
- **Responsive:** compact: outside dismiss + outsideButtons shown; regular: dismiss forced inside.
- **Depends on:** Title, Text, IconButton, ButtonGroup.
- **Foundation:** Radix via shadcn (Dialog parts)
- **Tests:** slots render conditionally; dismiss modes per density; preventClose hides close; titleId wiring.

#### ChipsInputBase
- **Kind:** internal (folded into ChipsInput, ChipsSelect)
- **Purpose:** Text input that holds removable chips; creates chips from delimiter/paste/Enter.
- **Props (datui API):** `value?: O[]`; `defaultValue?: O[]`; `onChange?: (value: O[]) => void`; `inputValue?`, `defaultInputValue?: string`; `onInputChange?`; `delimiter?: string | RegExp | string[]`; `addOnBlur?: boolean`; `renderChip?: (props, option) => ReactNode`; `getOptionValue?`, `getOptionLabel?`, `getNewOptionData?`; `disabled?`, `readOnly?`, `placeholder?`; `clearButtonShown?: boolean`; `clearButton?: ComponentType`; `chipsListLabel: string`; `before?`, `after?`; `status?: 'default' | 'error' | 'valid'`; `maxHeight?`; `align?`; `slotProps?: { root?, input? }`.
- **Variants/sizes/states:** empty, with chips, focused, disabled, read-only, error/valid.
- **Interaction & keyboard:** Enter adds chip; Backspace on empty input focuses/removes last chip; Delete/Backspace remove focused chip; Arrow keys/Home/End move between chips; paste splits by delimiter.
- **A11y:** wrapper `role="group"` + `aria-label`; chips list `role="listbox"` `aria-orientation="horizontal"` with options `aria-selected`, `aria-posinset`, `aria-setsize`, removal hint via `aria-description`.
- **Responsive:** density changes chip height.
- **Depends on:** Chip, FormField, FormFieldClearButton.
- **Foundation:** custom
- **Tests:** add via Enter/delimiter/paste/blur; remove via button/Backspace/Delete; roving focus with arrows/Home/End; controlled vs uncontrolled; clear button; disabled/readOnly block edits; listbox aria.

#### Chip
- **Kind:** public
- **Purpose:** Compact token with optional before/after slots and remove button.
- **Props (datui API):** `value?: string | number`; `mode: 'primary' | 'secondary'` ('primary'); `removable: boolean` (true); `removeLabel: string` (localized "Remove"); `onRemove?: (e, value) => void`; `before?`, `after?: ReactNode`; `disabled?`, `readOnly?`; `as?` ('span').
- **Variants/sizes/states:** primary, secondary, removable, disabled, read-only, focused.
- **Interaction & keyboard:** remove button click; Delete/Backspace when focused (via ChipsInputBase).
- **A11y:** `aria-disabled`, `aria-readonly`; remove button labelled `removeLabel`, not in tab order inside listbox.
- **Responsive:** density height.
- **Depends on:** IconButton.
- **Foundation:** lucide-react (X icon)
- **Tests:** onRemove args; hidden remove when not removable/readOnly/disabled; mode classes.

#### CarouselBase
- **Kind:** replaced (by embla-carousel-react, internal to Gallery)
- **Purpose:** Draggable slide track with snapping, loop, arrows, bullets, keyboard and a11y labels.
- **Props (datui API):** `slideIndex?: number` (0); `onChange?: (index: number) => void`; `slideWidth: number | string | 'custom'` ('100%'); `align: 'left' | 'center' | 'right'` ('left'); `looped: boolean` (false); `dragDisabled: boolean` (false); `showArrows?: boolean | 'always'`; `arrowSize?: 's' | 'm'`; `arrowAreaHeight?: 'stretch' | 'fit'`; `bullets: 'dark' | 'light' | false` (false); `onPrevClick?`, `onNextClick?`; `onDragStart?`, `onDragEnd?`; `animationDuration?: number`; `animationEasing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | [number, number, number, number]` ('ease'); `resizeSource: 'window' | 'element'` ('window'); `arrowPrevLabel`, `arrowNextLabel`, `slideLabel?: string | ((i, n) => string)`, `slideRoleDescription`.
- **Variants/sizes/states:** fully visible (no drag), draggable, looped, at start/end (arrow hidden).
- **Interaction & keyboard:** drag/swipe, arrows click; keyboard via arrow buttons (Left/Right on region optional); RTL flips.
- **A11y:** root `role="region"` + `aria-roledescription="carousel"`; slides `role="group"` + `aria-roledescription="slide"` + "n of m" label; bullets `aria-hidden`.
- **Responsive:** arrows only with pointer unless `showArrows="always"`.
- **Depends on:** ScrollArrow, CarouselBullets, Touch.
- **Foundation:** embla-carousel-react
- **Tests:** controlled index; loop wrap; arrows hidden at edges; drag threshold; RTL; slide labels; resize recalculation.

#### CarouselBullets
- **Kind:** internal (folded into CarouselBase/Gallery)
- **Purpose:** Dot indicators for slides.
- **Props (datui API):** `count: number`; `activeIndex: number`; `appearance: 'dark' | 'light'`.
- **Variants/sizes/states:** dark, light, active dot.
- **Interaction & keyboard:** none.
- **A11y:** `aria-hidden` (position conveyed by slide labels).
- **Responsive:** none.
- **Depends on:** CarouselBase.
- **Foundation:** custom
- **Tests:** count and active dot.

#### Popper
- **Kind:** internal (folded into Popover, Tooltip, CustomSelectDropdown)
- **Purpose:** Positions floating content against an anchor ref/virtual element with flip/shift/arrow/same-width.
- **Props (datui API):** `targetRef: RefObject<HTMLElement | null> | VirtualElement`; `placement: Placement` ('bottom-start'); `offsetByMainAxis: number` (8); `offsetByCrossAxis: number` (0); `arrow?: boolean`; `arrowHeight?`, `arrowPadding?`; `arrowProps?`; `arrowIcon?`; `sameWidth?: boolean`; `hideWhenReferenceHidden?: boolean`; `onReferenceHiddenChange?`; `onPlacementChange?`; `disableFlip: boolean` (false); `disableShift: boolean` (false); `overflowPadding?`; `strategy?: 'fixed' | 'absolute'`; `zIndex?`; `usePortal` (true); `autoUpdateOnTargetResize` (false); `autoUpdateOnAnimationFrame` (false); `customMiddlewares?`.
- **Variants/sizes/states:** placement resolved after flip.
- **Interaction & keyboard:** none (owner handles open/close).
- **A11y:** owner sets roles.
- **Responsive:** flips/shifts within viewport.
- **Depends on:** FloatingArrow, AppRootPortal.
- **Foundation:** @floating-ui/react (Radix Popper for Radix-based overlays)
- **Tests:** placement + flip; sameWidth; hidden reference callback; portal toggle; arrow coords.

#### FloatingArrow
- **Kind:** internal (folded into Popper/TooltipBase)
- **Purpose:** Arrow SVG positioned by coords + placement, rotated per side.
- **Props (datui API):** `coords?: { x?: number; y?: number }`; `placement: Placement` ('bottom'); `offset?: number`; `isStaticOffset?: boolean`; `icon?: ComponentType<SVGProps>`; `iconClassName?`, `iconStyle?`.
- **Variants/sizes/states:** 4 sides; static vs computed offset.
- **Interaction & keyboard:** none.
- **A11y:** `aria-hidden`.
- **Responsive:** none.
- **Depends on:** Popper.
- **Foundation:** Radix via shadcn (`Arrow`) / @floating-ui/react `FloatingArrow`
- **Tests:** rotation per placement; offset applied; RTL.

#### PopoutWrapper
- **Kind:** replaced (by Radix Dialog Overlay + content positioning, internal to Alert/ActionSheet/ScreenSpinner)
- **Purpose:** Fullscreen overlay with dimmed backdrop, aligned content, fade-out on close.
- **Props (datui API):** `noBackground: boolean` (false); `strategy: 'fixed' | 'absolute' | 'none'` ('fixed'); `alignX: 'left' | 'center' | 'right'` ('center'); `alignY: 'top' | 'center' | 'bottom'` ('center'); `closing: boolean` (false); `zIndex?: number | string`; `onClick?` (backdrop).
- **Variants/sizes/states:** opening, closing (fade-out), transparent backdrop.
- **Interaction & keyboard:** backdrop click; Escape via Dialog.
- **A11y:** backdrop `aria-hidden`; content is dialog.
- **Responsive:** none.
- **Depends on:** AppRootPortal.
- **Foundation:** Radix via shadcn (Dialog Overlay)
- **Tests:** alignment classes; closing animation end; backdrop click.

#### DropdownIcon
- **Kind:** internal (folded into Select/CustomSelect/Accordion)
- **Purpose:** Chevron-down icon flipping when opened, density-sized.
- **Props (datui API):** `opened: boolean` (false); svg attrs.
- **Variants/sizes/states:** opened/closed; compact/regular size.
- **Interaction & keyboard:** none.
- **A11y:** `aria-hidden`.
- **Responsive:** icon size follows density.
- **Depends on:** AdaptivityProvider.
- **Foundation:** lucide-react (ChevronDown)
- **Tests:** rotate class when opened.

#### FormFieldClearButton
- **Kind:** internal (folded into FormField/Input/ChipsInputBase)
- **Purpose:** Small icon button that clears the field value.
- **Props (datui API):** `onClick: () => void`; `disabled?: boolean`; `label?: string` (localized "Clear"); `className?`.
- **Variants/sizes/states:** enabled, disabled.
- **Interaction & keyboard:** button; not stealing input focus on mousedown.
- **A11y:** `aria-label`.
- **Responsive:** density icon size.
- **Depends on:** IconButton.
- **Foundation:** lucide-react (X / CircleX)
- **Tests:** click calls onClick; disabled; label.

#### ScrollArrow
- **Kind:** internal (folded into HorizontalScroll, CarouselBase, CardScroll)
- **Purpose:** Round arrow button for scrolling a strip in a direction.
- **Props (datui API):** `direction: 'up' | 'right' | 'down' | 'left'`; `size: 's' | 'm'` ('m'); `offsetX?`, `offsetY?: number | string`; `label?: string`; `children?` (custom icon); button attrs.
- **Variants/sizes/states:** 4 directions, 2 sizes, hover.
- **Interaction & keyboard:** click; usually removed from tab order (content scrolls natively).
- **A11y:** `aria-label` when focusable, otherwise `aria-hidden`.
- **Responsive:** hidden without pointer (by owner).
- **Depends on:** Tappable.
- **Foundation:** lucide-react (ChevronLeft/Right/Up/Down)
- **Tests:** icon rotation per direction; logical offsetX in RTL; label.

#### CarouselScrollArrows
- **Kind:** internal (folded into CarouselBase)
- **Purpose:** Prev/next ScrollArrow pair with visibility per can-slide state and arrow area mode.
- **Props (datui API):** `canPrev: boolean`; `canNext: boolean`; `onPrev`, `onNext`; `size`; `areaHeight: 'stretch' | 'fit'`; `prevLabel`, `nextLabel`.
- **Variants/sizes/states:** hidden at edges.
- **Interaction & keyboard:** buttons.
- **A11y:** labelled buttons.
- **Responsive:** pointer only unless forced.
- **Depends on:** ScrollArrow.
- **Foundation:** custom
- **Tests:** visibility per state.

#### CustomScrollView
- **Kind:** replaced (by `ScrollArea`, shadcn/Radix ScrollArea)
- **Purpose:** Scroll container with styled scrollbars, optional horizontal scroll, hidden scrollbar, edge tints.
- **Props (datui API):** `orientation: 'vertical' | 'horizontal' | 'both'` ('vertical'); `scrollbarHidden: boolean` (false); `overscrollBehavior: 'auto' | 'contain' | 'none'` ('auto'); `scrollBehavior: 'auto' | 'smooth'` ('auto'); `viewportRef?`; `children`.
- **Variants/sizes/states:** scrollbar visible/hidden; top/bottom tint when scrollable.
- **Interaction & keyboard:** native scroll keys on focusable viewport.
- **A11y:** viewport focusable (`tabIndex=0`) when scrollable, labelled region if standalone.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** Radix via shadcn (ScrollArea)
- **Tests:** orientation; hidden scrollbar; tint shows at scroll edges.

## Layout

#### SplitLayout
- **Kind:** public
- **Purpose:** Multi-column app shell with optional header row.
- **Props (datui API):** `header?: ReactNode`; `center?: boolean`; `reverseColumns?: boolean` (visual order only); `slotProps?: { root?, content? }`; `children` (SplitCol).
- **Variants/sizes/states:** centered, reversed.
- **Interaction & keyboard:** none.
- **A11y:** DOM order preserved when reversed (reading order); columns can be landmarks (`nav`, `main`).
- **Responsive:** columns wrap/hide per SplitCol rules.
- **Depends on:** SplitCol.
- **Foundation:** custom
- **Tests:** header slot; reverse uses CSS order not DOM; center class.

#### SplitCol
- **Kind:** public
- **Purpose:** Column inside SplitLayout with width bounds, fixed/sticky mode, auto side spacing.
- **Props (datui API):** `width?`, `minWidth?`, `maxWidth?: number | string`; `fixed?: boolean`; `autoSpaced?: boolean`; `stretchedOnMobile?: boolean`; `animate?: boolean` (panel transitions; default from reduced-motion); `as?`.
- **Variants/sizes/states:** fixed, spaced, stretched.
- **Interaction & keyboard:** none.
- **A11y:** semantic element via `as`.
- **Responsive:** `autoSpaced` adds side gutters ≥ smallTablet; `stretchedOnMobile` → 100% width < tablet.
- **Depends on:** SplitLayout.
- **Foundation:** custom
- **Tests:** width styles; breakpoint classes; fixed inner wrapper; context provides col ref + animate.

#### FixedLayout
- **Kind:** public
- **Purpose:** Pin content to top or bottom of the panel/column (sticky bars, bottom buttons).
- **Props (datui API):** `vertical?: 'top' | 'bottom'`; `filled?: boolean` (content background); `useParentWidth?: boolean`; `as?`.
- **Variants/sizes/states:** top, bottom, filled.
- **Interaction & keyboard:** none.
- **A11y:** must not cover focused elements (scroll padding).
- **Responsive:** width tracks SplitCol/parent on resize; safe-area bottom inset.
- **Depends on:** SplitCol, AppRoot (safe area).
- **Foundation:** custom
- **Tests:** position classes; parent width sync on resize; safe-area padding.

#### Flex
- **Kind:** public
- **Purpose:** Flexbox container with token gaps, alignment and margins.
- **Props (datui API):** `direction: 'row' | 'column'` ('row'); `reverse?: boolean`; `gap?: SpacingSize | number | [row, column]`; `noWrap?: boolean`; `align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'`; `justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'`; `margin?: 'none' | 'auto' | SpacingSize`; `display?: 'flex' | 'inline-flex' | 'none'`; Box layout props; `as?`, `asChild?`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** semantic element via `as`.
- **Responsive:** `margin="auto"` uses standard horizontal gutters.
- **Depends on:** Box, FlexItem.
- **Foundation:** custom
- **Tests:** class mapping per prop; gap tuple; numeric gap px; reverse.

#### FlexItem
- **Kind:** public (as `Flex.Item`)
- **Purpose:** Flex child with preset flex values.
- **Props (datui API):** `flex?: 'grow' | 'shrink' | 'content' | 'fixed'`; `flexBasis?`; `alignSelf?`; `justifySelf?`; `as?`.
- **Variants/sizes/states:** grow (1 0 auto), shrink (0 1 auto), content (1 1 auto), fixed (0 0 auto).
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** none.
- **Depends on:** Flex.
- **Foundation:** custom
- **Tests:** preset → styles; flexBasis override.

#### SimpleGrid
- **Kind:** public
- **Purpose:** CSS grid with fixed column count or min column width.
- **Props (datui API):** `columns: number` (1); `minColWidth?: number`; `gap: SpacingSize | number | [row, column]` (0); `align: 'start' | 'end' | 'center' | 'stretch' | 'baseline'` ('stretch'); `margin: 'none' | 'auto' | 'auto-inline' | 'auto-block' | SpacingSize` ('none'); `display: 'grid' | 'inline-grid' | 'none'` ('grid'); `as?`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** `minColWidth` → auto-fill columns.
- **Depends on:** Box.
- **Foundation:** custom
- **Tests:** columns template; minColWidth template; gap tuple; margin presets.

#### Spacing
- **Kind:** public
- **Purpose:** Empty vertical spacer of token/custom height.
- **Props (datui API):** `size: SpacingSize | number | string` ('m'; accepts CSS var).
- **Variants/sizes/states:** token sizes (2xs…4xl), custom.
- **Interaction & keyboard:** none.
- **A11y:** `aria-hidden`.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** custom
- **Tests:** token → class; number → px var; CSS var passthrough.

#### Separator
- **Kind:** public
- **Purpose:** Horizontal/vertical divider line within a sized container.
- **Props (datui API):** `direction: 'horizontal' | 'vertical'` ('horizontal'); `appearance: 'primary' | 'secondary' | 'primary-alpha'` ('primary'); `padding: boolean` (false); `size?: SpacingSize | number | string`; `align: 'start' | 'center' | 'end'` ('center'); `decorative?: boolean` (true); flex child props.
- **Variants/sizes/states:** 3 appearances, padded.
- **Interaction & keyboard:** none.
- **A11y:** decorative → `role="none"`; otherwise `role="separator"` + `aria-orientation`.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** Radix via shadcn (Separator)
- **Tests:** orientation attrs; appearance classes; size var; decorative role.

#### Group
- **Kind:** public
- **Purpose:** Content section (card or plain) with header, description and auto separators between siblings.
- **Props (datui API):** `header?: ReactNode`; `description?: ReactNode`; `mode?: 'card' | 'plain'` (auto); `padding: 's' | 'm'` ('m', card only); `separator: 'auto' | 'show' | 'hide'` ('auto'); `as?` ('section'); `children`. Sub-parts: `Group.Container`, `Group.Header`, `Group.Description`, `Group.ExpandedContent`.
- **Variants/sizes/states:** card, plain, inside-modal plain, tabpanel.
- **Interaction & keyboard:** `role="tabpanel"` → auto `tabIndex=0`.
- **A11y:** `section`; label via header id + `aria-labelledby` recommended.
- **Responsive:** mode auto: card ≥ smallTablet, plain < smallTablet; plain inside modals; AppRoot `layout` overrides.
- **Depends on:** GroupContainer, GroupHeader, GroupDescription, Header, Footnote, Separator.
- **Foundation:** custom
- **Tests:** auto mode per viewWidth / modal / layout; separator rules between siblings; tabpanel tabIndex; header/description slots.

#### GroupContainer
- **Kind:** public (as `Group.Container`)
- **Purpose:** The card/plain section shell without header/description layout.
- **Props (datui API):** `mode?`, `padding`, `separator`, `as?` (same as Group).
- **Variants/sizes/states:** see Group.
- **Interaction & keyboard:** see Group.
- **A11y:** see Group.
- **Responsive:** see Group.
- **Depends on:** Separator.
- **Foundation:** custom
- **Tests:** shared with Group.

#### GroupHeader
- **Kind:** public (as `Group.Header`)
- **Purpose:** Header slot wrapper with group header spacing.
- **Props (datui API):** `as?`; div attrs.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** none.
- **Depends on:** Group.
- **Foundation:** custom
- **Tests:** renders with header class.

#### GroupDescription
- **Kind:** public (as `Group.Description`)
- **Purpose:** Secondary footnote text under group content.
- **Props (datui API):** `as?`; text attrs.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** can be referenced by `aria-describedby`.
- **Responsive:** density font.
- **Depends on:** Footnote.
- **Foundation:** custom
- **Tests:** renders Footnote with class.

#### GroupExpandedContent
- **Kind:** public (as `Group.ExpandedContent`)
- **Purpose:** Content area that bleeds to group edges (ignores inline or block padding).
- **Props (datui API):** `direction: 'inline' | 'block'` ('inline'); `as?`.
- **Variants/sizes/states:** inline, block.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** none.
- **Depends on:** Group.
- **Foundation:** custom
- **Tests:** direction classes.

#### Header
- **Kind:** public
- **Purpose:** Section heading with subtitle, indicator, before/after slots and title/subtitle icon slots.
- **Props (datui API):** `size: 's' | 'm' | 'l' | 'xl'` ('m'); `as?: ElementType` ('h2'); `subtitle?: ReactNode`; `subtitleAs?: ElementType` ('span'); `before?`, `after?`, `indicator?`: ReactNode; `beforeTitle?`, `afterTitle?`, `beforeSubtitle?`, `afterSubtitle?`: ReactNode; `multiline?: boolean`.
- **Variants/sizes/states:** 4 sizes, single/multiline.
- **Interaction & keyboard:** none (after may hold Link/Button).
- **A11y:** heading level via `as`; icon slots `aria-hidden`.
- **Responsive:** none.
- **Depends on:** Title, Headline, Subhead, Footnote, Paragraph.
- **Foundation:** custom
- **Tests:** size → typography; heading tag; slots rendered conditionally; ellipsis vs multiline.

#### Footer
- **Kind:** public
- **Purpose:** Centered footnote-style footer text (e.g. "12 items").
- **Props (datui API):** `as?: ElementType` ('footer'); `role?`; `children`.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** `<footer>` gets `role="contentinfo"` by default (reconsider: only correct at page level; prefer no role inside sections).
- **Responsive:** none.
- **Depends on:** Footnote.
- **Foundation:** custom
- **Tests:** default tag/role; custom `as` drops role.

#### CardGrid
- **Kind:** public
- **Purpose:** Responsive grid of Card items (`ul` by default).
- **Props (datui API):** `size: 's' | 'm' | 'l'` ('s'); `padding: boolean` (false); `as?` ('ul').
- **Variants/sizes/states:** s (≈3 per row), m (2), l (1).
- **Interaction & keyboard:** none.
- **A11y:** list semantics; children should be `li` (Card `as="li"`).
- **Responsive:** columns collapse on compact widths.
- **Depends on:** Card.
- **Foundation:** custom
- **Tests:** size classes; padding; list semantics.

#### CardScroll
- **Kind:** public
- **Purpose:** Horizontally scrolling row of Cards with arrows.
- **Props (datui API):** `size: 's' | 'm' | 'l' | false` ('s'; false = content width); `padding: boolean` (false); `showArrows: boolean | 'always'` (true); `listAs?: ElementType` ('ul').
- **Variants/sizes/states:** s/m/l/auto card width.
- **Interaction & keyboard:** arrow buttons scroll by one card; native scroll/keys.
- **A11y:** list semantics; arrows `aria-hidden`.
- **Responsive:** arrows only with pointer.
- **Depends on:** HorizontalScroll, Card.
- **Foundation:** custom
- **Tests:** scroll step equals card width; size classes; arrows visibility.

#### HorizontalScroll
- **Kind:** public
- **Purpose:** Horizontal scroller with prev/next arrows, animated scroll and optional wheel-to-horizontal.
- **Props (datui API):** `showArrows: boolean | 'always'` (true); `arrowSize: 's' | 'm'` ('m'); `arrowOffsetX?`, `arrowOffsetY?: number | string`; `getScrollToLeft?`, `getScrollToRight?: (pos: number) => number`; `scrollAnimationDuration?: number`; `scrollOnAnyWheel: boolean` (false); `contentAs?: ElementType` ('div'); `contentRef?`; `contentClassName?`; `withPadding?: boolean`; `slotProps?: { prevArrow?, nextArrow? }`.
- **Variants/sizes/states:** at start/end (hide arrow), scrolling.
- **Interaction & keyboard:** arrows (pointer); native scroll; Shift+wheel or any wheel when enabled; RTL aware.
- **A11y:** arrows `aria-hidden` and out of tab order (keyboard users scroll via focusable children).
- **Responsive:** arrows only with pointer unless `always`.
- **Depends on:** ScrollArrow.
- **Foundation:** custom
- **Tests:** arrow visibility at edges; custom scroll functions; wheel mapping; RTL direction; reduced-motion instant scroll.

#### HorizontalCellShowMore
- **Kind:** public
- **Purpose:** "Show all" tile at the end of a horizontal cell list.
- **Props (datui API):** `size: 's' | 'm'` ('s'); `height?: ImageSize | number`; `centered: boolean` (false); `children` (default localized "All"/"Show all"); Tappable props (`onClick`, `href`).
- **Variants/sizes/states:** s, m, centered, hover/active.
- **Interaction & keyboard:** button/link via Tappable.
- **A11y:** button or link role; icon `aria-hidden`.
- **Responsive:** none.
- **Depends on:** Tappable, Subhead, HorizontalScroll.
- **Foundation:** lucide-react (ChevronRight)
- **Tests:** default text per size; height only for m; renders link with href.

#### AspectRatio
- **Kind:** public
- **Purpose:** Box locked to a ratio; children stretch to fill.
- **Props (datui API):** `ratio: number | string` (number or CSS expr/var); `mode: 'stretch' | 'none'` ('stretch'); `as?`.
- **Variants/sizes/states:** stretch, none.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** fluid width.
- **Depends on:** —
- **Foundation:** Radix via shadcn (AspectRatio) or CSS `aspect-ratio`.
- **Tests:** ratio var set; stretch class on children.

#### Gradient
- **Kind:** public
- **Purpose:** Background fade block (tint/default/overlay) toward top or bottom.
- **Props (datui API):** `mode: 'default' | 'tint' | 'overlay'` ('default'); `to: 'top' | 'bottom'` ('top').
- **Variants/sizes/states:** 3 modes × 2 directions.
- **Interaction & keyboard:** none.
- **A11y:** decorative; text on overlay must meet contrast.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** custom
- **Tests:** mode/direction classes; both themes.

## Typography

#### Typography
- **Kind:** internal (folded into all text components; exported as base for custom text)
- **Purpose:** Base text element with weight, accent weight, alignment, inline and margin normalization.
- **Props (datui API):** `as?: ElementType` ('span'); `asChild?`; `weight?: '1' | '2' | '3'`; `accentWeight?: boolean`; `normalize?: boolean`; `inline?: boolean`; `align?: 'start' | 'center' | 'end'`; `caps?: boolean` (Caption/Footnote only).
- **Variants/sizes/states:** weights 1–3 (+accent).
- **Interaction & keyboard:** none.
- **A11y:** semantic tag via `as` (headings must set `as="h1".."h6"` explicitly).
- **Responsive:** sizes depend on density (compact smaller).
- **Depends on:** —
- **Foundation:** custom
- **Tests:** weight/align/inline/normalize classes; `as`.

#### DisplayTitle
- **Kind:** public
- **Purpose:** Largest display heading.
- **Props (datui API):** `level: '1' | '2' | '3' | '4'` ('1'); Typography props (`normalize` true).
- **Variants/sizes/states:** 4 levels.
- **Interaction & keyboard:** none.
- **A11y:** level is visual only; set `as` for heading semantics.
- **Responsive:** density compact sizes.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** level classes; density class.

#### Title
- **Kind:** public
- **Purpose:** Section/page title.
- **Props (datui API):** `level: '1' | '2' | '3'` ('1'); Typography props.
- **Variants/sizes/states:** 3 levels.
- **Interaction & keyboard:** none.
- **A11y:** visual level ≠ heading level; `as` sets tag.
- **Responsive:** density compact sizes.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** level classes; `as`.

#### Headline
- **Kind:** public
- **Purpose:** Emphasized one-line heading/label text.
- **Props (datui API):** `level: '1' | '2'` ('1'); Typography props.
- **Variants/sizes/states:** 2 levels.
- **Interaction & keyboard:** none.
- **A11y:** as Title.
- **Responsive:** density compact sizes.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** level classes.

#### Text
- **Kind:** public
- **Purpose:** Primary body text.
- **Props (datui API):** Typography props (`normalize` true).
- **Variants/sizes/states:** weights.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** density compact size.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** density class; weight.

#### Paragraph
- **Kind:** public
- **Purpose:** Multi-line body paragraph text (keeps margins by default).
- **Props (datui API):** Typography props (`normalize` false).
- **Variants/sizes/states:** weights.
- **Interaction & keyboard:** none.
- **A11y:** use `as="p"` for paragraphs.
- **Responsive:** density compact size.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** normalize default false.

#### Subhead
- **Kind:** public
- **Purpose:** Secondary-size text for subtitles.
- **Props (datui API):** Typography props.
- **Variants/sizes/states:** weights.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** density compact size.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** density class.

#### Footnote
- **Kind:** public
- **Purpose:** Small caption/supporting text.
- **Props (datui API):** Typography props + `caps?: boolean`.
- **Variants/sizes/states:** caps, weights.
- **Interaction & keyboard:** none.
- **A11y:** n/a.
- **Responsive:** density compact size.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** caps class; density class.

#### Caption
- **Kind:** public
- **Purpose:** Smallest text levels (labels, meta).
- **Props (datui API):** `level: '1' | '2' | '3'` ('1'); `caps?: boolean`; Typography props.
- **Variants/sizes/states:** 3 levels, caps.
- **Interaction & keyboard:** none.
- **A11y:** ensure contrast at small sizes.
- **Responsive:** density compact size.
- **Depends on:** Typography.
- **Foundation:** custom
- **Tests:** level + caps classes.

#### EllipsisText
- **Kind:** public
- **Purpose:** Truncates text to one or N lines with native title tooltip of full text.
- **Props (datui API):** `maxWidth?: number`; `maxLines: number` (1); `disableNativeTitle?: boolean`; `as?`.
- **Variants/sizes/states:** single-line ellipsis, multi-line clamp.
- **Interaction & keyboard:** none.
- **A11y:** full text remains in DOM (screen readers read all); `title` derived from children text.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** custom
- **Tests:** title text extraction from nested children; disableNativeTitle; line-clamp style when maxLines > 1; maxWidth style.

#### Mark
- **Kind:** public
- **Purpose:** Highlighted text (`<mark>`) e.g. for search matches.
- **Props (datui API):** span/mark attrs.
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** native `mark` semantics.
- **Responsive:** none.
- **Depends on:** —
- **Foundation:** custom
- **Tests:** renders `mark` with class; both themes contrast.

## Buttons

#### Button
- **Kind:** public
- **Purpose:** Primary action button/link with modes, appearances, sizes, icons and loading.
- **Props (datui API):** `mode: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link'` ('primary'); `appearance: 'accent' | 'positive' | 'negative' | 'neutral' | 'overlay' | 'accent-invariable'` ('accent'); `size: 's' | 'm' | 'l'` ('s'); `stretched: boolean` (false); `align: 'left' | 'center' | 'right'` ('center'); `before?`, `after?: ReactNode`; `loading?: boolean`; `loadingLabel: string` (localized "Loading…"); `rounded?: boolean`; `elevation?: '1' | '2' | '3' | '4'`; `disabled?`; `href?`; `asChild?`; Tappable state props.
- **Variants/sizes/states:** 5 modes × 6 appearances × 3 sizes; icon-only (before xor after, no children); loading; disabled; hover/active/focus.
- **Interaction & keyboard:** native button (Enter/Space); link with href; loading/disabled block click.
- **A11y:** `aria-busy` when loading; `aria-label` = loadingLabel while loading; disabled link drops `href` + `aria-disabled` + `role="link"`; spinner and icon wrappers `aria-hidden`/presentation; icon-only needs `aria-label`.
- **Responsive:** density compact reduces heights.
- **Depends on:** Tappable, Spinner, Typography.
- **Foundation:** Radix via shadcn (Button pattern + `Slot`)
- **Tests:** class matrix; icon-only detection; loading aria + spinner + no click; disabled link semantics; stretched/align; `asChild`.

#### ButtonGroup
- **Kind:** public
- **Purpose:** Groups buttons horizontally or vertically with gaps.
- **Props (datui API):** `mode: 'horizontal' | 'vertical'` ('horizontal'); `gap: 'none' | 'space' | 's' | 'm'` ('m'); `stretched: boolean` (false); `align: 'left' | 'center' | 'right'` ('left').
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none (each button tabbable).
- **A11y:** `role="group"`; `aria-label` recommended.
- **Responsive:** none.
- **Depends on:** Button.
- **Foundation:** custom
- **Tests:** classes per mode/gap/align; role group.

#### IconButton
- **Kind:** public
- **Purpose:** Square icon-only button.
- **Props (datui API):** `label?: string` (sr-only text; or `aria-label`); `children` (icon); `size?: 's' | 'm'`; Tappable props (`onClick`, `href`, `disabled`, `asChild`).
- **Variants/sizes/states:** hover, active, disabled, focus.
- **Interaction & keyboard:** button/link via Tappable.
- **A11y:** accessible name required (label or aria-label; dev warning); icon `aria-hidden`.
- **Responsive:** density changes hit area/icon size.
- **Depends on:** Tappable, VisuallyHidden.
- **Foundation:** lucide-react (icons) + custom
- **Tests:** label rendered visually hidden; dev warning without name; button vs link.

#### ToolButton
- **Kind:** public
- **Purpose:** Toolbar button with density-adaptive icon and optional text, row or column.
- **Props (datui API):** `icon: ReactNode` (or `iconCompact`/`iconRegular`); `mode: 'primary' | 'secondary' | 'tertiary' | 'outline'` ('primary'); `appearance: 'accent' | 'neutral'` ('accent'); `direction: 'row' | 'column'` ('row'); `rounded?: boolean`; `children?` (text); Tappable props.
- **Variants/sizes/states:** 4 modes × 2 appearances, row/column, icon-only, rounded.
- **Interaction & keyboard:** button.
- **A11y:** icon-only needs `aria-label`.
- **Responsive:** icon size switches with density.
- **Depends on:** Tappable, AdaptiveIconRenderer.
- **Foundation:** lucide-react
- **Tests:** icon per density; rounded ignored for column with text; class matrix.

#### CellButton
- **Kind:** public
- **Purpose:** Full-width list-row button (cell layout) with icon, multi-line texts, indicator, after slot.
- **Props (datui API):** `before?`, `after?`, `indicator?`: ReactNode; `overTitle?`, `subtitle?`, `extraSubtitle?`: ReactNode; `badgeBeforeTitle?`, `badgeAfterTitle?`, `badgeBeforeSubtitle?`, `badgeAfterSubtitle?`: ReactNode; `chevron?: boolean` (platform 'auto' dropped); `chevronSize: 's' | 'm'` ('m'); `multiline?: boolean`; `appearance: 'accent' | 'neutral' | 'negative'` ('accent'); `centered: boolean` (false); `disabled?`; Tappable props.
- **Variants/sizes/states:** 3 appearances, centered, multiline, disabled, hover/active.
- **Interaction & keyboard:** button/link via Tappable.
- **A11y:** text lines separated with hidden spaces so name reads naturally; badges/icons `aria-hidden`.
- **Responsive:** density compact row height.
- **Depends on:** Tappable, Headline, Subhead, Footnote, VisuallyHidden.
- **Foundation:** lucide-react (ChevronRight)
- **Tests:** slots render conditionally; chevron; accessible name concatenation; appearance/centered classes.

#### CellButtonGroup
- **Kind:** public
- **Purpose:** Container stacking CellButtons as one rounded block.
- **Props (datui API):** div attrs; children (CellButton / `CellButtonGroup.Separator`).
- **Variants/sizes/states:** n/a.
- **Interaction & keyboard:** none.
- **A11y:** optional `role="group"` + label.
- **Responsive:** none.
- **Depends on:** CellButton, CellButtonGroupSeparator.
- **Foundation:** custom
- **Tests:** renders children with group class.

#### CellButtonGroupSeparator
- **Kind:** public (as `CellButtonGroup.Separator`)
- **Purpose:** Horizontal separator inset for cell button groups.
- **Props (datui API):** Separator props minus `direction`/`padding`.
- **Variants/sizes/states:** appearances.
- **Interaction & keyboard:** none.
- **A11y:** decorative.
- **Responsive:** none.
- **Depends on:** Separator.
- **Foundation:** Radix via shadcn (Separator)
- **Tests:** forced horizontal; inset class.

#### Link
- **Kind:** public
- **Purpose:** Inline text link with optional icons, underline on hover, visited state.
- **Props (datui API):** `href?`; `before?`, `after?: ReactElement`; `noUnderline?: boolean`; `hasVisited?: boolean`; `disabled?`; `asChild?` (router links); Tappable props.
- **Variants/sizes/states:** default, hover underline, visited, disabled, focus.
- **Interaction & keyboard:** native link Enter; button behavior without href.
- **A11y:** `<a>`; without href → `role="button"`; disabled → `aria-disabled`; icons `aria-hidden`; external links should announce new tab.
- **Responsive:** inherits font size.
- **Depends on:** Tappable.
- **Foundation:** Radix via shadcn (`Slot`)
- **Tests:** href → anchor; onClick only → button role; visited class; noUnderline; disabled semantics; asChild with router link.

## Navigation

#### Root
- **Kind:** public
- **Purpose:** Top-level stack of `View`s; shows exactly one, animating forward/back transitions between them.
- **Props (datui API):** activeView: string; onTransition?: (p: { isBack: boolean; from: string; to: string }) => void; children: ReactElement<{ id: string }>[]
- **Variants/sizes/states:** transition direction (forward/back) derived from child order; `prefers-reduced-motion` disables animation.
- **Interaction & keyboard:** Changing `activeView` slides views; saves scroll of the outgoing view and restores it on back; blurs the focused element on change.
- **A11y:** Move focus to the incoming view's heading after transition; outgoing view `inert` during animation.
- **Responsive:** Full-viewport container; same behaviour at all widths.
- **Depends on:** View
- **Foundation:** custom
- **Tests:** renders only active view; isBack computed from child order; onTransition fires once with from/to; scroll restore on back; no animation with reduced motion.

#### View
- **Kind:** public
- **Purpose:** Stack of `Panel`s with push/pop transitions and optional iOS-style edge swipe-back.
- **Props (datui API):** activePanel: string; history?: string[]; onTransition?: (p: { isBack: boolean; from: string; to: string }) => void; onSwipeBack?: () => void; onSwipeBackStart?: (activePanel: string | null) => void | 'prevent'; onSwipeBackCancel?: () => void; children: ReactElement<{ id: string }>[]
- **Variants/sizes/states:** idle / animating / swiping-back; reduced-motion = instant.
- **Interaction & keyboard:** Touch swipe from left edge drags current panel right revealing previous (`history.at(-2)`); commits at >50% width or velocity >250px/s, else springs back; `onSwipeBackStart` may return `'prevent'`; elements can opt out of swipe (data attribute); per-panel scroll restore.
- **A11y:** Swipe is touch-only, so a visible back button (PanelHeaderBack) is required; incoming panel gets focus; hidden panels `inert`/`aria-hidden`.
- **Responsive:** Swipe-back only on touch/coarse pointer; desktop just transitions.
- **Depends on:** Panel, Root
- **Foundation:** custom
- **Tests:** active panel switch; back detection via history; swipe commit/cancel thresholds; `'prevent'` stops swipe; scroll restore after cancelled swipe.

#### ViewInfinite
- **Kind:** replaced (by View, a single View with a `history` prop covers it; keep at most an `isBackCheck?: (p: { from: string | null; to: string | null }) => boolean` prop on View)
- **Purpose:** View variant for unbounded histories where the same panel id may repeat.
- **Props (datui API):** n/a (see View; optional `isBackCheck`)
- **Variants/sizes/states:** same as View.
- **Interaction & keyboard:** same as View.
- **A11y:** same as View.
- **Responsive:** same as View.
- **Depends on:** View
- **Foundation:** custom
- **Tests:** covered by View tests plus `isBackCheck` override.

#### Panel
- **Kind:** public
- **Purpose:** A single screen inside a View: background, optional centered content, card/plain surface.
- **Props (datui API):** id: string; mode?: 'plain' | 'card' (auto: card at ≥ tablet, plain below); centered?: boolean (false); disableBackground?: boolean (false); children
- **Variants/sizes/states:** plain / card; centered.
- **Interaction & keyboard:** none (scroll container provided by layout).
- **A11y:** Render as `<section aria-labelledby>` pointing at its PanelHeader title.
- **Responsive:** Mode auto-switches to `card` at tablet width and up.
- **Depends on:** PanelHeader (usual child)
- **Foundation:** custom
- **Tests:** mode auto by breakpoint; explicit mode wins; centered layout; provides panel id context.

#### Epic
- **Kind:** public
- **Purpose:** Tabbed app shell: shows the active story (View or Root) plus a bottom Tabbar.
- **Props (datui API):** activeStory: string; tabbar?: ReactNode; children: ReactElement<{ id: string }>[]
- **Variants/sizes/states:** with / without tabbar (adds bottom padding).
- **Interaction & keyboard:** Switching story is instant (no animation); scroll position saved and restored per story.
- **A11y:** Content in `<main>`; tabbar in `<nav>` (see Tabbar).
- **Responsive:** On desktop, usually replaced by a side nav; tabbar slot optional.
- **Depends on:** Tabbar, View, Root
- **Foundation:** custom
- **Tests:** renders only active story; per-story scroll restore; tabbar padding class.

#### PanelHeader
- **Kind:** public
- **Purpose:** Top bar of a Panel with title and `before`/`after` action slots.
- **Props (datui API):** before?: ReactNode; after?: ReactNode; children (title); delimiter?: 'auto' | 'none' | 'separator' | 'spacing' ('auto'); transparent?: boolean (false); fixed?: boolean (false); float?: boolean (false)
- **Variants/sizes/states:** opaque / transparent; static / fixed (sticky with placeholder) / float (overlaps content); separator vs spacing below.
- **Interaction & keyboard:** none itself; slots hold buttons.
- **A11y:** `<header>`; title rendered as `h1`/`h2` and exposed as the Panel label; safe-area padding.
- **Responsive:** Title centered on mobile, start-aligned on desktop; delimiter 'auto' = separator on mobile, spacing in card mode.
- **Depends on:** PanelHeaderButton, PanelHeaderContent, Separator
- **Foundation:** custom
- **Tests:** slots render; fixed adds placeholder height; delimiter variants; title id wired to Panel.

#### PanelHeaderButton
- **Kind:** public
- **Purpose:** Icon/text button for PanelHeader slots.
- **Props (datui API):** children (icon); label?: ReactNode; primary?: boolean (false); onClick; href?; disabled?; asChild?: boolean
- **Variants/sizes/states:** icon-only / icon+label; primary (accent) / default; hover, active, focus-visible, disabled.
- **Interaction & keyboard:** Button semantics (Enter/Space); link when `href`.
- **A11y:** Icon-only requires `aria-label` (dev warning).
- **Responsive:** 44px touch target on mobile, compact on desktop.
- **Depends on:** Button
- **Foundation:** Radix via shadcn (Slot)
- **Tests:** renders button vs anchor; label; aria-label warning; primary class.

#### PanelHeaderBack
- **Kind:** public
- **Purpose:** Preset back button for PanelHeader.
- **Props (datui API):** label?: string ('Back'); showLabel?: boolean (false); onClick; ...PanelHeaderButton props
- **Variants/sizes/states:** chevron icon with/without visible label; mirrored in RTL.
- **Interaction & keyboard:** Button; consumer pops history.
- **A11y:** Label always present (visually hidden when not shown).
- **Responsive:** Hidden on wide layouts where a split/side nav handles back (optional `hideOnDesktop`).
- **Depends on:** PanelHeaderButton
- **Foundation:** lucide-react (ChevronLeft)
- **Tests:** accessible name; RTL flips icon; showLabel toggle.

#### PanelHeaderClose
- **Kind:** public
- **Purpose:** Preset close (X) button for PanelHeader / modal headers.
- **Props (datui API):** label?: string ('Close'); onClick; ...PanelHeaderButton props
- **Variants/sizes/states:** icon-only.
- **Interaction & keyboard:** Button.
- **A11y:** Visually hidden label as accessible name.
- **Responsive:** same at all widths.
- **Depends on:** PanelHeaderButton
- **Foundation:** lucide-react (X)
- **Tests:** accessible name; click fires.

#### PanelHeaderSubmit
- **Kind:** public
- **Purpose:** Preset confirm (check) button for PanelHeader.
- **Props (datui API):** label?: string ('Done'); onClick; disabled?; ...PanelHeaderButton props
- **Variants/sizes/states:** primary icon; disabled.
- **Interaction & keyboard:** Button.
- **A11y:** Hidden label as name.
- **Responsive:** same at all widths.
- **Depends on:** PanelHeaderButton
- **Foundation:** lucide-react (Check)
- **Tests:** accessible name; disabled blocks click.

#### PanelHeaderEdit
- **Kind:** public
- **Purpose:** Toggle button that switches between "edit" and "done".
- **Props (datui API):** isActive?: boolean (false); editLabel?: string ('Edit'); doneLabel?: string ('Done'); onClick
- **Variants/sizes/states:** edit (pencil) / done (check).
- **Interaction & keyboard:** Button; consumer toggles `isActive`.
- **A11y:** `aria-pressed={isActive}`; label switches with state.
- **Responsive:** same at all widths.
- **Depends on:** PanelHeaderButton
- **Foundation:** lucide-react (Pencil, Check)
- **Tests:** icon/label switch on isActive; aria-pressed.

#### PanelHeaderContent
- **Kind:** public
- **Purpose:** Rich title for PanelHeader: optional avatar (`before`), subtitle, and `aside` (e.g. dropdown chevron); clickable.
- **Props (datui API):** children (title); subtitle?: ReactNode; before?: ReactNode; aside?: ReactNode; onClick?: MouseEventHandler
- **Variants/sizes/states:** plain / with subtitle / with before; interactive when `onClick`.
- **Interaction & keyboard:** Becomes a button when `onClick` (Enter/Space); typically opens PanelHeaderContext.
- **A11y:** When clickable, `aria-expanded`/`aria-controls` to the PanelHeaderContext.
- **Responsive:** Centered on mobile, start-aligned on desktop.
- **Depends on:** PanelHeader, PanelHeaderContext
- **Foundation:** custom
- **Tests:** renders div vs button by onClick; subtitle/before/aside slots.

#### PanelHeaderContext
- **Kind:** public
- **Purpose:** Drop-down sheet anchored under the PanelHeader (e.g. a list of modes/filters).
- **Props (datui API):** opened: boolean; onClose: () => void; children
- **Variants/sizes/states:** opening / open / closing (CSS keyframes); with backdrop fade.
- **Interaction & keyboard:** Click backdrop or outside closes; Esc closes; locks body scroll on mobile.
- **A11y:** Disclosure/dialog-like: focus moves in on open, returns to trigger on close; `role="dialog"` with label.
- **Responsive:** Full-width under header on mobile; card-width popover in card mode.
- **Depends on:** PanelHeader, FixedLayout
- **Foundation:** Radix via shadcn (Popover or Collapsible + DismissableLayer behaviour)
- **Tests:** unmounts after exit animation; outside click and Esc call onClose; scroll lock toggles.

#### Tabbar
- **Kind:** public
- **Purpose:** Bottom navigation bar for Epic.
- **Props (datui API):** children (TabbarItem[]); mode?: 'auto' | 'vertical' | 'horizontal' ('auto': vertical when >2 items); plain?: boolean (false = shadow/border)
- **Variants/sizes/states:** icon-over-label (vertical) / icon-beside-label (horizontal); with/without shadow.
- **Interaction & keyboard:** Tab through items; no roving focus (they are links).
- **A11y:** `<nav aria-label>`; selected item `aria-current="page"`.
- **Responsive:** Fixed to bottom with safe-area inset; typically hidden at desktop widths.
- **Depends on:** TabbarItem, Epic
- **Foundation:** custom
- **Tests:** auto layout switch at 3 items; plain removes shadow; nav landmark.

#### TabbarItem
- **Kind:** public
- **Purpose:** One destination in Tabbar: icon, label, indicator (badge/counter).
- **Props (datui API):** children (icon); label?: ReactNode; selected?: boolean; indicator?: ReactNode; href?: string; disabled?: boolean; asChild?: boolean; onClick
- **Variants/sizes/states:** selected / default / disabled; with indicator.
- **Interaction & keyboard:** Button or link (Enter/Space); focus-visible ring.
- **A11y:** Requires label or `aria-label` (dev warning); `aria-current="page"` when selected.
- **Responsive:** Label may hide on very narrow widths.
- **Depends on:** Tabbar, Badge/Counter
- **Foundation:** Radix via shadcn (Slot)
- **Tests:** button vs anchor; selected styling + aria-current; accessible-name warning; indicator renders.

#### Tabs
- **Kind:** public
- **Purpose:** Horizontal tab list (underline or pill style) with optional controlled selection.
- **Props (datui API):** mode?: 'default' | 'accent' | 'secondary' ('default'); layoutFillMode?: 'auto' | 'stretched' | 'shrinked' ('auto'); value?: string; defaultValue?: string; onValueChange?: (id: string) => void; scrollToSelected?: boolean; scrollToSelectedInline?: ScrollLogicalPosition ('nearest'); role?: 'tablist' | 'navigation'
- **Variants/sizes/states:** underline (default) / accent pill / secondary pill; stretched vs shrinked items.
- **Interaction & keyboard:** Roving tabindex; Left/Right arrows (RTL-aware), Home/End move focus; Enter/Space activates; selected tab scrolled into view smoothly.
- **A11y:** WAI-ARIA Tabs: `tablist` > `tab` with `aria-selected`, `aria-controls` and panels `aria-labelledby`; can render as plain nav when not a tab flow.
- **Responsive:** Horizontally scrollable (HorizontalScroll) when overflowing on mobile.
- **Depends on:** TabsItem, HorizontalScroll
- **Foundation:** Radix via shadcn (Tabs)
- **Tests:** controlled/uncontrolled; arrow/Home/End navigation incl. RTL; only selected tab has tabindex 0; scroll-into-view on change.

#### TabsItem
- **Kind:** public
- **Purpose:** Single tab with label, `before` icon, `status` counter/badge and `after`.
- **Props (datui API):** value/id: string; children (label); before?: ReactNode; after?: ReactNode; status?: ReactNode | number; selected?: boolean; disabled?: boolean; href?: string
- **Variants/sizes/states:** inherits mode from Tabs; selected / hover / focus-visible / disabled; compact density.
- **Interaction & keyboard:** See Tabs; click selects via Tabs context.
- **A11y:** `role="tab"`, `aria-selected`, tabindex 0/-1; dev warn if `aria-controls` missing; numeric status preceded by hidden space for SR.
- **Responsive:** Stretches in `stretched` fill mode.
- **Depends on:** Tabs, Counter/Badge
- **Foundation:** Radix via shadcn (Tabs.Trigger)
- **Tests:** selection via context; status rendering; disabled not selectable; underline only in default mode.

#### SubnavigationBar
- **Kind:** public
- **Purpose:** Horizontally scrolling row of SubnavigationButton chips (filters/sub-sections).
- **Props (datui API):** children; showArrows?: boolean (true); arrowSize?: 's' | 'm' ('s'); fixed?: boolean (false = scroll; true = wrap/fixed layout); noPadding?: boolean (false)
- **Variants/sizes/states:** scrollable with arrows / fixed (equal-width, no scroll).
- **Interaction & keyboard:** Wheel/touch horizontal scroll; arrow buttons scroll by a page on desktop.
- **A11y:** `<nav>` or `role="toolbar"` with label; arrows `aria-hidden` (keyboard reaches items by Tab).
- **Responsive:** Arrows only on hover-capable pointers; touch scroll on mobile.
- **Depends on:** SubnavigationButton, HorizontalScroll
- **Foundation:** custom
- **Tests:** arrows shown/hidden by overflow; fixed mode layout; scroll step.

#### SubnavigationButton
- **Kind:** public
- **Purpose:** Chip-like toggle/filter button used inside SubnavigationBar.
- **Props (datui API):** mode?: 'primary' | 'outline' | 'tertiary' ('primary'); appearance?: 'accent' | 'neutral' ('accent'); size?: 's' | 'm' | 'l' ('m'); selected?: boolean; before?: ReactNode; after?: ReactNode; chevron?: boolean; textLevel?: 1 | 2 | 3 (1); onClick; href?
- **Variants/sizes/states:** 3 modes × 2 appearances × 3 sizes; selected; with chevron (opens menu).
- **Interaction & keyboard:** Button (Enter/Space).
- **A11y:** `aria-pressed` when used as toggle; `aria-haspopup`/`aria-expanded` with chevron.
- **Responsive:** same at all widths.
- **Depends on:** SubnavigationBar
- **Foundation:** custom (cva variants)
- **Tests:** variant classes; selected state + aria-pressed; chevron icon.

#### Pagination
- **Kind:** public
- **Purpose:** Page navigation with prev/next, boundary/sibling pages and ellipses.
- **Props (datui API):** currentPage?: number (1); totalPages?: number (1); siblingCount?: number (1); boundaryCount?: number (1); onChange?: (page: number, e: MouseEvent) => void; disabled?: boolean; navigationButtonsStyle?: 'icon' | 'caption' | 'both' ('icon'); prevButtonCaption?/nextButtonCaption?: string; prevButtonLabel?/nextButtonLabel?: string; navigationLabel?: string ('Pages'); getPageLabel?: (isCurrent: boolean) => string; renderPageButton?: (p) => ReactNode; renderNavigationButton?: (p) => ReactNode
- **Variants/sizes/states:** current page / hover / disabled; prev disabled at 1, next at last.
- **Interaction & keyboard:** Buttons in tab order; Enter/Space change page; render props allow links.
- **A11y:** `<nav aria-labelledby>` with hidden heading; current page `aria-current="page"`; page buttons labelled "Page N"; ellipsis `aria-hidden`.
- **Responsive:** Reduce siblingCount on narrow widths (consumer).
- **Depends on:** Button
- **Foundation:** custom (shadcn Pagination styling)
- **Tests:** page-range algorithm (start/end ellipsis cases); prev/next disabled at edges; onChange values; aria-current.

#### PaginationPageButton / PaginationPageEllipsis / PaginationNavigationButton
- **Kind:** internal (folded into Pagination)
- **Purpose:** Page number button, ellipsis marker, prev/next button.
- **Props (datui API):** exposed only via `renderPageButton` / `renderNavigationButton` render props.
- **Variants/sizes/states:** current / default / disabled; icon / caption / both.
- **Interaction & keyboard:** Button.
- **A11y:** caption text `aria-hidden` when label present.
- **Responsive:** n/a
- **Depends on:** Pagination
- **Foundation:** custom
- **Tests:** covered by Pagination.

## Forms

#### FormItem
- **Kind:** public
- **Purpose:** Field wrapper: label (`top`), control, helper/error text (`bottom`), status and optional remove action.
- **Props (datui API):** top?: ReactNode; topId?: string; topMultiline?: boolean (false); htmlFor?: string (top renders as `<label>`); bottom?: ReactNode; bottomId?: string; status?: 'default' | 'error' | 'valid' ('default'); required?: boolean (false); removable?: boolean | 'indent'; onRemove?: (e) => void; removePlaceholder?: ReactNode ('Remove'); noPadding?: boolean
- **Variants/sizes/states:** default / error / valid; required asterisk; removable.
- **Interaction & keyboard:** Label click focuses control; remove button via Removable.
- **A11y:** Label via `htmlFor`; `bottomId` must match control's `aria-describedby` (auto-wire via context); bottom gets `role="alert"` on error; required → `aria-required` on control.
- **Responsive:** Full width; padding tightens on compact density.
- **Depends on:** FormItemTop, Removable, FormField children
- **Foundation:** Radix via shadcn (Label; shadcn Form pattern)
- **Tests:** label/htmlFor; describedby wiring; error role=alert; required marker; removable renders remove button.

#### FormItemTop
- **Kind:** public (FormItem.Top)
- **Purpose:** Composite header row for a FormItem (label + aside content such as counter or link).
- **Props (datui API):** children; asChild?: boolean
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** none.
- **A11y:** layout only.
- **Responsive:** wraps when narrow.
- **Depends on:** FormItemTopLabel, FormItemTopAside
- **Foundation:** custom
- **Tests:** renders label and aside aligned.

#### FormItemTopLabel
- **Kind:** public (FormItem.TopLabel)
- **Purpose:** Label text inside FormItemTop, with required marker and multiline option.
- **Props (datui API):** htmlFor?: string; multiline?: boolean (false); required?: boolean; children
- **Variants/sizes/states:** single-line ellipsis / multiline.
- **Interaction & keyboard:** label click focuses control.
- **A11y:** renders `<label>` when htmlFor, else `<span>`.
- **Responsive:** n/a
- **Depends on:** FormItemTop
- **Foundation:** Radix via shadcn (Label)
- **Tests:** label vs span; required marker.

#### FormItemTopAside
- **Kind:** public (FormItem.TopAside)
- **Purpose:** Secondary end-aligned content in the field header (e.g. "0/100", help link).
- **Props (datui API):** children; asChild?: boolean
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** none.
- **A11y:** counters should be `aria-live="polite"` when dynamic.
- **Responsive:** n/a
- **Depends on:** FormItemTop
- **Foundation:** custom
- **Tests:** renders end-aligned.

#### FormField
- **Kind:** public
- **Purpose:** Shared bordered shell for all text-like controls with `before`/`after` slots, status and focus/hover styling.
- **Props (datui API):** status?: 'default' | 'error' | 'valid' ('default'); mode?: 'default' | 'plain' ('default'); before?: ReactNode; beforeAlign?: 'start' | 'center' | 'end' ('center'); after?: ReactNode; afterAlign?: 'start' | 'center' | 'end'; maxHeight?: number; disabled?: boolean; asChild?
- **Variants/sizes/states:** default / plain (borderless); hover, focus-within, error, valid, disabled.
- **Interaction & keyboard:** none itself; clear button (FormFieldClearButton) in `after` slot.
- **A11y:** Visual only; status must also be conveyed by control's `aria-invalid`.
- **Responsive:** height follows density (compact on desktop, regular on touch).
- **Depends on:** used by Input, Textarea, Select, ChipsInput, DateInput
- **Foundation:** custom
- **Tests:** focus-within class; slot alignment; status classes; maxHeight scroll.

#### FormLayoutGroup
- **Kind:** public
- **Purpose:** Groups FormItems vertically or side-by-side, optionally "segmented" into one joined field (e.g. first/last name).
- **Props (datui API):** mode?: 'vertical' | 'horizontal' ('vertical'); segmented?: boolean (false); removable?: boolean | 'indent'; onRemove?; removePlaceholder?; noPadding?: boolean
- **Variants/sizes/states:** vertical / horizontal; segmented joins borders.
- **Interaction & keyboard:** none.
- **A11y:** `role="group"` + `aria-labelledby` when it has a caption; consider `<fieldset>`.
- **Responsive:** horizontal collapses to vertical on narrow widths.
- **Depends on:** FormItem, Removable
- **Foundation:** custom
- **Tests:** layout classes; segmented joined borders; removable.

#### FormStatus
- **Kind:** public
- **Purpose:** Form-level message banner (e.g. submit error) with title and text.
- **Props (datui API):** mode?: 'default' | 'error' ('default'); title?: ReactNode; children
- **Variants/sizes/states:** default / error.
- **Interaction & keyboard:** none.
- **A11y:** `role="alert"` for error, `role="status"` otherwise.
- **Responsive:** full width.
- **Depends on:** Banner/Card styling
- **Foundation:** custom (shadcn Alert)
- **Tests:** role per mode; title rendering.

#### Input
- **Kind:** public
- **Purpose:** Single-line text input inside FormField.
- **Props (datui API):** type?: string ('text'); value?/defaultValue?/onChange; placeholder?; disabled?; readOnly?; required?; align?: 'left' | 'center' | 'right'; status?; mode?; before?/after?; beforeAlign?/afterAlign?; ref (input); slotProps?: { root?, input? }; + native input attrs (name, min, max, step, pattern, autoComplete, inputMode, enterKeyHint, ...)
- **Variants/sizes/states:** default / plain; error / valid; disabled; readOnly.
- **Interaction & keyboard:** Native input; clicking the shell focuses the input.
- **A11y:** `aria-invalid` from status; label/description from FormItem context.
- **Responsive:** 16px font on mobile to avoid iOS zoom.
- **Depends on:** FormField
- **Foundation:** custom (shadcn Input)
- **Tests:** ref forwarding; controlled/uncontrolled; aria-invalid; slotProps merge; align.

#### Textarea
- **Kind:** public
- **Purpose:** Multi-line input with auto-grow.
- **Props (datui API):** value?/defaultValue?/onChange; rows?: number (2); grow?: boolean (true); onResize?: (el: HTMLTextAreaElement) => void; maxHeight?: number; status?; mode?; before?/after?; align?; ref; slotProps?: { root?, textArea? }; + native textarea attrs
- **Variants/sizes/states:** default / plain; error / valid; disabled; readOnly.
- **Interaction & keyboard:** Native; grows with content up to maxHeight then scrolls.
- **A11y:** as Input.
- **Responsive:** same.
- **Depends on:** FormField
- **Foundation:** custom (CSS `field-sizing: content` with JS fallback)
- **Tests:** grows on input; onResize on height change only; maxHeight cap; controlled value resize.

#### Search
- **Kind:** public
- **Purpose:** Search field with leading icon, clear button, optional trailing icon button and "Find" button.
- **Props (datui API):** value?/defaultValue?/onChange; placeholder?: string ('Search'); before?: ReactNode (search icon); after?: ReactNode; icon?: ReactNode | ((renderIconButton) => ReactNode); onIconClick?; iconLabel?: string; hideClearButton?: boolean (false); clearLabel?: string ('Clear'); findButtonText?: string ('Find'); onFindButtonClick?; noPadding?: boolean; ref; slotProps?
- **Variants/sizes/states:** empty / has value (clear shown) / focused; with icon / with find button.
- **Interaction & keyboard:** Clear button empties and refocuses input; Esc clears (add); Enter submits (`enterKeyHint="search"`).
- **A11y:** `role="search"` wrapper, `type="search"` input; icon buttons with hidden labels.
- **Responsive:** Find button only on compact (desktop) density.
- **Depends on:** IconButton, Button
- **Foundation:** lucide-react (Search, X)
- **Tests:** clear button visibility and behaviour (controlled + uncontrolled); find button callback; icon render-fn; Esc clears.

#### Checkbox
- **Kind:** public
- **Purpose:** Labelled checkbox row with description and indeterminate state.
- **Props (datui API):** checked?/defaultChecked?; onCheckedChange?: (checked: boolean | 'indeterminate') => void; indeterminate?/defaultIndeterminate?: boolean; disabled?; readOnly?; required?; name?; value?; children (label); description?: ReactNode; titleAfter?: ReactNode; noPadding?: boolean; ref; slotProps?
- **Variants/sizes/states:** unchecked / checked / indeterminate; disabled; hover/focus.
- **Interaction & keyboard:** Space toggles; whole row clickable.
- **A11y:** Checkbox pattern; `aria-checked="mixed"` for indeterminate; description via `aria-describedby`.
- **Responsive:** larger box on touch density.
- **Depends on:** CheckboxInput
- **Foundation:** Radix via shadcn (Checkbox)
- **Tests:** toggle; indeterminate controlled/uncontrolled; readOnly blocks change; description linked.

#### CheckboxInput
- **Kind:** public (Checkbox.Input)
- **Purpose:** Bare checkbox box without row/label, for tables and custom layouts.
- **Props (datui API):** checked?/defaultChecked?/onCheckedChange; indeterminate?; disabled?; readOnly?; name?; value?; ref
- **Variants/sizes/states:** as Checkbox.
- **Interaction & keyboard:** Space toggles.
- **A11y:** needs `aria-label`/`aria-labelledby`.
- **Responsive:** size by density.
- **Depends on:** none
- **Foundation:** Radix via shadcn (Checkbox)
- **Tests:** toggle; indeterminate icon; accessible name.

#### CheckboxSimple
- **Kind:** internal (folded into Checkbox; used when there is no description)
- **Purpose:** Compact inline layout of Checkbox.
- **Props (datui API):** n/a
- **Variants/sizes/states:** n/a
- **Interaction & keyboard:** as Checkbox.
- **A11y:** as Checkbox.
- **Responsive:** n/a
- **Depends on:** Checkbox
- **Foundation:** Radix via shadcn (Checkbox)
- **Tests:** covered by Checkbox.

#### Radio
- **Kind:** public
- **Purpose:** Labelled radio option with description.
- **Props (datui API):** value: string; children (label); description?: ReactNode; titleAfter?: ReactNode; disabled?; ref; (checked state comes from RadioGroup)
- **Variants/sizes/states:** unchecked / checked / disabled; hover/focus.
- **Interaction & keyboard:** see RadioGroup.
- **A11y:** `role="radio"`, description via `aria-describedby`.
- **Responsive:** size by density.
- **Depends on:** RadioGroup, RadioInput
- **Foundation:** Radix via shadcn (RadioGroup.Item)
- **Tests:** selection; description linked; disabled skip.

#### RadioInput
- **Kind:** public (Radio.Input)
- **Purpose:** Bare radio circle without row/label.
- **Props (datui API):** value: string; disabled?; ref
- **Variants/sizes/states:** checked / unchecked / disabled.
- **Interaction & keyboard:** as RadioGroup.
- **A11y:** needs accessible name.
- **Responsive:** n/a
- **Depends on:** RadioGroup
- **Foundation:** Radix via shadcn (RadioGroup.Item)
- **Tests:** checked indicator; name.

#### RadioGroup
- **Kind:** public
- **Purpose:** Container for Radio options.
- **Props (datui API):** value?/defaultValue?/onValueChange?: (v: string) => void; name?; mode?: 'vertical' | 'horizontal' ('vertical'); disabled?; required?
- **Variants/sizes/states:** vertical / horizontal.
- **Interaction & keyboard:** Roving focus: Arrow keys move and select, Tab enters/leaves group.
- **A11y:** `role="radiogroup"` with label.
- **Responsive:** horizontal wraps on narrow widths.
- **Depends on:** Radio
- **Foundation:** Radix via shadcn (RadioGroup)
- **Tests:** controlled/uncontrolled; arrow navigation; layout mode.

#### Switch
- **Kind:** public
- **Purpose:** On/off toggle.
- **Props (datui API):** checked?/defaultChecked?/onCheckedChange?: (checked: boolean) => void; disabled?; readOnly?; required?; name?; value?; ref
- **Variants/sizes/states:** off / on / disabled; focus-visible.
- **Interaction & keyboard:** Space (and Enter) toggles.
- **A11y:** `role="switch"` with `aria-checked`.
- **Responsive:** size by density.
- **Depends on:** none (often inside SimpleCell)
- **Foundation:** Radix via shadcn (Switch)
- **Tests:** toggle; controlled; readOnly; aria-checked.

#### Slider
- **Kind:** public
- **Purpose:** Single-value or range slider with optional value tooltip.
- **Props (datui API):** value?/defaultValue?: number | [number, number]; onChange?: (value) => void; multiple?: boolean (false; true = two thumbs); min?: number (0); max?: number (100); step?: number (1); disabled?; withTooltip?: boolean; size?: 's' | 'm' | 'l' ('l'); getAriaLabel?: (index: number) => string; getAriaValueText?: (value: number, index: number) => string
- **Variants/sizes/states:** single / range; 3 sizes; dragging (active thumb); disabled.
- **Interaction & keyboard:** Drag thumb or click track (nearest thumb moves); Arrow keys step, PageUp/PageDown large step, Home/End min/max; thumbs cannot cross.
- **A11y:** WAI-ARIA Slider per thumb (`aria-valuenow/min/max/valuetext`, per-thumb label).
- **Responsive:** touch-friendly thumb hit area.
- **Depends on:** Tooltip
- **Foundation:** Radix via shadcn (Slider)
- **Tests:** step snapping; range thumb ordering; keyboard; aria props per thumb; tooltip during drag.

#### SliderThumb
- **Kind:** internal (folded into Slider)
- **Purpose:** Thumb with hidden range input and optional tooltip.
- **Props (datui API):** n/a
- **Variants/sizes/states:** active / idle.
- **Interaction & keyboard:** as Slider.
- **A11y:** as Slider.
- **Responsive:** n/a
- **Depends on:** Slider
- **Foundation:** Radix via shadcn (Slider.Thumb)
- **Tests:** covered by Slider.

#### SegmentedControl
- **Kind:** public
- **Purpose:** Exclusive choice between a few options with sliding indicator.
- **Props (datui API):** options: Array<{ value: string | number; label: ReactNode; before?: ReactNode; disabled?: boolean }>; value?/defaultValue? (first option); onChange?: (value) => void; size?: 'm' | 'l' ('l'); name?; role?: 'radiogroup' | 'tablist' ('radiogroup')
- **Variants/sizes/states:** 2 sizes; selected (animated slider); disabled option.
- **Interaction & keyboard:** radiogroup: arrow keys move selection; tablist: roving focus Left/Right/Home/End (RTL-aware), Enter/Space selects.
- **A11y:** `radiogroup` + `radio` options, or `tablist` + `tab` with `aria-selected`.
- **Responsive:** full width, equal-width segments.
- **Depends on:** SegmentedControlOption
- **Foundation:** Radix via shadcn (ToggleGroup type="single" or Tabs for tablist role)
- **Tests:** controlled/uncontrolled; default = first option; slider position; keyboard in both roles; RTL.

#### SegmentedControlOption
- **Kind:** internal (folded into SegmentedControl)
- **Purpose:** One segment (label + visually hidden radio).
- **Props (datui API):** n/a (via `options`)
- **Variants/sizes/states:** selected / focus-visible.
- **Interaction & keyboard:** as SegmentedControl.
- **A11y:** as SegmentedControl.
- **Responsive:** n/a
- **Depends on:** SegmentedControl
- **Foundation:** Radix via shadcn (ToggleGroup.Item)
- **Tests:** covered by SegmentedControl.

#### NativeSelect
- **Kind:** public
- **Purpose:** Styled native `<select>` (used on touch devices).
- **Props (datui API):** value?/defaultValue?: string | number | null; onChange?: (e, value) => void; placeholder?: string; selectType?: 'default' | 'plain' | 'accent' ('default'); multiline?: boolean; status?; before?; icon?: ReactNode (chevron); align?; disabled?; required?; name?; ref; slotProps?: { root?, select? }; children (`<option>`s)
- **Variants/sizes/states:** default / plain / accent; empty (placeholder) / filled; error; disabled.
- **Interaction & keyboard:** native picker.
- **A11y:** native semantics; placeholder as disabled hidden option.
- **Responsive:** primary choice on touch devices.
- **Depends on:** FormField, SelectTypography
- **Foundation:** custom
- **Tests:** placeholder when null; onChange value; selectType classes.

#### Select
- **Kind:** public
- **Purpose:** Adaptive select: CustomSelect on desktop, NativeSelect on touch devices, same `options` API.
- **Props (datui API):** union of CustomSelect props (options, value, onChange, searchable, ...); native?: boolean | 'auto' ('auto')
- **Variants/sizes/states:** as CustomSelect / NativeSelect.
- **Interaction & keyboard:** per rendered implementation.
- **A11y:** per rendered implementation.
- **Responsive:** switches by pointer/device (`(pointer: coarse)`), not width.
- **Depends on:** CustomSelect, NativeSelect
- **Foundation:** custom
- **Tests:** picks implementation by media query; options mapped to `<option>`s; value consistent across both.

#### CustomSelect
- **Kind:** public
- **Purpose:** Fully styled select / combobox with search, async loading, custom option rendering and clear button.
- **Props (datui API):** options: Array<{ value: string | number; label: ReactNode | string; disabled?: boolean; [k]: any }>; value?/defaultValue?: string | number | null; onChange?: (e, value) => void; placeholder?; searchable?: boolean (false); filterFn?: false | ((query, option) => boolean); onInputChange?; emptyText?: string; fetching?: boolean; renderOption?: (props) => ReactNode; renderDropdown?: ({ defaultDropdownContent }) => ReactNode; allowClearButton?: boolean (false); onOpen?/onClose?; popupDirection?: 'top' | 'bottom' | `${side}-${'start'|'end'}`; dropdownOffsetDistance?: number (0); dropdownAutoWidth?: boolean; forcePortal?: boolean; noMaxHeight?: boolean (false); selectType?; status?; mode?: 'default' | 'plain'; before?/after?; icon?; disabled?; readOnly?; name?; required?
- **Variants/sizes/states:** closed / open / searching / fetching / empty; error; disabled; selected / focused option.
- **Interaction & keyboard:** Down/Up open and move highlight; Enter/Space select; Esc closes; typing a printable char opens (and filters when searchable); Backspace/Delete open; hover moves highlight; selected option scrolled into view; hidden native select keeps form value.
- **A11y:** Combobox pattern: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-haspopup="listbox"`; listbox of `option`s; `aria-live` announces loading/result count.
- **Responsive:** use via Select for native fallback on touch; dropdown flips when no room.
- **Depends on:** CustomSelectDropdown, CustomSelectOption, CustomSelectInput, FormField
- **Foundation:** own listbox (combobox pattern) positioned with @floating-ui/react
- **Tests:** keyboard flow; filter with custom filterFn and `false`; clear button; fetching announcement; controlled vs uncontrolled; renderOption; form submit value.

#### CustomSelectInput
- **Kind:** internal (folded into CustomSelect)
- **Purpose:** Trigger field showing selected label or editable search text.
- **Props (datui API):** n/a
- **Variants/sizes/states:** readonly (not searchable) / editable; fetching spinner.
- **Interaction & keyboard:** as CustomSelect.
- **A11y:** carries combobox attributes.
- **Responsive:** n/a
- **Depends on:** CustomSelect
- **Foundation:** custom
- **Tests:** covered by CustomSelect.

#### CustomSelectClearButton
- **Kind:** internal (folded into CustomSelect; overridable via `ClearButton` slot)
- **Purpose:** Clear-value button in the trigger.
- **Props (datui API):** n/a
- **Variants/sizes/states:** visible when value set.
- **Interaction & keyboard:** button; clears and refocuses.
- **A11y:** hidden label "Clear".
- **Responsive:** n/a
- **Depends on:** CustomSelect
- **Foundation:** lucide-react (X)
- **Tests:** covered by CustomSelect.

#### CustomSelectDropdown
- **Kind:** public
- **Purpose:** Positioned, scrollable popup panel for CustomSelect/ChipsSelect (reusable for custom dropdowns).
- **Props (datui API):** targetRef: RefObject<HTMLElement>; placement?: Placement; offsetDistance?: number; autoWidth?: boolean (false = match trigger width); forcePortal?: boolean; fetching?: boolean (spinner); noMaxHeight?: boolean; onPlacementChange?: (p) => void; scrollBoxRef?; overscrollBehavior?
- **Variants/sizes/states:** top / bottom; fetching; max-height scroll.
- **Interaction & keyboard:** none itself (keyboard handled by owner).
- **A11y:** contains the `listbox`.
- **Responsive:** flips/shrinks to fit viewport.
- **Depends on:** Spinner
- **Foundation:** @floating-ui/react (or Radix Popover content)
- **Tests:** width matches trigger; flip reports placement; fetching spinner.

#### CustomSelectOption
- **Kind:** public
- **Purpose:** Option row: label, description, before/after, checkmark for selected, hierarchy indent.
- **Props (datui API):** children (label); description?: ReactNode; before?: ReactNode; after?: ReactNode; selected?: boolean; focused?: boolean; disabled?: boolean; hierarchy?: number (0); textNoWrap?: boolean
- **Variants/sizes/states:** default / focused (highlight) / selected (check) / disabled; nested levels.
- **Interaction & keyboard:** pointer move highlights, click selects (owner handles keys).
- **A11y:** `role="option"`, `aria-selected`, `aria-disabled`; stable id for activedescendant.
- **Responsive:** n/a
- **Depends on:** CustomSelect
- **Foundation:** lucide-react (Check)
- **Tests:** aria attributes; hierarchy indent; check icon.

#### SelectMimicry
- **Kind:** public
- **Purpose:** Element that looks like a select but just opens something else (modal, picker page).
- **Props (datui API):** children (value text); placeholder?: string; selectType?: 'default' | 'plain' | 'accent'; multiline?: boolean; status?; before?/after?; align?; disabled?; onClick
- **Variants/sizes/states:** empty / filled; error; disabled.
- **Interaction & keyboard:** button (Enter/Space).
- **A11y:** `role="button"` with `aria-haspopup` matching what it opens; placeholder vs value text.
- **Responsive:** same.
- **Depends on:** FormField, SelectTypography
- **Foundation:** custom
- **Tests:** keyboard activation; placeholder when empty; disabled.

#### SelectTypography
- **Kind:** internal (folded into NativeSelect/CustomSelect/SelectMimicry)
- **Purpose:** Text style for the displayed select value per `selectType`.
- **Props (datui API):** n/a
- **Variants/sizes/states:** default / plain / accent.
- **Interaction & keyboard:** none.
- **A11y:** none.
- **Responsive:** font size by density.
- **Depends on:** Typography
- **Foundation:** custom
- **Tests:** class per selectType.

#### ChipsInput
- **Kind:** public
- **Purpose:** Free-text tag input: typing + Enter (or delimiter) creates chips.
- **Props (datui API):** value?/defaultValue?: Option[]; onChange?: (value: Option[]) => void; inputValue?/defaultInputValue?: string; onInputChange?; delimiter?: string | RegExp | string[]; addOnBlur?: boolean; getOptionValue?/getOptionLabel?/getNewOptionData?; renderChip?: (props, option) => ReactNode; allowClearButton?: boolean; placeholder?; disabled?; readOnly?; status?; mode?; before?/after?; maxHeight?; chipsListLabel?: string
- **Variants/sizes/states:** empty / with chips; error; disabled; readOnly.
- **Interaction & keyboard:** Enter adds chip; pasting/typing a delimiter splits into chips; Backspace on empty input focuses last chip; Backspace/Delete on a focused chip removes it; Left/Right/Up/Down/Home/End move between chips; add on blur optional.
- **A11y:** wrapper `role="group"` with label; chips list `role="listbox" aria-orientation="horizontal"`, chips `option` with posinset/setsize and a description of the delete keys.
- **Responsive:** chips wrap; maxHeight scrolls.
- **Depends on:** ChipsInputBase, Chip, FormField
- **Foundation:** custom
- **Tests:** Enter add; delimiter split (string/regex/array); Backspace focus + delete; arrow navigation; dedupe; clear button; controlled/uncontrolled.

#### ChipsInputBase
- **Kind:** internal (folded into ChipsInput / ChipsSelect)
- **Purpose:** Shared chip list + input + keyboard model.
- **Props (datui API):** n/a
- **Variants/sizes/states:** n/a
- **Interaction & keyboard:** see ChipsInput.
- **A11y:** see ChipsInput.
- **Responsive:** n/a
- **Depends on:** Chip, FormField
- **Foundation:** custom
- **Tests:** covered by ChipsInput/ChipsSelect.

#### Chip
- **Kind:** public
- **Purpose:** Small removable token used in chips inputs (also standalone).
- **Props (datui API):** value?: string | number; children (label); mode?: 'primary' | 'secondary' ('primary'); removable?: boolean (true); onRemove?: (e, value) => void; removeLabel?: string ('Remove'); before?/after?: ReactNode; disabled?; readOnly?
- **Variants/sizes/states:** primary / secondary; removable; disabled; readOnly; focused.
- **Interaction & keyboard:** remove button click; Backspace/Delete when focused (in list).
- **A11y:** remove button labelled "Remove {label}"; `aria-disabled`/`aria-readonly`.
- **Responsive:** n/a
- **Depends on:** none
- **Foundation:** lucide-react (X)
- **Tests:** onRemove value; removable=false hides button; disabled.

#### ChipsSelect
- **Kind:** public
- **Purpose:** Multi-select with chips and a filterable dropdown, optionally creatable.
- **Props (datui API):** options?: Option[]; value?/defaultValue?/onChange; inputValue?/onInputChange; creatable?: boolean | string (false; string = "Create …" text); filterFn?: false | FilterFn; sortFn?: false | SortFn (false); selectedBehavior?: 'hide' | 'highlight' ('highlight'); closeAfterSelect?: boolean (true); emptyText?; fetching?; placement?: 'top' | 'bottom' ('bottom'); dropdownAutoWidth?; forcePortal?; noMaxHeight?; renderOption?: (props, option) => ReactNode; renderDropdown?; renderChip?; onOpen?/onClose?; onChangeStart?: (e, option) => void; allowClearButton?; delimiter?; addOnBlur?; status?; mode?; before?; icon?; disabled?; readOnly?
- **Variants/sizes/states:** closed / open / fetching / empty; selected options hidden or highlighted; creatable row.
- **Interaction & keyboard:** Up/Down open and move highlight; Enter adds highlighted option (or creates when creatable); Esc closes; typing filters; plus all ChipsInput chip keys.
- **A11y:** Combobox (`aria-expanded`, `aria-autocomplete="list"`, `aria-activedescendant`) + listbox; chips as in ChipsInput.
- **Responsive:** dropdown flips/fits viewport; works with touch.
- **Depends on:** ChipsInputBase, Chip, CustomSelectDropdown, CustomSelectOption
- **Foundation:** ChipsInputBase + own listbox positioned with @floating-ui/react
- **Tests:** keyboard select; creatable flow; hide vs highlight selected; filter/sort fns; closeAfterSelect; onChangeStart can intercept.

#### File
- **Kind:** public
- **Purpose:** Button that opens the native file picker.
- **Props (datui API):** children?: ReactNode ('Choose file'); accept?; capture?; multiple?; name?; disabled?; required?; onChange?: (e) => void; + Button visual props (mode, appearance, size, before, after, stretched); ref (input); slotProps?: { root?, input? }
- **Variants/sizes/states:** all Button variants; disabled.
- **Interaction & keyboard:** label wraps visually hidden `<input type="file">`; Enter/Space opens picker.
- **A11y:** input stays focusable; focus ring shown on the visual button.
- **Responsive:** same.
- **Depends on:** Button
- **Foundation:** custom
- **Tests:** keyboard opens input (click proxied); onChange; accept/multiple forwarded.

#### DropZone
- **Kind:** public
- **Purpose:** Drag-and-drop target area that highlights while files are dragged over it.
- **Props (datui API):** children?: ReactNode | ((p: { active: boolean }) => ReactNode); onDragOver?/onDragLeave?/onDrop?: DragEventHandler; (consumer handles files)
- **Variants/sizes/states:** idle / active (drag over).
- **Interaction & keyboard:** pointer drag only; pair with File for a keyboard path.
- **A11y:** not keyboard-reachable on its own; must contain a File button or equivalent; announce drop result via live region.
- **Responsive:** drag-and-drop mostly desktop; keep File fallback on mobile.
- **Depends on:** DropZoneGrid, File
- **Foundation:** custom
- **Tests:** active on dragover, cleared on leave/drop; render-prop receives active; nested stopPropagation respected.

#### DropZoneGrid
- **Kind:** public (DropZone.Grid)
- **Purpose:** Layout grid for several DropZones side by side.
- **Props (datui API):** direction?: 'row' | 'column' ('row'); children
- **Variants/sizes/states:** row / column.
- **Interaction & keyboard:** none.
- **A11y:** layout only.
- **Responsive:** row stacks to column on narrow widths.
- **Depends on:** DropZone
- **Foundation:** custom
- **Tests:** direction classes.

#### DateInput
- **Kind:** public
- **Purpose:** Segmented date (and optional time) field with calendar popover.
- **Props (datui API):** value?/defaultValue?: Date | null; onChange?: (value: Date | null) => void; enableTime?: boolean (false); closeOnChange?: boolean (true); disableCalendar?: boolean; calendarPlacement?: Placement; onCalendarOpenChange?: (open: boolean) => void; onApply?: (value?: Date) => void; renderCustomValue?: (date?: Date) => ReactNode; timezone?: string; + Calendar pass-through (disablePast, disableFuture, shouldDisableDate, minDateTime, maxDateTime, weekStartsOn, size, doneButton*); labels (calendarLabel, clearFieldLabel, showCalendarLabel, changeDayLabel, ...); status?; before?/after?; disabled?; readOnly?; disableFocusTrap?; restoreFocus?
- **Variants/sizes/states:** empty / filled; date-only / date+time; calendar open; error; disabled.
- **Interaction & keyboard:** Type digits into DD.MM.YYYY (HH:MM) segments with auto-advance; Left/Right move segment; Backspace clears segment and moves back; clear button; Esc closes calendar; focus trapped in popover.
- **A11y:** wrapper `role="group"` labelled by label + current value; each segment a spinbutton-like input with own label; calendar is a dialog.
- **Responsive:** popover on desktop; consider a bottom sheet (vaul) on mobile.
- **Depends on:** Calendar, FormField, Popover, IconButton
- **Foundation:** react-day-picker+date-fns, Radix via shadcn (Popover)
- **Tests:** segment typing/auto-advance; invalid dates rejected; clear; calendar selection updates segments; closeOnChange; timezone handling; Esc.

#### DateRangeInput
- **Kind:** public
- **Purpose:** Segmented start–end date field with range calendar popover.
- **Props (datui API):** value?/defaultValue?: [Date | null, Date | null] | null; onChange?: (value) => void; closeOnChange?: boolean (true); disableCalendar?; calendarPlacement?; onCalendarOpenChange?; + CalendarRange pass-through (disablePast, disableFuture, shouldDisableDate, weekStartsOn); labels for start/end day/month/year, clear, show calendar; status?; before?/after?; disabled?; disableFocusTrap?; restoreFocus?
- **Variants/sizes/states:** empty / partial / complete range; open; error; disabled.
- **Interaction & keyboard:** as DateInput, six segments (start DD.MM.YYYY – end DD.MM.YYYY).
- **A11y:** as DateInput; separate labels for start and end segments.
- **Responsive:** two-month calendar on desktop, one month (or sheet) on mobile.
- **Depends on:** CalendarRange, FormField, Popover
- **Foundation:** react-day-picker+date-fns, Radix via shadcn (Popover)
- **Tests:** segment entry for both ends; start>end ordering; clear; calendar sync.

#### Calendar
- **Kind:** public
- **Purpose:** Month grid date picker with month/year pickers and optional time selection.
- **Props (datui API):** value?/defaultValue?: Date | null; onChange?: (value: Date) => void; viewDate?: Date; onViewDateChange?: (d: Date) => void; disablePast?/disableFuture?: boolean; shouldDisableDate?: (d: Date) => boolean; minDateTime?/maxDateTime?: Date; enableTime?: boolean (false); disablePickers?: boolean; weekStartsOn?: 0-6 (1); showNeighboringMonth?: boolean; size?: 's' | 'm' ('m'); renderDayContent?: (d: Date) => ReactNode; timezone?: string; doneButton (doneButtonText?, doneButtonShow?, doneButtonDisabled?, onDoneButtonClick?); labels (prev/next month, change month/year/hours/minutes)
- **Variants/sizes/states:** s / m; with time; today, selected, disabled, focused, outside-month days.
- **Interaction & keyboard:** Arrow keys move day (crossing months changes view); PageUp/PageDown month; Home/End week edges; Enter/Space select; Tab leaves grid keeping roving focus day.
- **A11y:** APG date-grid: `role="grid"`, `columnheader` with full day names, `gridcell` with `aria-selected`, `aria-current="date"` for today; month name in polite live region.
- **Responsive:** size 's' for tight spaces; time disallowed at 's'.
- **Depends on:** CalendarHeader, CalendarDays, CalendarDay, CalendarTime
- **Foundation:** react-day-picker+date-fns
- **Tests:** keyboard navigation incl. month boundary; disabled dates; min/max datetime; weekStartsOn; time change keeps date; timezone.

#### CalendarHeader
- **Kind:** public
- **Purpose:** Month navigation bar: prev/next arrows and month/year dropdowns.
- **Props (datui API):** viewDate: Date; onChange: (viewDate: Date) => void; onPrevMonth?/onNextMonth?: () => void; prevMonthHidden?/nextMonthHidden?: boolean; disablePickers?: boolean; isMonthDisabled?: (m: number, y?: number) => boolean; isYearDisabled?: (y: number) => boolean; prevMonthIcon?/nextMonthIcon?: ReactNode; labels (prevMonth, nextMonth, changeMonth, changeYear)
- **Variants/sizes/states:** with pickers / plain title; arrows hidden.
- **Interaction & keyboard:** arrow buttons; month/year selects (Esc inside open select doesn't close parent popover).
- **A11y:** labelled icon buttons; selects labelled.
- **Responsive:** n/a
- **Depends on:** CustomSelect, IconButton
- **Foundation:** react-day-picker+date-fns (Caption/Dropdowns), lucide-react
- **Tests:** prev/next change month; disabled months/years; Esc propagation stop.

#### CalendarDays
- **Kind:** internal (folded into Calendar/CalendarRange)
- **Purpose:** Weekday header + 6-week day grid.
- **Props (datui API):** n/a (Calendar exposes `renderDayContent`, `dayProps`)
- **Variants/sizes/states:** s / m.
- **Interaction & keyboard:** see Calendar.
- **A11y:** grid/row/columnheader/gridcell roles, row/col indexes.
- **Responsive:** n/a
- **Depends on:** CalendarDay
- **Foundation:** react-day-picker+date-fns
- **Tests:** correct week layout for weekStartsOn; neighbouring month days.

#### CalendarDay
- **Kind:** internal (folded into Calendar; customisable via `renderDayContent`/`dayProps`)
- **Purpose:** One day cell with selection, range and hint (hover preview) states.
- **Props (datui API):** n/a
- **Variants/sizes/states:** today, selected, selectionStart/End, hinted (+start/end), active, disabled, focused, hidden, sameMonth.
- **Interaction & keyboard:** click select; hover enter/leave drive range hint.
- **A11y:** button inside gridcell; full date as accessible name.
- **Responsive:** n/a
- **Depends on:** CalendarDays
- **Foundation:** react-day-picker+date-fns
- **Tests:** state classes; accessible name.

#### CalendarRange
- **Kind:** public
- **Purpose:** Two-month range picker with hover preview of the pending range.
- **Props (datui API):** value?/defaultValue?: [Date | null, Date | null] | null; onChange?: (value: [Date | null, Date | null]) => void; disablePast?/disableFuture?; shouldDisableDate?; disablePickers?; weekStartsOn?: 0-6 (1); renderDayContent?; header labels and icons
- **Variants/sizes/states:** no selection / start picked (hint follows hover) / range complete.
- **Interaction & keyboard:** first click sets start, second sets end (swaps if earlier); arrow-key grid navigation as Calendar; shared view advances both months.
- **A11y:** as Calendar; announce range start/end selection.
- **Responsive:** two months side by side on desktop, one on mobile.
- **Depends on:** CalendarHeader, CalendarDays
- **Foundation:** react-day-picker+date-fns (mode="range")
- **Tests:** two-click range; reversed click order; hint highlighting; disabled dates inside range.

#### CalendarTime
- **Kind:** internal (folded into Calendar via `enableTime`)
- **Purpose:** Hours/minutes pickers plus "Done" button under the calendar.
- **Props (datui API):** n/a (Calendar's `doneButton*`, `changeHoursLabel`, `changeMinutesLabel`)
- **Variants/sizes/states:** time option disabled when outside min/max.
- **Interaction & keyboard:** type-ahead combobox per unit; Up/Down change value; Enter on field applies; Done button.
- **A11y:** each picker is a labelled combobox.
- **Responsive:** n/a
- **Depends on:** Calendar, Button
- **Foundation:** custom (or Radix Select)
- **Tests:** hour/minute change keeps date; disabled times; Up/Down wrap.

#### WriteBar
- **Kind:** public
- **Purpose:** Chat/message composer: auto-growing textarea with `before`, `inlineAfter` and `after` action slots.
- **Props (datui API):** value?/defaultValue?/onChange; placeholder?; before?: ReactNode; inlineAfter?: ReactNode; after?: ReactNode; onHeightChange?: () => void; shadow?: boolean (false); disabled?; ref (textarea); slotProps?: { root?, textArea? }; + native textarea attrs
- **Variants/sizes/states:** empty / has text; with shadow; disabled.
- **Interaction & keyboard:** textarea auto-grows; Enter behaviour left to consumer (document Shift+Enter pattern).
- **A11y:** textarea needs label; action buttons labelled.
- **Responsive:** pinned above keyboard with safe-area inset on mobile.
- **Depends on:** WriteBarIcon, Textarea auto-resize logic
- **Foundation:** custom
- **Tests:** grow + onHeightChange; slots render; children disallowed.

#### WriteBarIcon
- **Kind:** public
- **Purpose:** Preset icon button for WriteBar (attach, send, done) with optional counter.
- **Props (datui API):** mode?: 'attach' | 'send' | 'done'; count?: number; label?: string; children? (custom icon); disabled?; onClick
- **Variants/sizes/states:** attach / send (accent) / done / custom; with counter; disabled.
- **Interaction & keyboard:** button.
- **A11y:** default label per mode; dev warning if custom icon has no label.
- **Responsive:** n/a
- **Depends on:** WriteBar, Counter
- **Foundation:** lucide-react (Paperclip, Send, Check)
- **Tests:** icon/label per mode; count badge; accessible name warning.

#### Removable
- **Kind:** public
- **Purpose:** Wraps a row/field with a remove action.
- **Props (datui API):** onRemove?: (e: MouseEvent, rootEl?: HTMLElement | null) => void; removePlaceholder?: ReactNode ('Remove'); align?: 'start' | 'center' ('center'); indent?: boolean (false); noPadding?: boolean; disabled?: boolean; children: ReactNode | ((p: { isRemoving: boolean }) => ReactNode); variant?: 'button' | 'reveal' ('button')
- **Variants/sizes/states:** button = trailing X; reveal = leading minus button that slides content to reveal a destructive "Remove" button (two-step); isRemoving.
- **Interaction & keyboard:** reveal: activate minus → focus moves to Remove button; Esc/blur/click outside collapses.
- **A11y:** X/minus buttons labelled "Remove"; revealed button has visible text.
- **Responsive:** reveal variant suits touch; button variant default on desktop.
- **Depends on:** IconButton
- **Foundation:** lucide-react (X, MinusCircle)
- **Tests:** onRemove fires; reveal flow focus management and collapse; render-prop isRemoving; disabled.

#### RemovableIos
- **Kind:** replaced (by Removable `variant="reveal"`, single design across platforms)
- **Purpose:** Two-step reveal-to-delete layout.
- **Props (datui API):** n/a
- **Variants/sizes/states:** see Removable.
- **Interaction & keyboard:** see Removable.
- **A11y:** see Removable.
- **Responsive:** n/a
- **Depends on:** Removable
- **Foundation:** lucide-react
- **Tests:** covered by Removable.

## Data display

#### Avatar
- **Kind:** public
- **Purpose:** Round user/entity image with initials or icon fallback when the image is missing or fails.
- **Props (datui API):** src: string; alt: string; size: 16|20|24|28|32|36|40|44|48|56|64|72|80|88|96 | number (48); initials?: string (overrides fallbackIcon); gradientColor?: 1-6 | 'red'|'orange'|'yellow'|'green'|'light-blue'|'violet'|'custom'; fallbackIcon?: ReactElement; noBorder?: boolean (false); withTransparentBackground?: boolean; objectFit?: CSSProperties['objectFit'] ('cover'); objectPosition?: string; filter?: string; onLoad/onError; children (Avatar.Badge, Avatar.Overlay)
- **Variants/sizes/states:** 15 fixed sizes + numeric; states loading / loaded / error->initials->icon; initials font size scales with size.
- **Interaction & keyboard:** None by itself; interactive only via Avatar.Overlay (onClick) or a wrapping button/link.
- **A11y:** `img` with required `alt`; decorative border is `aria-hidden`; initials fallback exposes alt text as accessible name.
- **Responsive:** Fixed pixel size; no breakpoint behavior.
- **Depends on:** ImageOverlay, AvatarBadge
- **Foundation:** Radix via shadcn (Avatar)
- **Tests:** renders img; falls back to initials on error; initials beat fallbackIcon; gradient class per color; size maps to px; alt passed through.

#### AvatarBadge
- **Kind:** public (Avatar.Badge; preset variant merged in)
- **Purpose:** Small icon badge pinned to the bottom-end corner of an Avatar/GridAvatar (e.g. online dot, verified).
- **Props (datui API):** children: ReactElement (icon); background?: 'stroke'|'shadow' ('stroke'); preset?: 'online'|'online-mobile' (renders built-in icon, replaces children)
- **Variants/sizes/states:** stroke vs shadow ring; badge position shifts inward for sizes < 96; icon size derived from parent size via context.
- **Interaction & keyboard:** None.
- **A11y:** Decorative by default; pass a visually-hidden label (e.g. "Online") when meaning matters.
- **Responsive:** Scales with parent avatar size.
- **Depends on:** Avatar (context for size)
- **Foundation:** custom
- **Tests:** positions at corner; preset renders correct icon; icon receives width/height from avatar size.

#### ImageOverlay
- **Kind:** public (Avatar.Overlay / Image.Overlay, shared)
- **Purpose:** Content layer over an Avatar/Image (e.g. camera icon to change photo), shown on hover or always.
- **Props (datui API):** theme?: 'light'|'dark' ('light'); visibility?: 'on-hover'|'always' ('on-hover'); onClick?: (e) => void; aria-label?: string; children
- **Variants/sizes/states:** light/dark tint; hidden/shown; interactive vs non-interactive.
- **Interaction & keyboard:** With onClick: focusable, Enter/Space activate; shows on hover and focus-visible. Without onClick on touch: first tap reveals overlay.
- **A11y:** Renders as `button` (role=button, tabIndex 0) only when onClick is set; requires aria-label then.
- **Responsive:** On touch devices "on-hover" becomes tap-to-reveal.
- **Depends on:** Avatar, Image
- **Foundation:** custom
- **Tests:** hidden until hover/focus; always mode visible; keyboard activation; no role when non-interactive.

#### GridAvatar
- **Kind:** public
- **Purpose:** Avatar showing up to 4 images in a grid (group chat / multi-user).
- **Props (datui API):** src: string[] (1-4 items, extras ignored); size (48); alt: string; noBorder?: boolean; children (GridAvatar.Badge)
- **Variants/sizes/states:** 1, 2, 3, 4-tile layouts; same size scale as Avatar.
- **Interaction & keyboard:** None.
- **A11y:** Container has `role="img"` + alt/aria-label; inner tiles `aria-hidden`.
- **Responsive:** Fixed size.
- **Depends on:** Avatar internals, AvatarBadge
- **Foundation:** custom
- **Tests:** layout per count; >4 truncated with dev warning; label on root.

#### GridAvatarBadge
- **Kind:** internal (folded into AvatarBadge; GridAvatar.Badge re-exports it)
- **Purpose:** Corner badge for GridAvatar.
- **Props (datui API):** same as AvatarBadge
- **Variants/sizes/states:** same as AvatarBadge.
- **Interaction & keyboard:** None.
- **A11y:** Decorative.
- **Responsive:** Scales with grid size.
- **Depends on:** AvatarBadge
- **Foundation:** custom
- **Tests:** covered by AvatarBadge tests inside GridAvatar.

#### UsersStack
- **Kind:** public
- **Purpose:** Overlapping row of small avatars with "+N" counter and optional caption text.
- **Props (datui API):** photos: (string | { src: string; renderWrapper?: (props) => ReactNode })[]; size?: 's'|'m'|'l' ('s'); visibleCount?: number (3); count?: number (photos.length - visibleCount; hidden if > 99); avatarsPosition?: 'inline-start'|'block-start'|'inline-end' ('inline-start'); children (caption text)
- **Variants/sizes/states:** s/m/l; counter hidden at size s; caption beside or above.
- **Interaction & keyboard:** None (renderWrapper lets each photo be wrapped e.g. in a Tooltip).
- **A11y:** Avatars and counter `aria-hidden`; caption text carries meaning; consumers should put "N people" in caption or aria-label.
- **Responsive:** Fixed size; caption wraps.
- **Depends on:** Avatar
- **Foundation:** custom (SVG mask cut-outs or ring borders)
- **Tests:** visibleCount respected; counter math and >99 hide; position variants; renderWrapper called per photo.

#### Badge
- **Kind:** public
- **Purpose:** Tiny dot indicator (e.g. "new") placed next to a title or icon.
- **Props (datui API):** mode?: 'new'|'prominent' ('new'); children?: string (screen-reader-only label)
- **Variants/sizes/states:** new (accent) vs prominent (red).
- **Interaction & keyboard:** None.
- **A11y:** Children rendered visually hidden as the accessible text; dot itself is decorative.
- **Responsive:** None.
- **Depends on:** VisuallyHidden
- **Foundation:** custom
- **Tests:** mode class; children visually hidden but in a11y tree.

#### ContentBadge
- **Kind:** public
- **Purpose:** Pill/tag with text and optional icons (status, category label).
- **Props (datui API):** mode?: 'primary'|'secondary'|'outline' ('primary'); appearance?: 'accent'|'neutral'|'positive'|'negative'|'overlay' | `var(--x)` | `#RRGGBB` ('accent'); size?: 's'|'m'|'l' ('m'); capsule?: boolean (ignored at s); weight?: '1'|'2'|'3'; children (text + ContentBadge.IconSlot)
- **Variants/sizes/states:** 3 modes x appearances x 3 sizes; custom color maps per mode (fill / 16% tint / border); icon-only vs icon+text paddings.
- **Interaction & keyboard:** None (static).
- **A11y:** Plain inline text; icon-only badges need aria-label.
- **Responsive:** None.
- **Depends on:** ContentBadgeIconSlot
- **Foundation:** custom (shadcn Badge as starting point)
- **Tests:** custom hex/var color applied per mode; icon size by size + single-icon detection; size s drops icons.

#### ContentBadgeIconSlot
- **Kind:** public (ContentBadge.IconSlot)
- **Purpose:** Wrapper for an icon inside ContentBadge that sizes it and tells the badge whether it is icon-only.
- **Props (datui API):** children: ReactElement (icon)
- **Variants/sizes/states:** icon 12/16/20 px depending on badge size and single-icon state.
- **Interaction & keyboard:** None.
- **A11y:** Icon `aria-hidden`.
- **Responsive:** None.
- **Depends on:** ContentBadge (context)
- **Foundation:** lucide-react
- **Tests:** registers with context; correct icon px per size.

#### Counter
- **Kind:** public
- **Purpose:** Numeric count pill (unread count) used in tabs, buttons, cells.
- **Props (datui API):** children: ReactNode (number); mode?: 'primary'|'contrast'|'tertiary'|'inherit' ('primary'); appearance?: 'accent'|'neutral'|'accent-green'|'accent-red'|'custom' ('accent'); color?: string (only with custom); size?: 's'|'m' ('m')
- **Variants/sizes/states:** filled / contrast / tertiary (text-only) / inherit; 2 sizes.
- **Interaction & keyboard:** None.
- **A11y:** Plain text; consumer adds context (e.g. visually-hidden "unread").
- **Responsive:** None.
- **Depends on:** none
- **Foundation:** custom
- **Tests:** mode x appearance classes; custom color affects bg vs text per mode; empty children renders nothing.

#### Image
- **Kind:** public
- **Purpose:** Rounded-rect image thumbnail with fallback icon, badges, overlay and floating elements.
- **Props (datui API):** src: string; alt: string; size (48) or widthSize/heightSize: number|string; borderRadius?: 's'|'m'|'l' ('m'); per-corner borderStartStartRadius/StartEnd/EndStart/EndEnd?: 's'|'m'|'l'; fallbackIcon?: ReactElement; noBorder?: boolean; keepAspectRatio?: boolean; objectFit/objectPosition/filter; withTransparentBackground?: boolean; children (Image.Badge, Image.Overlay, Image.FloatElement)
- **Variants/sizes/states:** size scale or free width/height; radius s/m/l; loading/loaded/error.
- **Interaction & keyboard:** Only via Overlay or wrapper.
- **A11y:** `img` with alt; fallback container gets role=img + label.
- **Responsive:** widthSize accepts '100%'; keepAspectRatio for fluid layouts.
- **Depends on:** ImageBadge, ImageOverlay, ImageFloatElement
- **Foundation:** custom
- **Tests:** fallback on error; radius classes incl. per-corner; aspect ratio; alt.

#### ImageBadge
- **Kind:** public (Image.Badge)
- **Purpose:** Corner icon badge on Image.
- **Props (datui API):** children: ReactElement (icon); background?: 'stroke'|'shadow' ('stroke')
- **Variants/sizes/states:** stroke/shadow; shifted inward for size < 96.
- **Interaction & keyboard:** None.
- **A11y:** Decorative unless labelled.
- **Responsive:** Scales with image size.
- **Depends on:** Image (context)
- **Foundation:** custom
- **Tests:** corner position; icon size from context.

#### ImageFloatElement
- **Kind:** public (Image.FloatElement)
- **Purpose:** Arbitrary element pinned to one of 9 positions over an Image (e.g. duration label, remove button).
- **Props (datui API):** placement: 'top-start'|'top'|'top-end'|'start'|'center'|'end'|'bottom-start'|'bottom'|'bottom-end'; inlineIndent?/blockIndent?: 's'|'m'|'l'|number; visibility?: 'always'|'on-hover' ('always'); children
- **Variants/sizes/states:** 9 placements; hover-only visibility.
- **Interaction & keyboard:** on-hover elements also show on focus-within.
- **A11y:** Pass-through; interactive children must be focusable.
- **Responsive:** None.
- **Depends on:** Image
- **Foundation:** custom
- **Tests:** placement styles; indent values; on-hover shown on hover and focus-within.

#### Card
- **Kind:** public
- **Purpose:** Plain surface container for grouping content.
- **Props (datui API):** mode?: 'tint'|'shadow'|'outline'|'outline-tint'|'plain' ('tint'); asChild?: boolean (replaces Component/render); children
- **Variants/sizes/states:** 5 surface modes.
- **Interaction & keyboard:** None (wrap in link/button via asChild for clickable cards).
- **A11y:** Generic div by default; semantic element via asChild.
- **Responsive:** Full width of parent; radius may drop on compact inside full-bleed groups.
- **Depends on:** none
- **Foundation:** custom (shadcn Card)
- **Tests:** mode classes; asChild renders child element.

#### ContentCard
- **Kind:** public
- **Purpose:** Tappable card with optional top image, overTitle, title, description and caption.
- **Props (datui API):** src?: string; alt?: string (''); srcSet/sizes/loading etc. image attrs; maxHeight?: number; imageObjectFit?: CSSProperties['objectFit']; overTitle?, title?, description?, caption?: ReactNode; titleAs?: ElementType ('span'); mode?: Card['mode'] ('shadow'); onClick?/href?; disabled?: boolean
- **Variants/sizes/states:** Card modes; hover/active/disabled; with/without image.
- **Interaction & keyboard:** Whole card is a button or link when onClick/href; Enter/Space; hover/active feedback.
- **A11y:** Renders `a`/`button` when interactive; image alt defaults to '' (decorative); title can be a heading via titleAs.
- **Responsive:** Fluid width; image capped by maxHeight.
- **Depends on:** Card, Tappable
- **Foundation:** custom
- **Tests:** renders link vs button vs div; image attrs forwarded; maxHeight applied; disabled blocks click.

#### Banner
- **Kind:** public
- **Purpose:** Promo/announcement block with before slot, title, subtitles, actions and dismiss/chevron.
- **Props (datui API):** mode?: 'tint'|'image' ('tint'); size?: 's'|'m' ('s'); before?: ReactNode; title?, subtitle?, extraSubtitle?: ReactNode; actions?: ReactNode; after?: 'dismiss'|'chevron'|ReactNode; onDismiss?: (e) => void; dismissLabel?: string ('Dismiss'); background?: ReactNode (image mode); imageTheme?: 'light'|'dark'|'auto' ('dark'); onClick?/href?
- **Variants/sizes/states:** tint vs image; s/m; light/dark text on image; dismissible; clickable.
- **Interaction & keyboard:** Whole banner may be clickable; dismiss is a separate button (stopPropagation); chevron implies navigation.
- **A11y:** Dismiss is an icon button with aria-label=dismissLabel; background `aria-hidden`.
- **Responsive:** Full width; actions stack per ButtonGroup layout.
- **Depends on:** Button, IconButton, Tappable, Chevron
- **Foundation:** lucide-react (X, ChevronRight)
- **Tests:** onDismiss fires without triggering onClick; image mode text color by theme; after variants.

#### Placeholder
- **Kind:** public
- **Purpose:** Empty-state block: icon, title, description, action.
- **Props (datui API):** icon?: ReactNode; title?: ReactNode; children (description); action?: ReactNode; stretched?: boolean (fills available height, centered); noPadding?: boolean
- **Variants/sizes/states:** default vs stretched; padded vs flush.
- **Interaction & keyboard:** None (action is consumer's button).
- **A11y:** Title rendered as heading (h2 level by default, overridable).
- **Responsive:** Centered column; stretched fills parent/viewport.
- **Depends on:** PlaceholderContainer, PlaceholderIcon, PlaceholderTitle, PlaceholderDescription, PlaceholderActions
- **Foundation:** custom
- **Tests:** slots render only when provided; stretched class; heading level.

#### PlaceholderContainer
- **Kind:** public (Placeholder.Container)
- **Purpose:** Layout wrapper for composing a custom placeholder from parts.
- **Props (datui API):** stretched?: boolean; noPadding?: boolean; children
- **Variants/sizes/states:** stretched / noPadding.
- **Interaction & keyboard:** None.
- **A11y:** Generic div.
- **Responsive:** Same as Placeholder.
- **Depends on:** none
- **Foundation:** custom
- **Tests:** classes for stretched/noPadding.

#### PlaceholderIcon
- **Kind:** public (Placeholder.Icon)
- **Purpose:** Icon area with fixed spacing/color.
- **Props (datui API):** children
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** None.
- **A11y:** Icon decorative.
- **Responsive:** None.
- **Depends on:** none
- **Foundation:** custom
- **Tests:** renders children.

#### PlaceholderTitle
- **Kind:** public (Placeholder.Title)
- **Purpose:** Placeholder heading.
- **Props (datui API):** as?: ElementType ('h2'); children
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** None.
- **A11y:** Heading element.
- **Responsive:** None.
- **Depends on:** Typography (Title)
- **Foundation:** custom
- **Tests:** `as` changes tag.

#### PlaceholderDescription
- **Kind:** public (Placeholder.Description)
- **Purpose:** Secondary text under the title.
- **Props (datui API):** as?: ElementType ('div'); children
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** None.
- **A11y:** Text.
- **Responsive:** None.
- **Depends on:** Typography (Headline)
- **Foundation:** custom
- **Tests:** renders text.

#### PlaceholderActions
- **Kind:** public (Placeholder.Actions)
- **Purpose:** Spacing wrapper for action buttons.
- **Props (datui API):** children
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** None.
- **A11y:** Generic div.
- **Responsive:** None.
- **Depends on:** none
- **Foundation:** custom
- **Tests:** renders children.

#### SimpleCell
- **Kind:** public
- **Purpose:** Base list row: before slot, title with badges, subtitle lines, indicator, after slot, chevron.
- **Props (datui API):** children (title); before?, after?, indicator?: ReactNode; overTitle?, subtitle?, extraSubtitle?: ReactNode; badgeBeforeTitle?, badgeAfterTitle?, badgeBeforeSubtitle?, badgeAfterSubtitle?: ReactNode; chevron?: boolean (false; replaces 'auto'|'always'); chevronSize?: 's'|'m' ('m'); multiline?: boolean (false); disabled?: boolean; onClick?/href?/asChild; hasHover?/hasActive?: boolean (true)
- **Variants/sizes/states:** single vs multiline; hover/active/disabled; with chevron.
- **Interaction & keyboard:** Button or link when onClick/href (Enter/Space); otherwise static.
- **A11y:** Renders `button`/`a`/`div`; slots don't steal focus; long text truncated with title kept in DOM.
- **Responsive:** Paddings/heights tighten on compact density.
- **Depends on:** Tappable, Chevron
- **Foundation:** custom
- **Tests:** all slots render in order; link vs button; disabled; multiline toggles truncation; chevron.

#### Chevron
- **Kind:** internal (folded into SimpleCell/Banner)
- **Purpose:** Right-pointing chevron icon (RTL-aware) for navigational rows.
- **Props (datui API):** size?: 's'|'m' ('m')
- **Variants/sizes/states:** 2 sizes.
- **Interaction & keyboard:** None.
- **A11y:** `aria-hidden`.
- **Responsive:** None.
- **Depends on:** none
- **Foundation:** lucide-react (ChevronRight)
- **Tests:** flips in RTL.

#### Cell
- **Kind:** public
- **Purpose:** SimpleCell with list-editing modes: selectable (checkbox), removable (delete button), draggable (reorder handle).
- **Props (datui API):** all SimpleCell props; mode?: 'selectable'|'removable'; checked?/defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void; name?, value?: string; onRemove?: (e, rootEl) => void; removeLabel?: string ('Remove'); draggable?: boolean; onDragFinish?: ({ from: number; to: number }) => void; dragHandleLabel?: string ('Reorder')
- **Variants/sizes/states:** default / selectable (checked, unchecked) / removable / draggable (dragging lifts row, disables click+hover).
- **Interaction & keyboard:** selectable: whole row is a `label`, click/Space toggles; removable: trailing X button calls onRemove (iOS-style "reveal then confirm" dropped for one design); draggable: handle in before slot, pointer drag reorders visually and reports {from,to} without reordering DOM (consumer reorders) - datui must add keyboard reorder (Space to lift, arrows to move, Space to drop, Escape to cancel); clicks suppressed while dragging.
- **A11y:** List item inside List (`role="listitem"`); checkbox is a real `input type=checkbox`; remove and drag handles are buttons with labels; drag announcements via live region.
- **Responsive:** Handle/checkbox icons 20px compact, 24px regular.
- **Depends on:** SimpleCell, CellCheckbox, CellDragger, Removable, List
- **Foundation:** @dnd-kit (sortable) + Radix via shadcn (Checkbox)
- **Tests:** controlled vs uncontrolled checked; onRemove gets root el; drag reports from/to; keyboard reorder; onClick not fired while dragging; disabled blocks all modes.

#### CellCheckbox
- **Kind:** internal (folded into Cell `selectable` mode; a visually hidden native checkbox/radio with a token-styled indicator)
- **Purpose:** Checkbox visual used in selectable Cell (also usable standalone in custom rows).
- **Props (datui API):** checked?/defaultChecked?: boolean; onCheckedChange?; name?, value?; disabled?; shape?: 'square'|'circle' ('square')
- **Variants/sizes/states:** square/circle; on/off/disabled; 20/24 px by density.
- **Interaction & keyboard:** Space toggles (native input).
- **A11y:** Native checkbox visually hidden; icons `aria-hidden`; label comes from the enclosing row.
- **Responsive:** Icon size by density.
- **Depends on:** none
- **Foundation:** Radix via shadcn (Checkbox)
- **Tests:** toggles; shape icons; disabled.

#### CellDragger
- **Kind:** internal (folded into Cell)
- **Purpose:** Drag handle that drives row reordering.
- **Props (datui API):** label: string; disabled?: boolean; onDragStateChange?: (dragging: boolean) => void
- **Variants/sizes/states:** idle/dragging/disabled.
- **Interaction & keyboard:** Pointer drag on the Y axis, plus keyboard reordering through the dnd-kit keyboard sensor.
- **A11y:** Button with visually-hidden label; `aria-roledescription="sortable"`.
- **Responsive:** None.
- **Depends on:** Cell, List
- **Foundation:** @dnd-kit
- **Tests:** drag state callback; keyboard sensor moves item.

#### Removable
- **Kind:** internal (folded into Cell mode="removable")
- **Purpose:** Wraps content with a trailing remove button.
- **Props (datui API):** onRemove; removeLabel; align?: 'start'|'center' ('center'); indent?: boolean (keeps space, hides button)
- **Variants/sizes/states:** aligned start/center; indent placeholder.
- **Interaction & keyboard:** Button click/Enter removes; preventDefault so row click doesn't fire.
- **A11y:** Icon button with aria-label.
- **Responsive:** None.
- **Depends on:** IconButton
- **Foundation:** lucide-react (X)
- **Tests:** remove fires once; row onClick not fired.

#### RichCell
- **Kind:** public
- **Purpose:** Taller row for rich content: large avatar, title, subtitles, meta, bottom slot, action buttons.
- **Props (datui API):** children (title); before?, after?: ReactNode; overTitle?, subtitle?, extraSubtitle?: ReactNode; meta?, submeta?: ReactNode; bottom?: ReactNode (e.g. UsersStack); actions?: ReactNode; beforeAlign?/contentAlign?/afterAlign?: 'start'|'center'|'end'; multiline?: boolean; disabled?; onClick?/href?
- **Variants/sizes/states:** alignments; multiline; hover/active/disabled.
- **Interaction & keyboard:** Row is button/link when interactive; nested actions must not be inside the row button (render actions outside the tappable area or use row-link overlay pattern).
- **A11y:** Avoid nested interactive elements; title text is the accessible name.
- **Responsive:** Actions wrap below content on narrow widths.
- **Depends on:** Tappable, RichCellIcon
- **Foundation:** custom
- **Tests:** slot order; alignment classes; actions clickable without triggering row click.

#### RichCellIcon
- **Kind:** public (RichCell.Icon)
- **Purpose:** Fixed-size wrapper for an icon used in RichCell before/after.
- **Props (datui API):** children
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** None.
- **A11y:** Decorative.
- **Responsive:** None.
- **Depends on:** RichCell
- **Foundation:** custom
- **Tests:** renders children.

#### HorizontalCell
- **Kind:** public
- **Purpose:** Vertical tile (image on top, text below) for horizontal scrolling lists.
- **Props (datui API):** children (image/avatar); title?, subtitle?, extraSubtitle?: ReactNode; size?: 's'|'m'|'l'|'xl'|'auto'|number ('s'); textAlign?: 'start'|'center'|'end' (center for s, else start); noPadding?: boolean; titleAs?: ElementType; onClick?/href?; disabled?
- **Variants/sizes/states:** 4 width tokens + auto + px; hover/active.
- **Interaction & keyboard:** Tappable tile; Enter/Space.
- **A11y:** Button/link with title as name; usually placed in a `role=list` scroller.
- **Responsive:** Fixed tile widths; parent HorizontalScroll handles overflow.
- **Depends on:** Tappable, Avatar/Image
- **Foundation:** custom
- **Tests:** width per size; numeric width; textAlign default per size.

#### MiniInfoCell
- **Kind:** public
- **Purpose:** Compact info line with small icon (e.g. profile details "Lives in X", "Add info", "More").
- **Props (datui API):** before?: ReactNode (20px icon); after?: ReactNode; children; mode?: 'base'|'accent'|'add'|'more' ('base'); textWrap?: 'nowrap'|'short'|'full' ('nowrap'; short = 3 lines); chevron?: boolean; onClick?
- **Variants/sizes/states:** 4 color modes; wrap modes; hover/active when clickable.
- **Interaction & keyboard:** Button when onClick; otherwise static.
- **A11y:** Button vs div; icon decorative.
- **Responsive:** None.
- **Depends on:** Tappable, Chevron
- **Foundation:** custom
- **Tests:** wrap modes (line-clamp); mode colors; clickable vs static tag.

#### InfoRow
- **Kind:** public
- **Purpose:** Label + value pair (small header over content).
- **Props (datui API):** header: ReactNode (required); children
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** None.
- **A11y:** Header and value separated by a visually-hidden space so screen readers don't run them together; consider `dl/dt/dd` semantics option.
- **Responsive:** None.
- **Depends on:** Typography
- **Foundation:** custom
- **Tests:** header rendered above; hidden separator present.

#### List
- **Kind:** public
- **Purpose:** Container for Cells; hosts drag-and-drop reorder context.
- **Props (datui API):** gap?: number (0); children
- **Variants/sizes/states:** gap; dragging state.
- **Interaction & keyboard:** Provides sortable context for draggable Cells.
- **A11y:** `role="list"`; children `role="listitem"`.
- **Responsive:** None.
- **Depends on:** Cell
- **Foundation:** @dnd-kit (SortableContext)
- **Tests:** role list; gap style; reorder across children.

#### Accordion
- **Kind:** public
- **Purpose:** Single expandable section (summary row + collapsible content).
- **Props (datui API):** open?/defaultOpen?: boolean (false); onOpenChange?: (open: boolean) => void; disabled?: boolean; unmountOnCollapse?: boolean (false); id?: string; children (Accordion.Summary, Accordion.Content)
- **Variants/sizes/states:** open/closed/disabled; animated height.
- **Interaction & keyboard:** Summary click/Enter/Space toggles; height animates; disabled ignores.
- **A11y:** Disclosure pattern: summary button `aria-expanded` + `aria-controls`; content `role="region"` `aria-labelledby` summary; collapsed content hidden from AT.
- **Responsive:** None.
- **Depends on:** AccordionSummary, AccordionContent, AccordionIcon
- **Foundation:** Radix via shadcn (Collapsible; Accordion for grouped)
- **Tests:** controlled vs uncontrolled; aria wiring ids; unmountOnCollapse removes content after animation; disabled.

#### AccordionSummary
- **Kind:** public (Accordion.Summary)
- **Purpose:** Clickable header row of the accordion with expand/collapse icon.
- **Props (datui API):** SimpleCell props (minus chevron); iconPosition?: 'before'|'after'|'none' ('after'); expandIcon?/collapseIcon?: ElementType (ChevronDown/ChevronUp)
- **Variants/sizes/states:** icon position; open/closed.
- **Interaction & keyboard:** Toggles on click/Enter/Space; calls user onClick too.
- **A11y:** Button with aria-expanded/aria-controls.
- **Responsive:** None.
- **Depends on:** SimpleCell, AccordionIcon
- **Foundation:** Radix via shadcn (Collapsible.Trigger)
- **Tests:** toggles; icon swaps; iconPosition none hides icon.

#### AccordionContent
- **Kind:** public (Accordion.Content)
- **Purpose:** Collapsible body with height animation.
- **Props (datui API):** children
- **Variants/sizes/states:** entering/entered/exiting/exited.
- **Interaction & keyboard:** None; respects prefers-reduced-motion.
- **A11y:** `role="region"`, `aria-labelledby`; hidden when collapsed.
- **Responsive:** None.
- **Depends on:** Accordion
- **Foundation:** Radix via shadcn (Collapsible.Content)
- **Tests:** hidden when closed; animation var set; reduced motion.

#### AccordionIcon
- **Kind:** public (Accordion.Icon)
- **Purpose:** Expand/collapse icon bound to accordion state, for custom summaries.
- **Props (datui API):** expandIcon?/collapseIcon?: ElementType
- **Variants/sizes/states:** expanded/collapsed.
- **Interaction & keyboard:** None.
- **A11y:** `aria-hidden`.
- **Responsive:** None.
- **Depends on:** Accordion
- **Foundation:** lucide-react
- **Tests:** swaps icon with state.

#### Gallery
- **Kind:** public
- **Purpose:** Swipeable carousel of slides with bullets, arrows, autoplay and looping.
- **Props (datui API):** slideIndex?/defaultSlideIndex?: number (0); onSlideIndexChange?: (i: number) => void; slideWidth?: number|string|'custom' ('100%'); align?: 'start'|'center'|'end' ('start'); looped?: boolean (false); autoplay?: number (ms, 0 = off); bullets?: 'dark'|'light'|false (false); showArrows?: boolean|'always' (false); arrowSize?: 'm'|'l'; arrowAreaHeight?: 'stretch'|'fit'; prevLabel?/nextLabel?: string; slideLabel?: string | (i, total) => string ('i of n'); slideRoleDescription?: string ('slide'); dragDisabled?: boolean; onDragStart?/onDragEnd?; onPrevClick?/onNextClick?; animationDuration?: number; animationEasing?: string | [n,n,n,n]
- **Variants/sizes/states:** full-width vs custom-width slides; looped; with bullets/arrows; dragging.
- **Interaction & keyboard:** Pointer/touch swipe with snap; arrows on hover (or always); autoplay pauses on drag, hover and focus-within; controlled without onChange disables drag. Left/Right arrows on focused carousel.
- **A11y:** Carousel pattern: root `role="region"` `aria-roledescription="carousel"`; slides `role="group"` `aria-roledescription="slide"` + "n of m" label; arrows are buttons with `aria-controls`; bullets `aria-hidden`; autoplay needs pause control.
- **Responsive:** Arrows hidden on touch-only devices unless 'always'; recalculates on resize.
- **Depends on:** IconButton (arrows)
- **Foundation:** embla-carousel-react (+ autoplay plugin)
- **Tests:** controlled/uncontrolled index; clamps out-of-range index; loop wraps; autoplay pause on hover/focus; arrow buttons; labels.

## Overlays

#### ModalRoot
- **Kind:** replaced (by per-modal controlled `open`; a small `ModalRoot` that opens the child matching `activeModal` remains for id-based switching)
- **Purpose:** Shared overlay + coordinator showing one modal at a time by id, with open/close lifecycle callbacks.
- **Props (datui API):** (hook) activeModal: string | null; open(id), close(), onOpen?/onOpened?/onClose?/onClosed?: (id) => void
- **Variants/sizes/states:** one active modal; transitions between modals keep one overlay and preserve sheet snap point.
- **Interaction & keyboard:** Switching modals shares a single backdrop (no flash).
- **A11y:** Only the active modal is exposed; others `hidden`.
- **Responsive:** Delegates to ModalPage/ModalCard.
- **Depends on:** ModalPage, ModalCard, ModalOverlay
- **Foundation:** custom (on Radix Dialog)
- **Tests:** switching ids closes previous before opening next; lifecycle callback order; single overlay.

#### ModalPage
- **Kind:** public
- **Purpose:** Full modal panel with header, scrollable content and footer.
- **Props (datui API):** open?: boolean (false); onOpenChange?/onClose?: (reason: 'click-overlay'|'click-close-button'|'escape-key'|'swipe-down') => void; onOpened?/onClosed?: () => void; header?: ReactNode; footer?: ReactNode; size?: 's'|'m'|'l'|number|string ('s', max width on regular); height?: number|string; settlingHeight?: 25|50|75|100 (50, initial sheet snap); dynamicContentHeight?: boolean; preventClose?: boolean; hideCloseButton?: boolean; closeLabel?: string ('Close'); outsideButtons?: ReactNode; keepMounted?: boolean; restoreFocus?: boolean | (() => HTMLElement|boolean) (true); disableFocusTrap?: boolean; disableOverlay?: boolean; disableAnimation?: boolean; children
- **Variants/sizes/states:** opening/open/closing/closed; sheet snap points 25/50/75/100%; size s/m/l on regular; preventClose.
- **Interaction & keyboard:** Escape closes; overlay click closes; on compact: drag handle/content panning between snap points and drag-to-dismiss (blocked while virtual keyboard open); focus trapped, focus moves into dialog on open and returns to trigger on close; preventClose disables all three.
- **A11y:** Dialog pattern: `role="dialog"` `aria-modal="true"` `aria-labelledby` -> ModalPageHeader title; dismiss button labelled; background inert.
- **Responsive:** Bottom sheet on compact; centered dialog with max-width on regular; outsideButtons only on compact.
- **Depends on:** ModalPageHeader, ModalPageContent, ModalOverlay, ModalOutlet, ModalDismissButton, ModalOutsideButtons
- **Foundation:** Radix via shadcn (Dialog) on regular + vaul (Drawer with snapPoints) on compact
- **Tests:** close reasons; Escape; focus trap + restore; swipe-down closes on compact; snap point initial height; preventClose; keepMounted; aria-labelledby wired to header.

#### ModalPageHeader
- **Kind:** public
- **Purpose:** Title bar for ModalPage with before/after slots (back, close, actions) and separator.
- **Props (datui API):** children (title); before?: ReactNode; after?: ReactNode; noSeparator?: boolean (false); titleAs?: ElementType ('h2')
- **Variants/sizes/states:** with/without separator; tighter on regular.
- **Interaction & keyboard:** Slot buttons only.
- **A11y:** Title rendered as `h2` with id used for the dialog's aria-labelledby.
- **Responsive:** Centered title on compact, left-aligned with gaps on regular.
- **Depends on:** ModalPage (context), Separator
- **Foundation:** Radix via shadcn (Dialog.Title)
- **Tests:** title id matches dialog aria-labelledby; separator toggle; slots.

#### ModalPageContent
- **Kind:** public
- **Purpose:** Scrollable body area of ModalPage (also the sheet's scroll container for drag handoff).
- **Props (datui API):** children
- **Variants/sizes/states:** scrolled/at-top (sheet drag only starts at scroll top).
- **Interaction & keyboard:** Native scroll; keyboard scrolling.
- **A11y:** Focusable scroll region if content isn't focusable (`tabIndex=0`).
- **Responsive:** Fills sheet height on compact.
- **Depends on:** ModalPage
- **Foundation:** custom (ScrollArea optional via Radix)
- **Tests:** scroll doesn't trigger dismiss unless at top.

#### ModalCard
- **Kind:** public
- **Purpose:** Small modal for a single message/decision: icon, title, description, content, actions.
- **Props (datui API):** open?: boolean; onClose?: (reason: 'click-overlay'|'click-close-button'|'escape-key'|'swipe-down') => void; onOpened?/onClosed?; icon?: ReactNode; title?: ReactNode; titleAs?: ElementType; description?: ReactNode; actions?: ReactNode; size?: number (max width on regular); dismissButtonMode?: 'inside'|'outside'|'none' ('outside' on compact); closeLabel?: string; outsideButtons?: ReactNode; preventClose?: boolean; keepMounted?: boolean; restoreFocus?; disableFocusTrap?; disableOverlay?; disableAnimation?; children
- **Variants/sizes/states:** dismiss inside/outside/none; open/closing.
- **Interaction & keyboard:** Escape and overlay click close; swipe-down dismiss on compact; focus trap and restore.
- **A11y:** `role="dialog"` `aria-modal` labelled by title id; dismiss button labelled.
- **Responsive:** Floating card docked to bottom on compact (swipe to dismiss); centered card on regular.
- **Depends on:** ModalOverlay, ModalOutlet, ModalDismissButton, ModalOutsideButtons
- **Foundation:** Radix via shadcn (Dialog) + vaul (compact)
- **Tests:** close reasons; dismiss modes; aria-labelledby; swipe-down; preventClose.

#### ModalOverlay
- **Kind:** internal (folded into ModalPage/ModalCard/Alert)
- **Purpose:** Dimmed backdrop with fade transition; opacity tracks sheet drag.
- **Props (datui API):** visible: boolean; onClick?: () => void
- **Variants/sizes/states:** entering/entered/exiting/hidden; interactive vs pass-through.
- **Interaction & keyboard:** Click closes (via parent).
- **A11y:** `aria-hidden="true"`.
- **Responsive:** Opacity bound to drag progress on compact.
- **Depends on:** none
- **Foundation:** Radix via shadcn (Dialog.Overlay)
- **Tests:** fade states; hidden after exit.

#### ModalOutlet
- **Kind:** internal (folded into ModalPage/ModalCard)
- **Purpose:** Fixed positioning layer that centers (regular) or bottom-docks (compact) the modal.
- **Props (datui API):** none public
- **Variants/sizes/states:** desktop vs mobile layout; hidden.
- **Interaction & keyboard:** None.
- **A11y:** `hidden`/`aria-hidden` when closed.
- **Responsive:** Layout switch is its whole job.
- **Depends on:** none
- **Foundation:** Radix via shadcn (Dialog.Portal)
- **Tests:** hidden when closed.

#### ModalDismissButton
- **Kind:** public
- **Purpose:** Round X button placed outside the modal edge (compact) to close it.
- **Props (datui API):** onClick: () => void; children?: string ('Close', visually hidden label)
- **Variants/sizes/states:** hover/active.
- **Interaction & keyboard:** Button; Enter/Space.
- **A11y:** Visually-hidden text label; icon `aria-hidden`.
- **Responsive:** Outside placement only on compact; inside on regular.
- **Depends on:** ModalOutsideButton
- **Foundation:** lucide-react (X)
- **Tests:** label present; click closes with reason 'click-close-button'.

#### ModalOutsideButton
- **Kind:** public
- **Purpose:** Round icon button styled to sit outside the modal next to the dismiss button.
- **Props (datui API):** children: ReactNode (20px icon); aria-label: string (required); onClick?/href?
- **Variants/sizes/states:** hover/active/disabled.
- **Interaction & keyboard:** Button/link.
- **A11y:** Accessible name via visually-hidden aria-label text.
- **Responsive:** Compact only.
- **Depends on:** Tappable
- **Foundation:** custom
- **Tests:** label; renders link with href.

#### ModalOutsideButtons
- **Kind:** internal (folded into ModalPage/ModalCard `outsideButtons`)
- **Purpose:** Vertical stack placing dismiss + outside buttons beside the modal.
- **Props (datui API):** children
- **Variants/sizes/states:** none.
- **Interaction & keyboard:** Tab order follows stack, within focus trap.
- **A11y:** Inside the dialog element so they stay in the focus trap.
- **Responsive:** Compact only.
- **Depends on:** ModalOutsideButton
- **Foundation:** custom
- **Tests:** rendered inside dialog subtree.

#### Alert
- **Kind:** public
- **Purpose:** Blocking confirm dialog with title, description and action buttons.
- **Props (datui API):** open?: boolean; onClose?: (reason: 'click-overlay'|'click-item'|'escape-key'|'click-close-button') => void; onClosed?: () => void; title?: ReactNode; description?: ReactNode; actions?: { title: string; mode: 'default'|'cancel'|'destructive'; action?: (ctx: { close }) => void; autoCloseDisabled?: boolean; href?: string }[]; renderAction?: (props) => ReactNode; actionsLayout?: 'vertical'|'horizontal' ('horizontal'); actionsAlign?: 'start'|'center'|'end'; dismissButtonMode?: 'inside'|'outside'|'none'; closeLabel?: string; autoFocus?: boolean|'root' (true); restoreFocus? (true)
- **Variants/sizes/states:** horizontal/vertical actions; destructive/cancel action styles; closing animation.
- **Interaction & keyboard:** Escape closes; overlay click closes; action click closes unless autoCloseDisabled (then gets close()); focus trapped, first element focused, restored on close.
- **A11y:** Alert dialog pattern: `role="alertdialog"` `aria-modal` `aria-labelledby` title `aria-describedby` description; dev warning if no title and no aria-label.
- **Responsive:** Narrow centered card on all sizes; dismiss X shown only on regular.
- **Depends on:** AlertAction, ModalOverlay, Button
- **Foundation:** Radix via shadcn (AlertDialog)
- **Tests:** close reasons; autoCloseDisabled passes close; focus trap/restore; aria ids; renderAction override.

#### AlertAction
- **Kind:** internal (folded into Alert; customizable via renderAction)
- **Purpose:** Button for one Alert action.
- **Props (datui API):** mode: 'default'|'cancel'|'destructive'; children: string; onClick; href?
- **Variants/sizes/states:** 3 modes.
- **Interaction & keyboard:** Button/link.
- **A11y:** Native button.
- **Responsive:** Stretched in vertical layout.
- **Depends on:** Button
- **Foundation:** Radix via shadcn (AlertDialog.Action/Cancel)
- **Tests:** mode -> button variant.

#### ActionSheet
- **Kind:** public
- **Purpose:** List of actions shown as bottom sheet (compact) or anchored dropdown menu (regular).
- **Props (datui API):** open?: boolean; onClose?: (reason: 'click-action-item'|'click-cancel-item'|'click-overlay'|'keydown-item'|'escape-key') => void; onClosed?: () => void; anchorRef: RefObject<Element> (required for menu mode); mode?: 'sheet'|'menu' (auto by viewport); title?, description?: ReactNode; placement?: Placement ('bottom-end'); offset?: number; cancelLabel?: string (adds Cancel item in sheet mode); autoFocus?; restoreFocus?; children (ActionSheetItem)
- **Variants/sizes/states:** sheet vs menu; with header; closing animation (onClick of item fires after close).
- **Interaction & keyboard:** Escape closes; overlay/outside click closes; item click auto-closes; Enter on item closes; focus trapped and restored to anchor. Menu mode adds roving arrows, Home/End and typeahead.
- **A11y:** menu mode = Menu pattern (`role="menu"`/`menuitem`), sheet mode = dialog with list of buttons.
- **Responsive:** Bottom sheet on compact; popover menu anchored to toggle on regular.
- **Depends on:** ActionSheetItem, Popover, ModalOverlay
- **Foundation:** Radix via shadcn (DropdownMenu) on regular + vaul (Drawer) on compact
- **Tests:** mode auto-switch; close reasons; item onClick after close vs onImmediateClick; anchor placement; focus restore; arrow navigation in menu.

#### ActionSheetItem
- **Kind:** public
- **Purpose:** One action row in ActionSheet; optionally selectable (radio).
- **Props (datui API):** children; mode?: 'default'|'destructive' ('default'); before?, after?, meta?, subtitle?: ReactNode; selectable?: boolean; checked?/defaultChecked?: boolean; name?, value?: string; onChange?; iconChecked?: ReactNode; autoCloseDisabled?: boolean; multiline?: boolean; disabled?: boolean; href?/target?; onClick?: (e) => void (fires after close); onImmediateClick?: (e) => void
- **Variants/sizes/states:** default/destructive; selectable checked/unchecked; disabled; compact density in menu.
- **Interaction & keyboard:** Click/Enter activates and closes the sheet; selectable acts as radio; links open href.
- **A11y:** `menuitem` / `menuitemradio` with `aria-checked` in menu mode; button/link in sheet mode.
- **Responsive:** Centered text in sheet without before; left-aligned in menu.
- **Depends on:** ActionSheet (context), Tappable, Radio
- **Foundation:** Radix via shadcn (DropdownMenu.Item / RadioItem)
- **Tests:** autoClose; immediate vs deferred click; radio checked state; destructive style; disabled.

#### ActionSheetCancelItem
- **Kind:** replaced (by ActionSheet `cancelLabel`, platform-specific iOS cancel row collapsed into one design)
- **Purpose:** Separate "Cancel" row at the bottom of the sheet.
- **Props (datui API):** via ActionSheet cancelLabel
- **Variants/sizes/states:** sheet mode only.
- **Interaction & keyboard:** Closes with reason 'click-cancel-item'.
- **A11y:** Button.
- **Responsive:** Compact only.
- **Depends on:** ActionSheet
- **Foundation:** vaul
- **Tests:** close reason.

#### Popover
- **Kind:** public
- **Purpose:** Floating panel anchored to a trigger element for arbitrary interactive content.
- **Props (datui API):** children (trigger); content: ReactNode | (({ onClose }) => ReactNode); open?/defaultOpen?: boolean; onOpenChange?: (open, reason) => void; trigger?: 'click'|'hover'|'focus'|('click'|'hover'|'focus')[] ('click'); hoverDelay?: number|[number, number] (150); placement?: Placement|'auto' ('bottom-start'); offset?/crossOffset?: number; arrow?: boolean; sameWidth?: boolean; closeOnContentClick?: boolean; disableCloseOnClickOutside?: boolean; disableCloseOnEscape?: boolean; disabled?: boolean; keepMounted?: boolean; unstyled?: boolean; role?: string ('dialog'); autoFocus?; restoreFocus?; disableFocusTrap?; hideWhenAnchorHidden?: boolean; zIndex?; plus `usePopover()` hook returning { anchorRef, anchorProps, popover }
- **Variants/sizes/states:** open/closed; with/without arrow; styled/unstyled; flip/shift around viewport.
- **Interaction & keyboard:** Click (or hover/focus) toggles; Escape and outside click close; focus moves into content and returns to anchor; anchor gets `aria-expanded`.
- **A11y:** Content `role="dialog"` (configurable); trigger `aria-expanded` + `aria-controls`/`aria-haspopup`.
- **Responsive:** Flip/shift keep it on-screen; no sheet fallback.
- **Depends on:** none
- **Foundation:** Radix via shadcn (Popover)
- **Tests:** trigger modes; controlled/uncontrolled; Escape/outside close toggles; focus trap & restore; render-prop onClose; arrow placement.

#### Tooltip
- **Kind:** public
- **Purpose:** Short descriptive hint shown on hover/focus of an element.
- **Props (datui API):** children (anchor); title?, description?: ReactNode; appearance?: 'neutral'|'accent'|'white'|'black'|'inversion' ('neutral'); placement? ('bottom'); open?/defaultOpen?; onOpenChange?; hoverDelay?: number|[number, number] (150); disableFocusTrigger?: boolean; disableCloseOnClick?: boolean; interactive?: boolean; closable?: boolean (X button, needs interactive or controlled); closeLabel?: string; hideArrow?: boolean; maxWidth?: number|string; offset?; zIndex?; plus `useTooltip()` hook
- **Variants/sizes/states:** 5 appearances; with title; closable; interactive (hover over tooltip keeps it).
- **Interaction & keyboard:** Shows on hover and focus, hides on leave/blur, click, Escape.
- **A11y:** Tooltip pattern: `role="tooltip"`, anchor gets `aria-describedby` while shown; not for essential content.
- **Responsive:** Flips/shifts; touch shows on focus/press.
- **Depends on:** none
- **Foundation:** Radix via shadcn (Tooltip)
- **Tests:** hover delay; focus trigger toggle; Escape; aria-describedby only when shown; closable button; appearances.

#### OnboardingTooltip
- **Kind:** public
- **Purpose:** Controlled spotlight hint that points at an element during onboarding and blocks the page until dismissed.
- **Props (datui API):** children (anchor); open: boolean; onClose?: () => void; title?, description?: ReactNode; appearance? ('accent'); placement?; offset?/crossOffset?; hideArrow?: boolean; arrowOffset?: number; isStaticArrowOffset?: boolean; maxWidth?; overlayLabel?: string ('Close hint'); restoreFocus? (true); disableFocusTrap?: boolean; aria-label?/aria-labelledby?
- **Variants/sizes/states:** shown/hidden; appearances.
- **Interaction & keyboard:** Full-screen transparent overlay button: any click closes (onClose); focus trapped in tooltip and restored on close; Escape closes.
- **A11y:** `role="dialog"` `aria-modal`, labelled by title (dev warning if no label); anchor `aria-describedby`; overlay button labelled by overlayLabel.
- **Responsive:** Flip/shift; overlay covers viewport.
- **Depends on:** Tooltip styles (TooltipBase)
- **Foundation:** @floating-ui/react
- **Tests:** overlay click closes; focus trap/restore; aria label warning; arrow offset.

## Feedback

#### Spinner
- **Kind:** public
- **Purpose:** Indeterminate loading indicator.
- **Props (datui API):** size?: 's'|'m'|'l'|'xl' ('m'); label?: string ('Loading', visually hidden); noAnimation?: boolean; inheritColor?: boolean (uses currentColor); visibilityDelay?: number (ms before showing)
- **Variants/sizes/states:** 4 sizes; static; delayed appearance.
- **Interaction & keyboard:** None.
- **A11y:** `role="status"` with visually-hidden label; svg `aria-hidden`; respects prefers-reduced-motion.
- **Responsive:** None.
- **Depends on:** VisuallyHidden
- **Foundation:** lucide-react (Loader2) or custom SVG
- **Tests:** role status + label; delay hides until timeout; noAnimation; size.

#### ExpressiveSpinner
- **Kind:** replaced (by Spinner, platform-specific morphing-shape spinner not needed in one design)
- **Purpose:** Morphing polygon loading animation.
- **Props (datui API):** n/a
- **Variants/sizes/states:** n/a
- **Interaction & keyboard:** n/a
- **A11y:** n/a
- **Responsive:** n/a
- **Depends on:** Spinner
- **Foundation:** custom
- **Tests:** n/a

#### PanelSpinner
- **Kind:** public
- **Purpose:** Spinner centered in a block of fixed height (panel/section loading).
- **Props (datui API):** Spinner props; height?: number (96)
- **Variants/sizes/states:** as Spinner.
- **Interaction & keyboard:** None.
- **A11y:** Inherits Spinner `role="status"`.
- **Responsive:** Full width.
- **Depends on:** Spinner
- **Foundation:** custom
- **Tests:** height applied; spinner centered.

#### ScreenSpinner
- **Kind:** public
- **Purpose:** Full-screen blocking loader that can morph into done/error/custom icon and offer cancel.
- **Props (datui API):** state?: 'loading'|'cancelable'|'done'|'error'|'custom' ('loading'); customIcon?: ReactNode; mode?: 'shadow'|'overlay' ('shadow'); label?: ReactNode; cancelLabel?: string ('Cancel'); onCancel?: () => void; visibilityDelay?: number; noAnimation?: boolean; portal?: boolean (true)
- **Variants/sizes/states:** loading / cancelable (tap spinner to cancel) / done / error / custom; shadow card vs dim overlay.
- **Interaction & keyboard:** Blocks pointer input; in cancelable state the spinner becomes a cancel button (Enter/Space).
- **A11y:** `role="status"` + `aria-live`; state changes announced via label; cancel icon `role="button"` with cancelLabel; visible label text duplicated hidden to avoid double reading.
- **Responsive:** Centered on all sizes.
- **Depends on:** Spinner, ScreenSpinnerContainer, ScreenSpinnerLoader, ScreenSpinnerSwapIcon
- **Foundation:** custom (portal)
- **Tests:** state icons; cancel click/keyboard; mode classes; label rendering; portal.

#### ScreenSpinnerContainer
- **Kind:** public (ScreenSpinner.Container)
- **Purpose:** Centered card/overlay shell that provides ScreenSpinner state context, for custom composition.
- **Props (datui API):** state; mode; label?; customIcon?; children
- **Variants/sizes/states:** per state/mode.
- **Interaction & keyboard:** None.
- **A11y:** Live region.
- **Responsive:** Centered.
- **Depends on:** ScreenSpinner
- **Foundation:** custom
- **Tests:** context value; state classes.

#### ScreenSpinnerLoader
- **Kind:** internal (folded into ScreenSpinner)
- **Purpose:** The spinner graphic inside ScreenSpinner, hidden in done/error states.
- **Props (datui API):** Spinner props
- **Variants/sizes/states:** visible only while loading/cancelable.
- **Interaction & keyboard:** None.
- **A11y:** Decorative within container's status.
- **Responsive:** None.
- **Depends on:** Spinner
- **Foundation:** custom
- **Tests:** hidden for done/error.

#### ScreenSpinnerSwapIcon
- **Kind:** internal (folded into ScreenSpinner)
- **Purpose:** Swaps between cancel/done/error/custom icons with animation.
- **Props (datui API):** onClick?; cancelLabel?
- **Variants/sizes/states:** cancel / done / error / custom icon.
- **Interaction & keyboard:** Cancel icon is a button.
- **A11y:** Cancel `role="button"` + label.
- **Responsive:** None.
- **Depends on:** ScreenSpinner
- **Foundation:** lucide-react (X, Check, CircleX)
- **Tests:** correct icon per state.

#### Progress
- **Kind:** public
- **Purpose:** Determinate linear progress bar (0-100).
- **Props (datui API):** value?: number (0, clamped 0-100); appearance?: 'accent'|'positive'|'negative'|`var(--x)`|`#hex` ('accent'); height?: number (4); noTrack?: boolean (transparent track); aria-label?: string
- **Variants/sizes/states:** 3 tokens + custom color; height; with/without track.
- **Interaction & keyboard:** None.
- **A11y:** `role="progressbar"` `aria-valuenow/min/max` (0/100); needs aria-label or labelledby.
- **Responsive:** Full width.
- **Depends on:** none
- **Foundation:** Radix via shadcn (Progress)
- **Tests:** clamping; aria values; custom color; height.

#### Skeleton
- **Kind:** public
- **Purpose:** Shimmer placeholder block for loading content.
- **Props (datui API):** width?, height?, maxWidth?, borderRadius?, margin?: CSSProperties values; colorFrom?/colorTo?: string; noAnimation?: boolean; duration?: number (s); visibilityDelay?: number (ms); children (text-sized inline skeleton)
- **Variants/sizes/states:** block vs inline text; animated vs static.
- **Interaction & keyboard:** None.
- **A11y:** `aria-hidden`; parent region should set `aria-busy`.
- **Responsive:** Sizes accept %, fluid.
- **Depends on:** none
- **Foundation:** custom (shadcn Skeleton)
- **Tests:** size props applied; noAnimation; delay; aria-hidden; reduced motion.

#### Snackbar
- **Kind:** public
- **Purpose:** Temporary notification with optional action, auto-hiding.
- **Props (datui API):** open?: boolean (true); onClose?: (reason: 'swipe'|'timeout'|'click-action'|'escape-key'|'manual') => void; onClosed: () => void; children (text); subtitle?: ReactNode (exclusive with action); action?: ReactNode; onActionClick?: (e) => void; before?: ReactNode; after?: ReactNode; layout?: 'horizontal'|'vertical' (auto); mode?: 'default'|'dark' ('default'); placement?: 'top-start'|'top'|'top-end'|'bottom-start'|'bottom'|'bottom-end' ('bottom-start'); duration?: number|null (4000; null = sticky); offsetY?: string|number
- **Variants/sizes/states:** 6 placements; default/dark; horizontal/vertical; entering/entered/exiting.
- **Interaction & keyboard:** Auto-dismiss after duration, paused while focused or touched (datui: also on hover); swipe to dismiss (vertical toward edge, horizontal on bottom-start/end mobile); action click closes; Escape closes.
- **A11y:** Inner `role="alert"` (live); root `role="presentation"`; action is a button; timeout should be long enough (WCAG 2.2.1).
- **Responsive:** Compact forces 'top' for top-* and 'bottom-start' for 'bottom'; full width on compact, fixed width on regular.
- **Depends on:** SnackbarBasic, Button
- **Foundation:** custom (pointer events; no listed lib fits)
- **Tests:** timeout close; pause on focus/touch; swipe threshold; Escape; action close reason; placement remap on compact; controlled open.

#### SnackbarBasic
- **Kind:** public (Snackbar.Basic)
- **Purpose:** Snackbar visual body without positioning/timers, for inline or custom toast hosts.
- **Props (datui API):** before?, after?, action?, subtitle?: ReactNode; layout?; mode?; children
- **Variants/sizes/states:** as Snackbar.
- **Interaction & keyboard:** Action button only.
- **A11y:** No live role by itself.
- **Responsive:** Fluid width.
- **Depends on:** none
- **Foundation:** custom
- **Tests:** layout auto rules (vertical when after/subtitle).

#### PullToRefresh
- **Kind:** public
- **Purpose:** Pull-down gesture on scroll container to trigger a refresh, with progress spinner.
- **Props (datui API):** onRefresh: () => void; isFetching?: boolean (consumer sets false when done); accessibilityLabel?: string; refreshLabel?: string ('Refresh'); children
- **Variants/sizes/states:** idle / pulling (progress) / refreshing / finishing (spinner held at least ~1s).
- **Interaction & keyboard:** Touch pull past threshold at scroll top triggers onRefresh; content follows finger with resistance; hidden "Refresh" button for keyboard/AT users (disabled while fetching).
- **A11y:** Region `role="region"` `aria-live="polite"` `aria-busy={isFetching}` labelled; visually-hidden refresh button.
- **Responsive:** Gesture only on touch; on desktop only the hidden button.
- **Depends on:** PullToRefreshSpinner, VisuallyHidden
- **Foundation:** custom
- **Tests:** pull threshold triggers once; ignored when not at scroll top; isFetching true->false hides spinner; hidden button triggers refresh; aria-busy.

#### PullToRefreshSpinner
- **Kind:** internal (folded into PullToRefresh)
- **Purpose:** Circular indicator whose arc grows with pull progress, then spins.
- **Props (datui API):** progress?: number (0-1); on?: boolean; size?: number; strokeWidth?: number
- **Variants/sizes/states:** progress vs spinning.
- **Interaction & keyboard:** None.
- **A11y:** `aria-hidden`.
- **Responsive:** None.
- **Depends on:** PullToRefresh
- **Foundation:** custom SVG
- **Tests:** arc length tracks progress.
