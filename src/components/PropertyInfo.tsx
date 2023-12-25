import React, { ReactNode } from "react";

type PropertyInfoData = {
  name: string;
  id: string;
  link: string;
};

type PropertyInfoProps = {
  property: PropertyInfoData;
  data: [PropertyInfoData];
};

const PropertyInfo = (props: PropertyInfoProps) => {
  return (
    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          paddingTop: "5px",
          paddingLeft: "5px",
          height: "100%",
          width: "100%",
          border: "2px solid #FBFBFB",
          borderRadius: "10px",
          backgroundColor: "#FBFBFB",
          // boxShadow: "0px 4px 3px 0px #F3F3F3",
        }}
      >
        <div style={{ padding: "10px", paddingBottom: "0" }}>
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
                flexDirection: "column",
                gap: 0,
              }}
            >
              <a
                href={props.property.link}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p
                  style={{
                    fontWeight: "leighter",
                    fontSize: "0.5rem",
                    margin: "0",
                  }}
                >
                  {props.property.name}{" "}
                  <span
                    style={{
                      backgroundColor: "#F1E9E4",
                      borderRadius: "4px",
                      fontSize: "0.45rem",
                      padding: "0px 7px 0 5px",
                      fontWeight: "leighter",
                    }}
                  >
                    {props.property.id}
                  </span>
                </p>
              </a>
              <p>
                {props.data.map((result: PropertyInfoData, index: any) => {
                  return (
                    <>
                      <a
                        href={result.link}
                        target="_blank"
                        style={{ textDecoration: "none", color: "#4285F4" }}
                      >
                        {result.name}{" "}
                        <span
                          style={{
                            backgroundColor: "#F1E9E4",
                            borderRadius: "7px",
                            fontSize: "0.95rem",
                            padding: "0px 7px 0 5px",
                            fontWeight: "leighter",
                          }}
                        >
                          {result.id}
                        </span>
                      </a>
                      {index + 1 < props.data.length ? ", " : ""}
                    </>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
