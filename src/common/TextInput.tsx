import type { FormEvent } from "react";
import type Theme from "common/TTheme";

import React from "react";
import { css, StyleSheet } from "aphrodite";

type Props = Readonly<{
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  theme: Theme;
  value: string;
  width?: number | null;
}>;

function TextInput({
  onChange,
  placeholder = "",
  theme,
  value,
  width,
}: Props): React.ReactElement | null {
  const extraProps: { [key in string]: any } = {};
  if (width != null) {
    extraProps.style = { width };
  }
  return (
    <input
      {...extraProps}
      placeholder={placeholder}
      className={css(
        styles.main,
        theme === "blue" && blueStyles.border,
        theme === "purple" && purpleStyles.border
      )}
      value={value}
      onChange={onChange}
    />
  );
}

const blueStyles = StyleSheet.create({
  border: {
    ":focus": {
      borderColor: "#9CF6FC",
    },
    borderColor: "#9CF6FC",
  },
});

const purpleStyles = StyleSheet.create({
  border: {
    ":focus": {
      borderColor: "#BA9CFC",
    },
    borderColor: "#BA9CFC",
  },
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
    "::placeholder": {
      color: "#FFFFFF",
      textAlign: "center",
    },
  },
});

export default TextInput;
