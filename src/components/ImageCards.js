import {Image} from 'next/image';

export function ImageCards({
  heading,
  description,
  blocks
}) {
  return (
    <section className='container mx-auto flex px-5 my-24 flex-col items-center'>
      <div className='text-center'>
        <div className="max-w-xl">
          {heading?.value && (
            <h1 className="mb-5 text-5xl font-bold">{heading.value}</h1>
          )}
          {description?.value && <p className="mb-5">{description.value}</p>}
        </div>
      </div>
      <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-3">
        {blocks.map((card, index) => (
          card?.figure && (
            <li key={index}>
              <div className="card-image aspect-[3/2]">
                <Image
                  className="object-cover w-full"
                  src={card.figure.image.url}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  width={500}
                  height={500}
                  alt=""
                />
              </div>
              <h2 className="mt-4 font-medium">{card.heading?.value}</h2>
              <div className="block mt-1">{card.description.value}</div>
            </li>
          )))}
      </ul>
    </section>
  );
}
