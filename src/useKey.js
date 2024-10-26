import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          callback();
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [callback, key]
  );
}
