import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchReview } from "../../store/features/reviewSlice";
import Star from "../Icons/Star";

function ProductReview({ id }) {
  const { review } = useSelector((state) => state.review);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReview({ id }));
  }, [dispatch, id]);

  return (
    <div>
      {review.map((value, index) => {
        return (
          <Card key={index} className="mb-2">
            <div className="p-3">
              <h5>{value.name} ✅ </h5>
              <div className="d-flex mb-2" style={{ marginTop: "-5px" }}>
                <div>
                  <Star />
                </div>
                <div className="ms-2" style={{ marginTop: "2px" }}>
                  {value.rating}
                </div>
              </div>
              <p>{value.descriptions}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default ProductReview;
