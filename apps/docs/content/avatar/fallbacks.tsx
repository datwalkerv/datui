"use client";

import { Avatar } from "datui";
import { Camera } from "lucide-react";

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar src="/images/person-5.svg" alt="Mia Wong" size={48} />
      <Avatar src="/missing.png" alt="Leo Park" initials="LP" gradientColor="light-blue" size={48} />
      <Avatar alt="Ava Stone" initials="AS" gradientColor={1} size={40} />
      <Avatar alt="Unknown user" size={32} />
      <Avatar alt="Sam Lee, online" initials="SL" gradientColor="green" size={56}>
        <Avatar.Badge />
      </Avatar>
      <Avatar src="/images/person-6.svg" alt="Edit photo of Kim" size={72}>
        <Avatar.Overlay aria-label="Change photo" onClick={() => {}}>
          <Camera />
        </Avatar.Overlay>
      </Avatar>
    </div>
  );
}
