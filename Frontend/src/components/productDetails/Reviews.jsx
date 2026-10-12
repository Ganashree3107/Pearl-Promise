import { Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { reviewApi } from "../../services/api";

function Reviews({ product }) {
  const [reviewData, setReviewData] = useState({ items: [], average_rating: 0, review_count: 0 });

  useEffect(() => {
    let active = true;
    reviewApi.list(product.slug)
      .then((data) => {
        if (active) setReviewData(data);
      })
      .catch(() => {
        if (active) setReviewData({ items: [], average_rating: 0, review_count: 0 });
      });
    return () => {
      active = false;
    };
  }, [product.id]);

  const reviews = reviewData.items;
  const averageRating = reviewData.review_count ? reviewData.average_rating : product.rating;
  const reviewCount = reviewData.review_count || product.reviews;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}

      <div className="text-center mb-14">
        <p className="text-pink-500 uppercase tracking-[0.3em] text-sm font-semibold">
          Customer Love
        </p>

        <h2 className="mt-3 text-4xl font-bold text-gray-900">
          Customer Reviews
        </h2>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Real experiences from Pearl Promise customers who have tried this product.
        </p>
      </div>

      {/* Rating Summary */}

      <div className="mb-12 rounded-3xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 p-8 flex flex-col md:flex-row items-center justify-between gap-8">

        <div>
          <h3 className="text-5xl font-bold text-gray-900">
            {averageRating}
          </h3>

          <div className="flex mt-2">

            {[1,2,3,4,5].map((star)=>(
              <Star
                key={star}
                size={20}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

          </div>

          <p className="mt-2 text-gray-500">
            Based on {reviewCount} Reviews
          </p>

        </div>

        <div className="w-full md:w-80 space-y-3">

          {[
            {stars:5,width:"88%"},
            {stars:4,width:"65%"},
            {stars:3,width:"35%"},
            {stars:2,width:"18%"},
            {stars:1,width:"8%"},
          ].map((item)=>(
            <div
              key={item.stars}
              className="flex items-center gap-3"
            >
              <span className="w-6 text-sm">
                {item.stars}
              </span>

              <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full rounded-full bg-pink-500"
                  style={{width:item.width}}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Reviews */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {reviews.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No verified reviews yet.
          </p>
        )}

        {reviews.map((review,index)=>(
          <motion.div
            key={review.id}
            initial={{opacity:0,y:30}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{delay:index*0.1}}
            className="rounded-3xl bg-white border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 p-8"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-lg">
                  {review.user_name}
                </h3>

                <div className="flex items-center gap-1 text-green-600 text-sm mt-1">

                  <CheckCircle size={16}/>

                  Verified Buyer

                </div>

              </div>

              <span className="text-sm text-gray-400">
                {new Date(review.created_at).toLocaleDateString()}
              </span>

            </div>

            <div className="flex gap-1 mt-5">

              {[...Array(review.rating)].map((_,i)=>(
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

            </div>

            <p className="mt-5 text-gray-600 leading-7">
              "{review.text}"
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default Reviews;