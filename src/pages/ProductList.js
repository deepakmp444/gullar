import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProductList } from "../store/features/productSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../styles/productList.css";
import Loader from "../components/Loader";
function ProductList() {
  const { name } = useParams();
  const productList = useSelector((state) => state.product.productList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList(name));
  }, [dispatch, name]);

  return (
    <>
      <Container>
        <Row style={{ marginTop: "80px" }}>
          <Col sm={12} className="heightFromTop">
            {productList.length === 0 ? (
              <Loader />
            ) : (
              <>
                <div className="text-muted" style={{ fontSize: "20px" }}>
                  <strong>
                    <kbd>{productList.length}</kbd> {name} found
                  </strong>
                </div>
                <Container>
                  <Row className="mt-3 mb-5 ">
                    {productList.map((value) => {
                      return (
                        <Col
                          sm={4}
                          key={value.id}
                          className="mb-3 d-flex justify-content-center"
                        >
                          <div className="" style={{ width: "250px" }}>
                            <Link to={`${value.id}`}>
                              <LazyLoadImage
                                src={value.ProductPropJson[0].img}
                                height={250}
                                effect="blur"
                                className="rounded mx-auto d-block"
                              />
                            </Link>
                            <div className="d-flex">
                              <div className="mt-1">
                                <Link
                                  className="link"
                                  to={`/product/${value.SubCategory}/${value.id}`}
                                >
                                  {value.productHeading}
                                </Link>
                              </div>
                              <div className="mt-1">
                                <strong>
                                  <span
                                    className="text-success"
                                    style={{ marginLeft: "100px" }}
                                  >
                                    Rs&nbsp;
                                    {Math.min(
                                      ...value.ProductPropJson.map(
                                        (product) => product.price
                                      )
                                    )}
                                  </span>
                                </strong>
                              </div>
                            </div>
                            <div className="text-muted">
                              {value.productSubheading}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
