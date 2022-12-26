import "antd/dist/reset.css";
import "./App.css";
import { Table, Select, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];

function App() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=50")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((ele) => {
          ele.key = ele.id;
          options.push({
            value: ele.id,
            label: ele.name,
          });
        });
        setData(data);
        setOptions([...options]);
      });
  }, []);

  return (
    <div className="App">
      <h2 className="head">Task 1 - Select and Grid</h2>
      <Divider orientation="left">Select</Divider>
      <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select" options={options} gutter="2"/>
      <Divider orientation="left">Grid</Divider>
      <Row gutter={[12, 24]} >
        {data.map((item) => {
          return (
            <Col key={item.id} className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}><div className="box">{item.email}</div></Col>
          );
        })}
      </Row>
      <hr/>
      <h2 className="head">Task 2 - Table with jsonplaceholder API</h2>
      <Divider orientation="left">Table</Divider>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <span>
              {record.id} - {record.email} - {record.name} - {record.body}
            </span>
          ),
          rowExpandable: (record) => record.id !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
}

export default App;
