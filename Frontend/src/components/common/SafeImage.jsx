import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/images/logo/PearlPromise-logo.png";

function SafeImage({ src, alt, className = "", ...props }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setImageSrc(src || FALLBACK_IMAGE);
  }, [src]);

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.src === window.location.origin + FALLBACK_IMAGE) {
          return;
        }

        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_IMAGE;
      }}
    />
  );
}

export default SafeImage;
