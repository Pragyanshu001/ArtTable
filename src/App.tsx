import { DataProvider } from "./context/DataContext";
import { ArtTable } from "./components/ArtTable";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./index.css";

export default function App() {
  return (
    <DataProvider>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Artworks Data Explorer
        </h1>
        <ArtTable />
      </div>
    </DataProvider>
  );
}
