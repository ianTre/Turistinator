import { useState } from "react";
import { AttractionDetail } from "./features/attractions/components/AttractionDetail";
import { AttractionsList } from "./features/attractions/components/attractionList";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div>
      {selectedId == null ? (
        <AttractionsList onSelect={setSelectedId} />
      ) : (
        <AttractionDetail
          id={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
