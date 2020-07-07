import React from "react";

export const UpArrowIcon = () => {
  return (
    <svg height="64" viewBox="0 0 24 24" width="64">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="white" />
    </svg>
  );
};

export const DownArrowIcon = () => {
  return (
    <svg height="64" viewBox="0 0 24 24" width="64">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
        fill="white"
      />
    </svg>
  );
};
