import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchArtworks } from "../api/artworkApi";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

type ArtRow = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
};

export const ArtTable = () => {
  const [rows, setRows] = useState<ArtRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<ArtRow[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [numToSelect, setNumToSelect] = useState<number>(0);

  const op = useRef<OverlayPanel>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchArtworks(1, 50);
    const mapped = data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      place_of_origin: item.place_of_origin,
      artist_display: item.artist_display,
      inscriptions: item.inscriptions,
      date_start: item.date_start,
      date_end: item.date_end,
    }));
    setRows(mapped);
    setTotalRecords(data.pagination.total);
  };

  const handleAutoSelect = () => {
    if (!numToSelect || numToSelect <= 0) return;

    const selectedSubset = rows.slice(0, numToSelect);
    setSelectedRows(selectedSubset);
    op.current?.hide();
  };

  const selectionHeader = (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        icon="pi pi-angle-down"
        className=" p-0 text-gray-700 hover:text-indigo-600"
        onClick={(e) => op.current?.toggle(e)}
      />
      <OverlayPanel ref={op}>
        <div className="p-3 flex flex-col gap-3">
          <span className="font-medium text-gray-700">Select rows count:</span>
          <InputNumber
            value={numToSelect}
            onValueChange={(e) => setNumToSelect(e.value ?? 0)}
            min={1}
            showButtons
            inputStyle={{ width: "100%" }}
          />
          <Button
            label="submit"
            onClick={handleAutoSelect}
            size="small"
            className="p-button-sm p-button-primary"
          />
        </div>
      </OverlayPanel>
    </div>
  );

  return (
    <div className="card">
      <h2 className="mb-3 text-lg font-semibold text-gray-700">
        Artworks Table
      </h2>

      <p className="mb-3 text-gray-500">
        Total Selected:{" "}
        <span className="font-bold text-indigo-600">{selectedRows.length}</span>
      </p>

      <DataTable
        value={rows}
        paginator
        rows={8}
        totalRecords={totalRecords}
        rowsPerPageOptions={[8, 16, 32, 64]}
        tableStyle={{ minWidth: "60rem" }}
        selectionMode="checkbox"
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        dataKey="id"
      >
        <Column
          selectionMode="multiple"
          header={selectionHeader}
          headerStyle={{ width: "3.5rem" }}
        />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>
    </div>
  );
};
