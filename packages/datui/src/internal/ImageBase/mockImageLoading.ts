/**
 * Test helper: jsdom never loads images, so replace `window.Image` with one that "loads" any src
 * except those containing `broken`, which fail. Returns a restore function.
 */
export function mockImageLoading(): () => void {
  const Original = window.Image;
  class MockImage extends EventTarget {
    complete = false;
    naturalWidth = 0;
    crossOrigin: string | null = null;
    referrerPolicy = "";
    private current = "";
    get src() {
      return this.current;
    }
    set src(value: string) {
      this.current = value;
      setTimeout(() => {
        this.complete = true;
        if (value.includes("broken")) {
          this.dispatchEvent(new Event("error"));
        } else {
          this.naturalWidth = 1;
          this.dispatchEvent(new Event("load"));
        }
      }, 0);
    }
  }
  window.Image = MockImage as unknown as typeof Image;
  return () => {
    window.Image = Original;
  };
}

/** Test helper: resolves with the first real `<img>` once the mocked load finished. */
export function findLoadedImg(container: ParentNode = document): Promise<HTMLImageElement> {
  return vi.waitFor(() => {
    const img = container.querySelector("img");
    if (!img) throw new Error("image not loaded yet");
    return img;
  });
}
