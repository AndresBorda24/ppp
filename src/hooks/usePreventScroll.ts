import { useEffect } from "react";

export const usePreventScroll = (when: boolean) => {
  const preventScroll = (event: Event) => {
    event.preventDefault();
  };

  const disableScroll = () => {
    window.addEventListener("scroll", preventScroll, { passive: false });
    window.addEventListener("wheel", preventScroll, { passive: false });
  };

  const enableScroll = () => {
    window.removeEventListener("scroll", preventScroll);
    window.removeEventListener("wheel", preventScroll);
  };

  useEffect(() => {
    if (when) disableScroll();
    else enableScroll();

    return () => {
      enableScroll();
    }
  },[when])
}
