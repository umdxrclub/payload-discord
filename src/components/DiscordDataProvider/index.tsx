"use client";

import React, { useRef } from "react";
import { DiscordDataContext } from "../../data/context";
import { getDiscordMockData } from "../../mocks/discord";

type DiscordDataProviderProps = {
    children?: React.ReactNode
}

const DiscordDataProvider: React.FC<DiscordDataProviderProps> = ({children}) => {
    const mock = useRef(getDiscordMockData());
    return <DiscordDataContext.Provider value={mock.current}>
        {children}
    </DiscordDataContext.Provider>
}

export default DiscordDataProvider;
