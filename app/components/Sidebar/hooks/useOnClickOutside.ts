import { MutableRefObject, useEffect } from "react"

export const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event: MouseEvent) => void
 ) => {
  useEffect(
    () => {
    const listener = (event: MouseEvent) => {
      // Do nothing if clicking ref's element or descendent element
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener as EventListenerOrEventListenerObject);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener as EventListenerOrEventListenerObject);
    }
  },
  [ref, handler]
  );
}
