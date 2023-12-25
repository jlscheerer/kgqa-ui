import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PropertyInfo from "../components/PropertyInfo";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type DetailViewPageProps = {
  type: "entity" | "property";
};

type PropertyInfoData = {
  name: string;
  id: string;
  link: string;
};

type PropertyInfo = {
  property: PropertyInfoData;
  data: [PropertyInfoData];
};

const DetailViewPage = (props: DetailViewPageProps) => {
  const [searchParams, _] = useSearchParams();
  const id = searchParams.get("id");

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");

  const [propertyInfo, setPropertyInfo] = useState<[PropertyInfo]>(
    [] as unknown as [PropertyInfo]
  );

  const [image, setImage] = useState("");

  const remoteFetchQueryResults = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/" +
        props.type +
        "?" +
        new URLSearchParams({ id: id! }).toString()
    ).then((response) => response.json());
    setLabel(response["label"]);
    setImage(response["image"]);
    setDescription(response["description"]);
    setCaption(response["caption"]);
    setPropertyInfo(response["properties"]);
    document.title = response["label"] + " - QirK";
  };
  useEffect(() => {
    remoteFetchQueryResults();
  }, []);

  return (
    <div style={{ width: "90%", paddingTop: "5%", paddingLeft: "10%" }}>
      <Container>
        <Row>
          {image !== null && (
            <Col xs={3}>
              <img style={{ width: "100%" }} src={image} />
              <p
                style={{
                  fontWeight: "lighter",
                  color: "gray",
                  fontSize: "0.75rem",
                  paddingTop: "10px",
                  textAlign: "center",
                }}
              >
                {caption}
              </p>
              {/*<Skeleton />*/}
            </Col>
          )}
          <Col xs={image === null ? 12 : 9}>
            <div>
              <div>
                <h2>
                  {label}{" "}
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
                  {description}
                </p>
                <div style={{ position: "relative", top: "-15px" }}>
                  {propertyInfo.map((property) => (
                    <PropertyInfo
                      property={property.property}
                      data={property.data}
                    />
                  ))}
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
