import clsx from "clsx";
import styles from "./Image.module.scss";

export interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export function Image({ src, alt, className }: ImageProps) {
  return (
    <img
      className={clsx(className, styles.Image)}
      src={src}
      alt={alt || "Failed to load image"}
    />
  );
}
