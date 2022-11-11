import type { ReactNode } from "react";

import React from "react";
import { css, StyleSheet } from "aphrodite";
import arrowBlue from "static/arrow-blue.png";
import arrowPurple from "static/arrow-purple.png";

type Background = "transparent" | "solid";
type Theme = "blue" | "purple";
type Icon = "arrow-blue" | "arrow-purple";

type Props = Readonly<{
  onClick: () => void;
  label: string;
  isLabelHidden?: boolean;
  background?: Background;
  theme: Theme;
  icon?: Icon | null;
  width?: number | null;
}>;

function getIcon(icon: Icon) {
  const icons: { [key in Icon]: string } = {
    "arrow-blue": arrowBlue,
    "arrow-purple": arrowPurple,
  };
  return icons[icon];
}

function Button({
  onClick,
  label,
  isLabelHidden = false,
  background = "transparent",
  theme,
  icon = null,
  width = null,
}: Props): React.ReactElement {
  const extraProps: { [key in string]: any } = {};
  if (width != null) {
    extraProps.style = { width };
  }
  return (
    <button
      {...extraProps}
      onClick={onClick}
      className={css(
        styles.main,
        theme === "blue" && blueStyles.border,
        theme === "purple" && purpleStyles.border,
        background === "solid" && theme === "blue" && blueStyles.solid,
        background === "solid" && theme === "purple" && purpleStyles.solid
      )}
    >
      {isLabelHidden ? "" : label}
      {icon != null && (
        <img src={getIcon(icon)} alt="arrow" className={css(styles.img)} />
      )}
    </button>
  );
}

const blueStyles = StyleSheet.create({
  border: { borderColor: "#9CF6FC" },
  solid: { backgroundColor: "#069AB4" },
});

const purpleStyles = StyleSheet.create({
  border: { borderColor: "#BA9CFC" },
  solid: { backgroundColor: "#7139E0" },
});

const styles = StyleSheet.create({
  main: {
    display: "inline-block",
    borderWidth: "2px",
    borderStyle: "solid",
    fontSize: "16px",
    fontWeight: "normal",
    color: "#FFFFFF",
    padding: "16px",
    background: "transparent",
    borderRadius: "60px",
    alignSelf: "flex-start",
  },
  img: {
    height: "16px",
    width: "16px",
    verticalAlign: "text-bottom",
  },
});

export default Button;
