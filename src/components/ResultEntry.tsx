import React, { ReactNode, useMemo } from "react";

type ResultEntryContentProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
  variable?: string;
  type: "entity_id" | "date" | "string" | "numeric";
};

const prettifyDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
  });
};

const ResultEntryContent = (props: ResultEntryContentProps) => {
  let imageStyle: React.CSSProperties = {
    borderRadius: "10px",
    height: "60px",
    width: "60px",
    objectFit: "cover",
  };
  let labelIdStyle: React.CSSProperties = {
    backgroundColor: "#F1E9E4",
    borderRadius: "7px",
    fontSize: "0.85rem",
    padding: "0px 7px 0px 5px",
    fontWeight: "lighter",
    position: "relative",
    top: "-2px",
  };
  let varStyle: React.CSSProperties = {
    ...labelIdStyle,
    backgroundColor: "#53B8D1",
    color: "white",
    textAlign: "center",
    padding: "0px 5px 0px 5px",
  };

  let title = useMemo(
    () => (props.type !== "date" ? props.title : prettifyDate(props.title)),
    [props.title]
  );

  return (
    <div
      onClick={() => {
        if (props.link) {
          window.open(props.link, "_self");
        }
      }}
      style={{
        padding: "8px",
        display: "flex",
        flexDirection: "row",
        cursor: props.link ? "pointer" : undefined,
      }}
    >
      <div style={{ paddingRight: "10px" }}>
        {props.image != null && <img style={imageStyle} src={props.image} />}
      </div>
      <div>
        <div style={{ height: "70px" }}>
          <h5 style={{ marginBottom: "0em", fontSize: "1.2rem" }}>
            {props.variable && <span style={varStyle}>{props.variable}</span>}{" "}
            {title}{" "}
            {props.id && props.id !== "None" && (
              <span style={labelIdStyle}>{props.id}</span>
            )}
          </h5>
          <p
            style={{
              fontWeight: "lighter",
              fontSize: "0.95rem",
              margin: "0",
              textOverflow: "ellipsis",
            }}
          >
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

type ResultHeadInfo = {
  id: string;
  type: "entity_id" | "date" | "string" | "numeric";
  variable: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

type ResultEntryProps = {
  head: [ResultHeadInfo];
  score: string;
  scoreColor: string;
  opacity: string;
};

const ResultEntry = (props: ResultEntryProps) => {
  let backgroundStyle: React.CSSProperties = {
    marginLeft: "1px",
    height: "100%",
    width: "calc(100% - 4px)",
    border: "2px solid #FBFBFB",
    borderRadius: "10px",
    boxShadow: "0px 4px 3px 0px #F3F3F3",
  };

  let scoreStyle: React.CSSProperties = {
    backgroundColor: props.scoreColor,
    height: "60px",
    borderRadius: "10px",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 10px 0px 8px",
    lineHeight: "1",
  };

  return (
    <div style={{ height: "80px", opacity: props.opacity + "%" }}>
      <div style={backgroundStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "left",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            {props.head.map((entry, index) => (
              <div
                style={{
                  flex: 1,
                  borderLeft: index ? "3px solid #F3F3F3" : undefined,
                  height: "80px",
                }}
              >
                <ResultEntryContent
                  id={entry.id}
                  image={entry.image}
                  title={entry.title}
                  description={entry.description}
                  link={entry.link}
                  variable={entry.variable}
                  type={entry.type}
                />
              </div>
            ))}
          </div>
          <div style={{ ...scoreStyle, margin: "10px" }}>
            <p style={{ margin: "0px 0px" }}>
              <b>{props.score}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultEntry;
