import React, { createContext, useState, type ReactNode } from "react";

type ArtRow = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
};

// Context type
type DataContextType = {
  selectedMap: Map<number, ArtRow>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map<number, ArtRow>>>;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMap, setSelectedMap] = useState<Map<number, ArtRow>>(
    new Map()
  );

  return (
    <DataContext.Provider value={{ selectedMap, setSelectedMap }}>
      {children}
    </DataContext.Provider>
  );
};
