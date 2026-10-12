import { useParams } from "react-router-dom";
import products from "../../data/products";
import Breadcrumb from "../../components/productDetails/Breadcrumb.jsx"
import ImageGallery from "../../components/productDetails/ImageGallery";
import ProductInfo from "../../components/productDetails/ProductInfo";
import Benefits from "../../components/productDetails/Benefits";
import Ingredients from "../../components/productDetails/Ingredients";
import HowToUse from "../../components/productDetails/HowToUse";
import ProductDescription from "../../components/productDetails/ProductDescription";
import DeliveryInfo from "../../components/productDetails/DeliveryInfo";
import Reviews from "../../components/productDetails/Reviews";
import YouMayLike from "../../components/productDetails/YouMayLike";
import FAQ from "../../components/productDetails/FAQ.jsx";

function ProductDetails() {
  const { slug } = useParams();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="bg-white">
      <Breadcrumb product={product}/>

      {/* Product Hero */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ImageGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* Benefits */}
      <Benefits product={product} />

      {/* Ingredients */}
      <Ingredients product={product} />

      {/* How To Use */}
      <HowToUse product={product} />

      {/* Description */}
      <ProductDescription product={product} />

      {/* Delivery */}
      <DeliveryInfo />

      {/* Reviews */}
      <Reviews product={product} />

      {/* Similar Products */}
      <YouMayLike product={product} />

      <FAQ />

    </main>
  );
}

export default ProductDetails;