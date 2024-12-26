"use client";

import React from "react";

import "./index.scss";

type BaseDiscordComponentProps = {
  children?: React.ReactNode;
};

const baseClass = "base-discord-cmpt";

const BaseDiscordComponent: React.FC<BaseDiscordComponentProps> = ({
  children,
}) => {
  return <div className={baseClass}>{children}</div>;
};

export default BaseDiscordComponent;
