import { RefObject, useEffect } from "react";

export function useOnClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (!ref.current?.contains(target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchstart", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("touchstart", handleDocumentClick);
    }
  }, [ref, callback]);
}
