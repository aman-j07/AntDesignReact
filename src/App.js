import 'antd/dist/reset.css';
import './App.css';
import { Table } from 'antd';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

function App() {
  const [data,setData]=useState([])
  
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then((res) => res.json())
    .then((data) => {data.forEach((ele)=>{ele.key=ele.id});setData(data);console.log(data)});
  },[])
  
  return (
    <div className="App">
      <Table
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (<span>{record.id} - {record.email} - {record.name} - {record.body}</span>
      ),
      rowExpandable: (record) => record.id !== 'Not Expandable',
    }}
    dataSource={data}
  />
    </div>
  );
}

export default App;
