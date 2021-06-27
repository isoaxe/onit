/*
 *  Interfaces to define object shapes for TypeScript.
 */
import React from "react";


// Declare CSS as object within a TS file.
export interface StyleSheet {
  [key: string]: React.CSSProperties;
}
