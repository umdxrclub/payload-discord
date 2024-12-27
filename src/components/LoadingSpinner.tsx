"use client";

import React from "react";

import "./LoadingSpinner.scss";

type LoadingSpinnerProps = {};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({}) => {
  return (
    <div className="spinner"></div>
  );
};

export default LoadingSpinner;
