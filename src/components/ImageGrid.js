import clsx from 'clsx';
import Image from 'next/image'

export function ImageGrid({
  heading,
  description,
  blocks,
  height,
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
            <li className={clsx(
              'relative justify-start flex flex-col w-full px-4',
              height = "aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:aspect-[4/5]",
            )} key={index}>
              <div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
                <Image
                  className="object-cover w-full"
                  src={card.figure.image.url}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  width={500}
                  height={500}
                  alt=""
                />
              </div>
              <div className='text-center pt-4'>
                <h2 className="text-2xl font-medium">{card.heading?.value}</h2>
                <div className="block mt-1">{card.description.value}</div>
              </div>
            </li>
          )))}
      </ul>
    </section>
  );
}
