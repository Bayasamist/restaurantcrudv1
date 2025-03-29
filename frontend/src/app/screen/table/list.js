import { Button, Dropdown, Modal, Space, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { memo, useCallback, useState, useMemo } from "react";
import "./table.css";
import { TableApi } from "../../apis";
import { useNavigate } from "react-router-dom";
import { TableForm } from "../../components/table/form";
import { DownOutlined } from "@ant-design/icons";

// Define the TableListScreen component
const TableListScreen = memo(() => {
    const navigate = useNavigate();
    const [action, setAction] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [table, setTable] = useState({ rows: [], count: 0 });

    const fetch = useCallback(async (pagination) => {
        try {
            // Updated request URL to match backend
            const res = await TableApi.list({
                limit: pagination.pageSize,
                page: pagination.current
            });
            setTable(res);
        } catch (err) {
            console.error("Error fetching data:", err);  // Log the error
        }
    }, [setTable]);

    const items = [
        { label: 'Edit', key: 'edit' },
        { label: 'Remove', key: 'remove' },
    ];

    const handleActions = async (e, id) => {
        try {
            switch (e) {
                case "edit":
                    const res = await TableApi.get(id);
                    console.log("res :", res);
                    setAction(["edit", res]);
                    break;
                case "remove":
                    await onRemove(id);
                    break;
                default:
                    console.warn(`Unknown action: ${e}`);
                    break;
            }
        } catch (err) {
            console.error("Error in handleActions:", err);  // Log the error
        }
    };

    const onChange = (pagination) => {
        setPagination(pagination);
    };

    const onCreate = () => {
        setAction(["create"]);
    };

    const onCancel = () => {
        setAction([]);
    };

    const onRemove = async (id) => {
        try {
            await TableApi.remove(id);
            fetch({ pageSize: 20, current: 1 });
        } catch (err) {
            console.error("Error removing item:", err);  // Log the error
        }
    };

    const onSubmit = async (values) => {
        console.log("values :", values);
        try {
            if (action && action[0] === "edit") {
                await TableApi.update(action[1]._id, values);
            } else {
                await TableApi.create(values);
            }
            fetch({ pageSize: 20, current: 1 });
            setAction([]);
        } catch (err) {
            console.error("Error in onSubmit:", err);  // Log the error
        }
    };

    React.useEffect(() => {
        fetch(pagination);
    }, [pagination]);

    const columns = useMemo(() => {
        return [
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                render: (value) => <a>{value}</a>,
            },
            {
                title: 'Actions',
                render: (_, record) => (
                    <Dropdown table={{ items: items, onClick: (e) => handleActions(e.key, record._id) }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Actions
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                ),
            },
        ];
    }, [items, handleActions]);

    return (
        <>
            <div className="root">
                <Header className="header">
                    <h2 className="title">Table</h2>
                </Header>

                <div className="body">
                    <div className="content">
                        <div className="table-header">
                            <h3>Tables</h3>
                            <Button onClick={onCreate}>New</Button>
                        </div>
                        <Table
                            bordered={true}
                            columns={columns}
                            dataSource={table.rows}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>

            {action && action[0] && action[0] !== "remove" && (
                <Modal
                    title="New table"
                    open={true}
                    onOk={onSubmit}
                    onCancel={onCancel}
                    footer={null}
                >
                    <TableForm onSubmit={onSubmit} onCancel={onCancel} action={action} />
                </Modal>
            )}
        </>
    );
});

TableListScreen.displayName = "TableListScreen";

export { TableListScreen };
