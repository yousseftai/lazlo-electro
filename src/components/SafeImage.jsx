import { useEffect, useState } from "react";

const FALLBACK = "/img/placeholder.svg";

/**
 * Image with a built-in fallback: if the photo fails to load we swap in a
 * neutral placeholder so cards never render broken, and mark the failure
 * with alt text via a `data-fallback` flag.
 */
export default function SafeImage({ src, alt = "", ...rest }) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrent(src);
    setFailed(false);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      data-fallback={failed ? "true" : undefined}
      onError={() => {
        if (current !== FALLBACK) {
          setCurrent(FALLBACK);
          setFailed(true);
        }
      }}
      {...rest}
    />
  );
}
