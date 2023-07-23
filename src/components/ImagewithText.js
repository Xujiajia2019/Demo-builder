import Image from 'next/image'


export function ImagewithText({
  heading,
  description,
  figure,
  cta_1_text,
  image_first
}) {
  return (
    <section className={'container mx-auto flex px-5 py-8 flex-col items-center ' + (image_first ? 'md:flex-row' : 'md:flex-row-reverse')}>
      <div className="md:w-1/2 w-5/6">
        <div className="card-image bg-primary/5 aspect-[3/2]">
          {figure?.image && (
            <Image
              alt={figure.image.alt}
              src={figure.image.url}
              sizes="(max-width: 32em) 100vw, 33vw"
              width={500}
              height={500}
            />
          )}
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
        <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 dark:from-contrast/60 dark:text-primary from-primary/60">
          {heading?.value && (
            <h1 className="mb-5 text-5xl font-bold">{heading.value}</h1>
          )}
          {description?.value && <p className="mb-5">{description.value}</p>}
          {cta_1_text?.value && <button className="btn btn-primary">Button</button>}
        </div>
      </div>
    </section>
  );
}