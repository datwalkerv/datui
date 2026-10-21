"use client";

import { ContentBadge, Image } from "datui";
import { Check, Play } from "lucide-react";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Image src="/images/photo-1.svg" alt="Mountains" size={64} />
      <Image src="/broken.png" alt="Missing cover" size={64} borderRadius="l" />
      <Image src="/images/photo-2.svg" alt="Album" size={64} borderRadius="s" borderEndEndRadius="l">
        <Image.Badge>
          <Check className="text-positive" />
        </Image.Badge>
      </Image>
      <Image src="/images/photo-3.svg" alt="Video" size={64}>
        <Image.Overlay visibility="always">
          <Play />
        </Image.Overlay>
      </Image>
      <Image src="/images/photo-4.svg" alt="Wide" widthSize={120} heightSize={72}>
        <Image.FloatElement placement="top-start" className="m-1">
          <ContentBadge size="s" appearance="overlay">
            HD
          </ContentBadge>
        </Image.FloatElement>
      </Image>
    </div>
  );
}
