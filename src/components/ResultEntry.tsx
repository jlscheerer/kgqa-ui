import React, { ReactNode } from "react";

type ResultEntryProps = {
  id: string;
  title: string;
  description: string;
  score: string;
  scoreColor: string;
  image: string;
  opacity: string;
  link: string;
  derivation: string;
};

const ResultEntry = (props: ResultEntryProps) => {
  return (
    <div style={{ height: "80px", opacity: props.opacity + "%" }}>
      <div
        style={{
          marginLeft: "1px",
          height: "100%",
          width: "calc(100% - 4px)",
          border: "2px solid #FBFBFB",
          borderRadius: "10px",
          boxShadow: "0px 4px 3px 0px #F3F3F3",
          cursor: "pointer",
        }}
        onClick={() => window.open(props.link, "_self")}
      >
        <div style={{ padding: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              gap: "10px",
            }}
          >
            <img
              style={{
                borderRadius: "10px",
                height: "60px",
                width: "60px",
                objectFit: "cover",
              }}
              src={props.image}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "75px",
              }}
            >
              <div style={{ height: "70px" }}>
                <h5 style={{ marginBottom: "0em", fontSize: "1.2rem" }}>
                  {props.title}{" "}
                  <span
                    style={{
                      backgroundColor: "#F1E9E4",
                      borderRadius: "7px",
                      fontSize: "0.85rem",
                      padding: "0px 7px 0 5px",
                      fontWeight: "lighter",
                      position: "relative",
                      top: "-2px",
                    }}
                  >
                    {props.id}
                  </span>
                </h5>
                <p
                  style={{
                    fontWeight: "lighter",
                    fontSize: "0.95rem",
                    margin: "0",
                  }}
                >
                  {props.description}
                </p>
                <p
                  style={{
                    color: "gray",
                    fontWeight: "lighter",
                    fontSize: "0.4rem",
                  }}
                >
                  {props.derivation}
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: props.scoreColor,
                height: "60px",
                borderRadius: "10px",
                marginLeft: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 10px 0px 8px",
                lineHeight: "1",
              }}
            >
              <p style={{ margin: "0px 0px" }}>
                <b>{props.score}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultEntry;
