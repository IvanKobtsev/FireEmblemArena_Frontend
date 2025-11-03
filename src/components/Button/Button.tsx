import styles from "./Button.module.scss";
import clsx from "clsx";
import { useState, type MouseEvent } from "react";

export interface ButtonProps {
  title: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function Button({ title, className, onClick, disabled }: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    setIsClicked(true);
  };

  return (
    <div
      className={clsx(
        styles.container,
        isClicked && styles.clicked,
        disabled && styles.disabled,
      )}
    >
      <button
        className={clsx(styles.Button, className)}
        onClick={onButtonClick}
      >
        {title}
      </button>
    </div>
  );
}
