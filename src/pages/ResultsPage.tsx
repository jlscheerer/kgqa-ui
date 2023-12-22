import { useState } from "react";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import { Background, BackgroundVariant, ReactFlow } from "reactflow";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import "reactflow/dist/style.css";
import "./style.css";

import ResultEntry from "../components/ResultEntry";
import SearchBox from "../components/SearchBox";

const ResultsTab = () => {
  const id = "Q71";
  const title = "Barack Obama";
  const description = "president of the United States from 2009 to 2017";
  const score = "1.00";
  const scoreColor = "#E3EDD5";
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/192px-President_Barack_Obama.jpg";
  const opacity = "100";
  const link = "entity?id=Q76";
  const derivation = "president_of ↦ head_of_government (0.71)";

  return (
    <>
      <ResultEntry
        id={id}
        title={title}
        description={description}
        score={score}
        scoreColor={scoreColor}
        image={image}
        opacity={opacity}
        link={link}
        derivation={derivation}
      />
      <ResultEntry
        id={id}
        title={title}
        description={description}
        score="0.82"
        scoreColor="#FBE7CD"
        image={image}
        opacity="82"
        link={link}
        derivation={derivation}
      />
    </>
  );
};

const QueryGraphTab = () => {
  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, type: "input" },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: { label: "2" },
      type: "output",
    },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", label: "something" },
  ];

  return (
    <div
      style={{ border: "1px solid #F1E9E4", width: "100%", height: "500px" }}
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        edgesUpdatable={false}
        nodesConnectable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

type CodeTabProps = {
  code: string;
  language: string;
};

const CodeTab = (props: CodeTabProps) => {
  return (
    <SyntaxHighlighter language={props.language} style={oneLight}>
      {props.code}
    </SyntaxHighlighter>
  );
};

const IRTab = () => {
  return (
    <>
      <p>
        <b>Intermediate Representation (QirK)</b>
      </p>
      <CodeTab code="X: president(X)" language="none" />
    </>
  );
};

const ResultsPage = () => {
  const [search, setSearch] = useState(
    "Who is the current president of the US?"
  );
  return (
    <div style={{ width: "90%", paddingTop: "5%", paddingLeft: "10%" }}>
      {/*<h1>Who is the current president of the US?</h1>*/}
      <SearchBox
        search={search}
        onUpdateSearch={setSearch}
        textAlign="left"
        autoFocus={false}
        showStatus={false}
      />
      <div
        style={{
          backgroundColor: "rgb(33, 195, 84, 0.1)",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <p
          style={{
            flex: 1,
            margin: 0,
            color: "rgb(23, 114, 51)",
          }}
        >
          Retrieved query results and relative scores. 27 results (5 seconds)
        </p>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="results">
        <Row>
          <Col>
            <Nav variant="pills" className="justify-content-start">
              <Nav.Item>
                <Nav.Link eventKey="results" className="format-pill">
                  Results
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ir" className="format-pill">
                  QirK
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="graph" className="format-pill">
                  Query Graph
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sparql" className="format-pill">
                  SPARQL
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sql" className="format-pill">
                  SQL
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <div style={{ padding: "5px" }}></div>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="results">
                <ResultsTab />
              </Tab.Pane>
              <Tab.Pane eventKey="ir">
                <IRTab />
              </Tab.Pane>
              <Tab.Pane eventKey="graph">
                <QueryGraphTab />
              </Tab.Pane>
              <Tab.Pane eventKey="sparql">
                <CodeTab code="SELECT ?X WHERE {}" language="sparql" />
              </Tab.Pane>
              <Tab.Pane eventKey="sql">
                <CodeTab code="SELECT * FROM customers" language="sql" />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ResultsPage;
