
import { Button, Dropdown, Modal, Space, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { memo, useCallback, useState } from "react";
import "./order.css"
import { OrderApi } from "../../apis";
import { useNavigate } from "react-router-dom";
import {OrderForm} from "../../components/order/form";

import { DownOutlined } from "@ant-design/icons";




const OrderFoodScreen = memo(() => {
    const navigate = useNavigate();
    const [action, setAction] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const [data, setData] = useState({
        rows: [],
        count: 0
    })

    const fetch = useCallback(async (pagination) => {
        const res = await OrderApi.list({
            limit: pagination.pageSize,
            page: pagination.current
        })
        setData(res);
    }, [setData])

    const items =  [
        {
          label: 'Edit',
          key: 'edit',
        },
        {
            label: 'Remove',
            key: 'remove',
          },
      ];

    const handleActions = async (e, id) => {

        switch(e) {
            case "edit": 
                const res = await OrderApi.get(id)
                console.log("res :", res);
                setAction(["edit", res])
                break;
            case "remove":
                onRemove(id);
                break;
        }

    }

    const onChange = (pagination, filters, sorter) => {
        setPagination(pagination);
        
    };

    const onCreate = () => {
        setAction(["create"]);
    }
    const onCancel = () => {
        setAction([]);
    }

    const onRemove = async (id) => {
        await OrderApi.remove(id);
        fetch({
            pageSize: 20,
            current: 1
        })
    }
    const onSubmit = async (values) => {
        console.log("values :", values);

        try{
            if(action && action[0] === "edit") {
                await OrderApi.update(action[1]._id, values);
            }else {
                await OrderApi.create(values);
            }
            fetch({
                pageSize: 20,
                current: 1
            })
            setAction([]);
        }catch(err){

        }
    }


    React.useEffect(() => {
        fetch(pagination)
    }, [pagination?.current])


    return (
        <>
        <div className="root">
             <Header className="header">
                <h2 className="title">Orders</h2>
            </Header>

            <div className="body">
                <div className="content">
                    <div className="table-header">
                        <h3>Orders</h3>

                        <Button onClick={onCreate}>
                            New
                        </Button>
                    </div>
                        <Table 
                            bordered={true} 
                            columns={columns(items, handleActions)} 
                            dataSource={data.rows} 
                            onChange={onChange}
                        />
                </div>
            </div>
        </div>

        {
            action && action[0] && (
                <Modal title="New order" open={action && action[0]} onOk={onSubmit} onCancel={onCancel} footer={null}>
                    <OrderForm onSubmit={onSubmit} onCancel={onCancel} action={action}/> 
                </Modal>
            )
        }

        </>
    )

});

const columns = (items, handleActions) => {

    return [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (value) => <a>{value}</a>,
    },
    {
        title: 'Table',
        dataIndex: 'table',
        key: 'table',
        render: (value) => <a>{value}</a>,
    },
    {
        title: 'Food',
        dataIndex: 'food',
        key: 'food',
        render: (value) => <a>{value}</a>,
    },{
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (value) => <a>{value}</a>,
    },{
        title: 'Actions',
        render: (_, record) => (
            <Dropdown order={{ items: items, onClick: (e) => handleActions(e.key, record._id) }}  trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Actions
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        ),
    },]
}

OrderFoodScreen.displayName ="OrderFoodScreen";

export {
    OrderFoodScreen
}