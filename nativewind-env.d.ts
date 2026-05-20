/// <reference types="nativewind/types" />

// Allow CSS imports
declare module '*.css' {
  const content: string;
  export default content;
}