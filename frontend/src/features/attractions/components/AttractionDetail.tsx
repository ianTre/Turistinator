import { useEffect, useState, type ReactNode } from "react";
import { Attraction, attractionsApi } from "../../../api/attractions";

type AttractionDetailProps = {
  id: number;
  onClose: () => void;
};

const tagIcons: Record<string, ReactNode> = {
  nature: <LeafIcon />,
  coastal: <MountainIcon />,
  hiking: <HikerIcon />,
  scenic: <CameraIcon />,
};

export function AttractionDetail({ id, onClose }: AttractionDetailProps) {
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setAttraction(null);
    setError(null);
    setPhotoIndex(0);

    attractionsApi
      .getById(id)
      .then((data) => {
        if (!cancelled) setAttraction(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load this place.");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="detail-page">
        <p className="detail-status">{error}</p>
        <button type="button" className="detail-back" onClick={onClose}>
          Back to list
        </button>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="detail-page">
        <p className="detail-status">Loading place…</p>
      </div>
    );
  }

  const photos = attraction.photos ?? [];
  const photoCount = photos.length;
  const photo = photoCount > 0 ? photos[photoIndex % photoCount] : undefined;
  const tags = attraction.tags ?? [];

  function showPhoto(nextIndex: number) {
    if (photoCount === 0) return;
    const wrapped = (nextIndex + photoCount) % photoCount;
    setPhotoIndex(wrapped);
  }

  return (
    <div className="detail-page">
      <article className="detail-card">
        <div className="detail-photo">
          {photo ? (
            <img src={photo.image_url} alt={photo.alt_desc || attraction.name} />
          ) : (
            <div className="detail-photo-placeholder" aria-hidden="true" />
          )}

          <span className="detail-category">
            {tagIcons[attraction.tipology.toLowerCase()] ?? null}
            {attraction.tipology}
          </span>

          {photoCount > 0 && (
            <span className="detail-counter">
              {photoIndex + 1}/{photoCount}
            </span>
          )}

          {photoCount > 1 && (
            <>
              <button
                type="button"
                className="detail-arrow detail-arrow-prev"
                aria-label="Previous photo"
                onClick={() => showPhoto(photoIndex - 1)}
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                className="detail-arrow detail-arrow-next"
                aria-label="Next photo"
                onClick={() => showPhoto(photoIndex + 1)}
              >
                <ChevronIcon direction="right" />
              </button>
              <div className="detail-dots" role="tablist" aria-label="Photos">
                {photos.map((item, index) => (
                  <button
                    key={`${item.image_url}-${index}`}
                    type="button"
                    role="tab"
                    aria-label={`Photo ${index + 1}`}
                    aria-selected={index === photoIndex}
                    className={
                      index === photoIndex ? "detail-dot is-active" : "detail-dot"
                    }
                    onClick={() => setPhotoIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="detail-sheet">
          <h2 className="detail-name">{attraction.name}</h2>
          {attraction.location ? (
            <p className="detail-location">
              <PinIcon />
              {attraction.location}
            </p>
          ) : null}
          <p className="detail-description">{attraction.description}</p>
          {tags.length > 0 && (
            <ul className="detail-tags">
              {tags.map((tag) => (
                <li key={tag} className="detail-tag">
                  {tagIcons[tag.toLowerCase()] ?? null}
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="detail-actions">
          <button
            type="button"
            className="detail-action detail-action-pass"
            aria-label="Back to list"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <button
            type="button"
            className="detail-action detail-action-save"
            aria-label="Save place"
          >
            <CheckIcon />
          </button>
        </div>
      </article>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 19c8-1 13-8 14-16-8 1-14 7-14 16zm0 0c2-4 5-7 9-8"
        stroke="currentColor"
        strokeWidth="1.6"
        fillOpacity="0.15"
      />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3 19 9.5 8l3.2 5.2L16 9l5 10H3z" />
    </svg>
  );
}

function HikerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="14" cy="5" r="2" fill="currentColor" />
      <path
        fill="currentColor"
        d="M10 22l2.2-6.2-2-1.6 1.2-2.4 3.2 1.2 1.6 3.2 2.3-.8.7 1.8-3.8 1.3-1.5-2.8-1.4 1.1L10.2 22H10zm1.2-9.2 2.4-4.6 1.8.8-1.6 3.2-2.6.6z"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 7 10.5 5h3L15 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3zm3 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === "left" ? "M14.5 6 8.5 12l6 6" : "M9.5 6l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 7l10 10M17 7 7 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 12.5 10 16.5 18 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
