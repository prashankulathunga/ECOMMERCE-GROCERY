import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { product, addToCart, navigate, setShowUserLogin, user } =
    useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const singleProduct = product.find((item) => item._id === id);

  useEffect(() => {
    let related = product.slice();
    related = related.filter(
      (rel) =>
        rel.category.toLowerCase() === singleProduct.category.toLowerCase() &&
        rel._id !== singleProduct._id
    );
    setRelatedProducts(related);

    console.log("rel", related);
  }, [product, singleProduct]);

  console.log("Related Product List", relatedProducts);

  useEffect(() => {
    if (singleProduct) {
      setThumbnail(singleProduct.image[0]);
    }
  }, [singleProduct]);

  return (
    <div>
      {singleProduct && (
        <div className="max-w-6xl w-full px-6 mt-8 md:mt-16">
          <p>
            <Link to={"/"}>Home</Link> /<Link to={"/product"}> Products</Link> /
            <Link to={`/product/${singleProduct.category.toLowerCase()}`}>
              {" "}
              {singleProduct.category}
            </Link>{" "}
            /<span className="text-primary"> {singleProduct.name}</span>
          </p>

          <div className="flex flex-col md:flex-row gap-16 mt-4">
            <div className="flex gap-3">
              <div className="flex flex-col gap-3">
                {singleProduct.image.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setThumbnail(img)}
                    className="border max-w-24 border-gray-500/10 rounded overflow-hidden cursor-pointer"
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>

              <div className="border border-gray-500/10 max-w-100 rounded overflow-hidden">
                <img src={thumbnail} alt="Selected product" />
              </div>
            </div>

            <div className="text-sm w-full md:w-1/2">
              <h1 className="text-3xl font-medium">{singleProduct.name}</h1>

              <div className="flex items-center gap-0.5 mt-1">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <img
                      src={i < 4 ? assets.star_icon : assets.star_icon_dull}
                      alt=""
                      className="md:w-4 w-3.5"
                    />
                  ))}
                <p className="text-base ml-2">(4)</p>
              </div>

              <div className="mt-6">
                <p className="text-gray-500/70 line-through">
                  MRP: ${singleProduct.price}
                </p>
                <p className="text-2xl font-medium">
                  MRP: ${singleProduct.offerPrice}
                </p>
                <span className="text-gray-500/70">
                  (inclusive of all taxes)
                </span>
              </div>

              <p className="text-base font-medium mt-6">About Product</p>
              <ul className="list-disc ml-4 text-gray-500/70">
                {singleProduct.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>

              <div className="flex items-center mt-10 gap-4 text-base">
                <button
                  onClick={() =>
                    user ? addToCart(singleProduct._id) : setShowUserLogin(true)
                  }
                  className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    if (user) {
                      addToCart(singleProduct._id);
                      navigate("/cart");
                      scrollTo(0, 0);
                    } else {
                      setShowUserLogin(true);
                    }
                  }}
                  className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-2" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full mt-6 md:gap-6 gap-3">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((products, index) => (
              <ProductCard key={index} product={products} />
            ))}
        </div>
        <div className="my-16">
          <button
            onClick={() => {
              navigate("/product");
              scrollTo(0, 0);
            }}
            className="mx-auto px-12 border border-primary text-primary hover:bg-primary/10 cursor-pointer transition-all py-2.5 rounded"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
