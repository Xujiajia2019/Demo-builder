"use client"
import {ImageBanner} from '../../components/ImageBanner';
import {ImageCards} from '../../components/ImageCards';
import {ImageGrid} from '../../components/ImageGrid';
import {ImagewithText} from '../../components/ImagewithText';
import {Testimonial} from '../../components/Testimonial';
import {SampleProducts} from '../../components/SampleProducts';

const moduleData = "[{\"section\":\"ImageBanner\",\"props\":{\"figure\":{\"image\":{\"altText\":\"Best Phone Deals\",\"requirements\":\"A high-quality image showcasing the latest smartphones at unbeatable prices\",\"url\":\"https://oaidalleapiprodscus.blob.core.windows.net/private/org-jbm1ZiNi2jBwU2sapjr7rARW/user-6FOjYHHcOro7uUHVJX75pYAi/img-FC2T0B3yG8VYg9zqg7cfCJ0u.png?st=2023-07-19T07%3A01%3A55Z&se=2023-07-19T09%3A01%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-19T00%3A00%3A06Z&ske=2023-07-20T00%3A00%3A06Z&sks=b&skv=2021-08-06&sig=j1KryW1TrEFp0akcgZp091WmR5fLbIxMrFpWKehfzfk%3D\"}},\"heading\":{\"requirements\":\"The name of a main product, attractive and short, most 8 words\",\"value\":\"Best Phone Deals\"},\"description\":{\"requirements\":\"A brief description of the main product, unique selling point\",\"value\":\"Discover the latest smartphones at unbeatable prices\"},\"cta_1_text\":{\"requirements\":\"\",\"value\":\"Shop Now →\"},\"cta_1_link\":{\"value\":\"\"}}},{\"section\":\"FeaturedCollection\",\"props\":{\"heading\":{\"value\":\"Featured Products\",\"requirements\":\"Featured products section title\"},\"products\":[{\"figure\":{\"image\":{\"altText\":\"iPhone 12 Pro\",\"requirements\":\"A high-quality image showcasing the iPhone 12 Pro\",\"url\":\"https://cdn.shopifycdn.net/s/files/1/0723/7559/9411/files/img-placeholder.jpg?v=1685346613\"}},\"title\":{\"value\":\"iPhone 12 Pro\",\"requirements\":\"Product name, the name of a product rather than a category, because it will include the price, usually for the priority product you want to sell\"},\"price\":{\"value\":\"$999\",\"requirements\":\"Product price\"}},{\"figure\":{\"image\":{\"altText\":\"Samsung Galaxy S21 Ultra\",\"requirements\":\"A high-quality image showcasing the Samsung Galaxy S21 Ultra\",\"url\":\"https://cdn.shopifycdn.net/s/files/1/0723/7559/9411/files/img-placeholder.jpg?v=1685346613\"}},\"title\":{\"value\":\"Samsung Galaxy S21 Ultra\",\"requirements\":\"Product name, the name of a product rather than a category, because it will include the price, usually for the priority product you want to sell\"},\"price\":{\"value\":\"$1299\",\"requirements\":\"Product price\"}},{\"figure\":{\"image\":{\"altText\":\"Google Pixel 5\",\"requirements\":\"A high-quality image showcasing the Google Pixel 5\",\"url\":\"https://cdn.shopifycdn.net/s/files/1/0723/7559/9411/files/img-placeholder.jpg?v=1685346613\"}},\"title\":{\"value\":\"Google Pixel 5\",\"requirements\":\"Product name, the name of a product rather than a category, because it will include the price, usually for the priority product you want to sell\"},\"price\":{\"value\":\"$699\",\"requirements\":\"Product price\"}},{\"figure\":{\"image\":{\"altText\":\"OnePlus 9 Pro\",\"requirements\":\"A high-quality image showcasing the OnePlus 9 Pro\",\"url\":\"https://cdn.shopifycdn.net/s/files/1/0723/7559/9411/files/img-placeholder.jpg?v=1685346613\"}},\"title\":{\"value\":\"OnePlus 9 Pro\",\"requirements\":\"Product name, the name of a product rather than a category, because it will include the price, usually for the priority product you want to sell\"},\"price\":{\"value\":\"$899\",\"requirements\":\"Product price\"}}]}},{\"section\":\"ImagewithText\",\"props\":{\"figure\":{\"image\":{\"altText\":\"Experience the Future\",\"requirements\":\"A high-quality image showcasing the brand or product advantages\",\"url\":\"https://oaidalleapiprodscus.blob.core.windows.net/private/org-jbm1ZiNi2jBwU2sapjr7rARW/user-6FOjYHHcOro7uUHVJX75pYAi/img-O9EfH5JmhF7wWs1j0dQIA0i4.png?st=2023-07-19T07%3A02%3A03Z&se=2023-07-19T09%3A02%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-18T23%3A57%3A01Z&ske=2023-07-19T23%3A57%3A01Z&sks=b&skv=2021-08-06&sig=RGFGWEsggTSo6XJt3xeQB21be/ytwF9DguooTK2PJLg%3D\"}},\"image_first\":false,\"heading\":{\"value\":\"Experience the Future\",\"requirements\":\"Overview of brand or product advantages\"},\"description\":{\"value\":\"Stay connected with cutting-edge technology and stunning designs. Upgrade to the latest phone today!\",\"requirements\":\"Description of brand or product advantages, unique selling points\"},\"cta_1_text\":{\"value\":\"Learn more →\",\"requirements\":\"\"},\"cta_1_link\":{\"value\":\"\"}}},{\"section\":\"Testimonial\",\"props\":{\"heading\":{\"value\":\"Customer Reviews\",\"requirements\":\"Title of Testimonials\"},\"blocks\":[{\"review\":{\"value\":\"Amazing phone! The camera quality is outstanding and the performance is top-notch.\",\"requirements\":\"Customer reviews, positive\"},\"figure\":{\"image\":{\"altText\":\"John Smith\",\"requirements\":\"A picture of the customer who provided the review\",\"url\":\"https://oaidalleapiprodscus.blob.core.windows.net/private/org-jbm1ZiNi2jBwU2sapjr7rARW/user-6FOjYHHcOro7uUHVJX75pYAi/img-3oIh0oS0n4kcmj60lQzktgy7.png?st=2023-07-19T07%3A02%3A11Z&se=2023-07-19T09%3A02%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-18T23%3A53%3A15Z&ske=2023-07-19T23%3A53%3A15Z&sks=b&skv=2021-08-06&sig=8dAzjEbAM7NVeguUyC4eNWpsCAPBokMtQ2iTRMLQW1c%3D\"}},\"customer\":{\"value\":\"John Smith\",\"requirements\":\"Customer name\"}},{\"review\":{\"value\":\"I'm extremely satisfied with my new phone. It exceeded my expectations in every way.\",\"requirements\":\"Customer reviews, positive\"},\"figure\":{\"image\":{\"altText\":\"Emily Johnson\",\"requirements\":\"A picture of the customer who provided the review\",\"url\":\"https://oaidalleapiprodscus.blob.core.windows.net/private/org-jbm1ZiNi2jBwU2sapjr7rARW/user-6FOjYHHcOro7uUHVJX75pYAi/img-79gAFg3NTD2e6zjqMlgUvZpY.png?st=2023-07-19T07%3A02%3A19Z&se=2023-07-19T09%3A02%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-19T00%3A02%3A27Z&ske=2023-07-20T00%3A02%3A27Z&sks=b&skv=2021-08-06&sig=B1r9fyEjBzdLRMMxDgq%2BSs8o3b9ZBZC5vWQVYoijorw%3D\"}},\"customer\":{\"value\":\"Emily Johnson\",\"requirements\":\"Customer name\"}}]}}]"

const renderComponent = (componentName, props) => {
  switch (componentName) {
    case 'ImageBanner':
      return <ImageBanner {...props} />;
    case 'ImagewithText':
      return <ImagewithText {...props} />;
    case 'FeaturedCollection':
      return <SampleProducts {...props} />;
    case 'ImageCards':
      return <ImageCards {...props} />;
    case 'ImageGrid':
      return <ImageGrid {...props} />;
    case 'Testimonial':
      return <Testimonial {...props} />;
    default:
      return null;
  }
};

export default function Index() {
  return (
    <div>
      {JSON.parse(moduleData).map((item) => {
        const componentName = item[Object.keys(item)[0]];
        const props = item[Object.keys(item)[1]];
        return (
          <div key={componentName}>{renderComponent(componentName, props)}</div>
        );
      })}
    </div>
  );
}
