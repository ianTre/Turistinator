import { attractions } from './data/attractions.js'

function AttractionCard({ attraction }) {
  return (
    <article className="card">
      <p className="card-type">{attraction.tipology}</p>
      <h2>{attraction.name}</h2>
      <p className="card-city">{attraction.city}</p>
      <p className="card-description">{attraction.description}</p>
    </article>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Turistinator</p>
        <h1>Attractions</h1>
        <p className="lede">
          Discover places worth the trip. This first React screen uses sample
          data and will later connect to the Django API.
        </p>
      </header>

      <section className="grid" aria-label="Attraction list">
        {attractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </section>
    </div>
  )
}
