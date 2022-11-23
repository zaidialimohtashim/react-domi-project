import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../partials/footer";
import Header from "../partials/header";
import Sidebar from "../partials/sidebar";
import { updateUserStatus, UserListing } from "../../../api/userApi";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Column } from "primereact/column";
import "./DataTableDemo.css";
import { AuthLayout } from "../master";
import { useDispatch } from "react-redux";
import { setStart } from "../../../redux/preloaderSlice";


const UserListingView = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState<any[]>([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState<any>(null);
    const [active, setActive] = useState(1);

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    const updateStatus = async (data, e) => {
        let userList = users;
        const userIndex = userList.findIndex(item => item.id == data.id)
        userList[userIndex] = { ...userList[userIndex], status: userList[userIndex].status ? 0 : 1 }
        let userData = await updateUserStatus(userList[userIndex]);
        console.log(userData);
        setUsers([...userList])
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };

        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const actionBodyTemplate = (rowData: any) => {
        //rowData.status
        return (
            <Fragment>
                <Button icon={rowData.status ? "pi pi-unlock" : "pi pi-lock"} className={rowData.status ? "p-button-rounded p-button-success" : "p-button-rounded p-button-warning"} onClick={(event) => updateStatus(rowData, event)} />
            </Fragment>
        );
    }

    const getUserData = useCallback(async () => {
        try {
            dispatch(setStart(true))
            const customer = await UserListing();
            setUsers(customer.data.data);
            initFilters1();

        } catch (e) {

        }
        dispatch(setStart(false))

    }, []);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'firstName': { value: null, matchMode: FilterMatchMode.STARTS_WITH, operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'lastName': { value: null, matchMode: FilterMatchMode.STARTS_WITH, operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'email': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        });
        setGlobalFilterValue1('');
    }


    const clearFilter1 = () => {
        initFilters1();
    }

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const header1 = renderHeader1();

    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">User Listing</h4>
                </div>
            </div>
            <div className="datatable-doc-demo">
                <div className="card">
                    <DataTable paginator showGridlines dataKey="id" filters={filters1} filterDisplay="menu" value={users} rows={10} globalFilterFields={['firstName', 'lastName', 'email']} header={header1} emptyMessage="No customers found." responsiveLayout="scroll">
                        <Column filterField="firstName" filter field="firstName" header="First Name" sortable></Column>
                        <Column filterField="lastName" filter field="lastName" header="Last Name" sortable></Column>
                        <Column filterField="email" filter field="email" header="Email" sortable></Column>
                        <Column body={actionBodyTemplate} header="Action" style={{ width: '10px' }}></Column>
                    </DataTable>
                </div>
            </div>
        </AuthLayout>

    );

};



export default UserListingView;
