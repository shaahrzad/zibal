import React, { useRef, useState } from 'react';
import { SearchOutlined , CopyOutlined} from '@ant-design/icons';
import { Button, Dropdown, Input, Space, Table,Badge,Image  } from 'antd';
import Form from '../modules/Form';
import data from '../../constants/mock';
import {sp} from '../../services/number'

function HomePage() {
    
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });


    const columns = [
        {
          title: 'شماره تراکنش',
          dataIndex: 'trackId',
          key: 'trackId',
          ...getColumnSearchProps('trackId'),
        },
        {
          title: 'وضغیت تراکنش',
          dataIndex: 'status',
          key: 'status',
          render:(status)=>{
            return <p>{status === 1 ? <Badge status="success" text="پرداخت موفق" />  : ""}</p>
          }
        },
        {
          title: 'تاریخ پرداخت',
          dataIndex: 'paidAt',
          key: 'paidAt',
        },
        {
          title: 'مبلغ',
          dataIndex: 'amount',
          key: 'amount',
          render:(amount) => {
            return <p>{`ریال ${sp(amount)}`}</p>
          }
        },
        {
          title: 'شماره کارت',
            dataIndex: 'cardNumber',
            key: 'cardNumber',
            ...getColumnSearchProps('cardNumber'),
        },   
    ]
    console.log(columns)


  return (
    <>
        <div style={{width:'800px', margin:" 50px auto"}}>
        <Table dataSource={data} columns={columns}></Table>
        </div>
        <Form/>
    </>
  )
}

export default HomePage
