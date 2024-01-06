import { MouseEvent, MutableRefObject, useEffect } from "react"

export const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event: MouseEvent<any, globalThis.MouseEvent>) => void
 ) => {
  useEffect(
    () => {
    const listener = (event: MouseEvent<any, globalThis.MouseEvent>) => {
      // Do nothing if clicking ref's element or descendent element
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener as any);
    document.addEventListener('touchstart', listener as any);
    return () => {
      document.removeEventListener('mousedown', listener as any);
      document.removeEventListener('touchstart', listener as any);
    }
  },
  [ref, handler]
  );
}
