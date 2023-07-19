export function ImageBanner({
  heading,
  description,
  figure,
  cta_1_text,
}) {
  return (
    <section>
      <div className="hero min-h-screen" style={figure?.image?.url ? {backgroundImage: `url(${figure.image.url})`} : {}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            {heading?.value && (
              <h1 className="mb-5 text-5xl font-bold">{heading.value}</h1>
            )}
            {description?.value && <p className="mb-5">{description.value}</p>}
            {cta_1_text?.value && (
              <button className="btn btn-primary">{cta_1_text.value}</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}