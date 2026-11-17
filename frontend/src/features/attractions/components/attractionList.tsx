import { Attraction } from "../../../api/attractions.js";
import { useAttractions } from "../hooks/useAttractions";

type AttractionCardProps = {
  attraction: Attraction;
  onSelect: (id: number) => void;
};

type AttractionsListProps = {
  onSelect: (id: number) => void;
};

function AttractionCard({ attraction, onSelect }: AttractionCardProps) {
  function select() {
    onSelect(attraction.id);
  }

  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={select}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          select();
        }
      }}
    >
      <p className="card-type">{attraction.tipology}</p>
      <h2>{attraction.name}</h2>
      <p className="card-city">{attraction.city}</p>
      <p className="card-description">{attraction.description}</p>
      <p className="card-coordinates">{attraction.coordinates}</p>
    </article>
  );
}

export function AttractionsList({ onSelect }: AttractionsListProps): React.JSX.Element {
  const { attractions } = useAttractions();
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Turistinator 2.1</p>
        <h1>Attractions</h1>
        <p className="lede">
          Discover places worth the trip. This first React screen uses sample
          data and will later connect to the Django API.
        </p>
      </header>

      <section className="grid" aria-label="Attraction list">
        {attractions.map((attraction) => (
          <AttractionCard
            key={attraction.id}
            attraction={attraction}
            onSelect={onSelect}
          />
        ))}
      </section>
    </div>
  );
}
