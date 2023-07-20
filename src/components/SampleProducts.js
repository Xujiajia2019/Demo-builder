import Image from 'next/image'

export function SampleProducts({
  heading,
  description,
  products,
}) {
  return (
    <section className='container mx-auto flex px-5 my-24 flex-col items-center'>
      <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 dark:from-contrast/60 dark:text-primary from-primary/60">
        {heading?.value && (
          <h1 className="mb-5 text-5xl font-bold">{heading.value}</h1>
        )}
        {description?.value && (
          <p className="mb-5">{description.value}</p>
        )}
      </div>
      <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-4">
        {products.map((product, index) => (
          product?.figure && (
            <li key={index}>
              <div className="card-image aspect-[4/5]">
                <Image
                  style={{height: "100%"}}
                  className="object-cover w-full"
                  src={product.figure.image.url}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt="test"
                  width={500}
                  height={500}
                />
              </div>
              <h2 className="mt-4 font-medium">{product.title?.value}</h2>
              <p className="font-medium">{product.price?.value}</p>
            </li>
          )))}
      </ul>
    </section>
  );
}
