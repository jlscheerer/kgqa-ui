import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PropertyInfo from "../components/PropertyInfo";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type DetailViewPageProps = {
  type: "entity" | "property";
};

const DetailViewPage = (props: DetailViewPageProps) => {
  const name = "Barack Obama";

  const [searchParams, _] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    document.title = name + " - QirK";
  }, []);

  return (
    <div style={{ width: "90%", paddingTop: "5%", paddingLeft: "10%" }}>
      <Container>
        <Row>
          <Col xs={3}>
            <img
              style={{ width: "100%" }}
              src="https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg"
            />
            <p
              style={{
                fontWeight: "lighter",
                color: "gray",
                fontSize: "0.75rem",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              Official photograph of President Barack Obama
            </p>
            {/*<Skeleton />*/}
          </Col>
          <Col xs={9}>
            <div>
              <div>
                <h2>
                  {name}{" "}
                  <span
                    style={{
                      backgroundColor: "#F1E9E4",
                      borderRadius: "7px",
                      fontSize: "1.5rem",
                      padding: "0px 7px 0 5px",
                      fontWeight: "leighter",
                      position: "relative",
                      top: "-3px",
                    }}
                  >
                    {id}
                  </span>
                </h2>
                <p
                  style={{
                    position: "relative",
                    top: "-8px",
                    fontWeight: "lighter",
                    color: "gray",
                  }}
                >
                  president of the United States from 2009 to 2017
                </p>
                <div style={{ position: "relative", top: "-15px" }}>
                  <PropertyInfo
                    property={{
                      name: "instance of",
                      id: "P99",
                      link: "https://google.com",
                    }}
                    data={[
                      {
                        name: "human",
                        id: "Q100",
                        link: "https://bing.com",
                      },
                    ]}
                    key="info1"
                  />
                  <PropertyInfo
                    property={{
                      name: "instance of",
                      id: "P99",
                      link: "https://google.com",
                    }}
                    data={[
                      {
                        name: "human",
                        id: "Q100",
                        link: "https://bing.com",
                      },
                    ]}
                    key="info2"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailViewPage;
