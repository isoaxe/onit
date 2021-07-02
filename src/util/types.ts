/*
 *  Interfaces to define object shapes for TypeScript.
 */
import { CSSProperties, MouseEvent } from "react";


// Declare CSS as object within a TS file.
export interface StyleSheet {
  [key: string]: CSSProperties;
}

// Prop shape for the SignUpButton component.
export interface SignUpButtonProps {
  label: string;
  onClick: ((event: MouseEvent) => void) | undefined;
}