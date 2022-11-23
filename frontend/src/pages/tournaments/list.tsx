import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../partials/footer";
import Header from "../partials/header";
import Sidebar from "../partials/sidebar";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Column } from "primereact/column";
// import "./DataTableDemo.css";
import { AuthLayout } from "../master";
import { AvatarListing, delCategory } from "../../../api/AvatarApi";
import { useDispatch } from "react-redux";
import { setStart } from "../../../redux/preloaderSlice";

const TournamentsView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [avatars, setAvatar] = useState<any[]>([]);
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState<any>(null);

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const getAvatarData = useCallback(async () => {
        try {
            dispatch(setStart(true));
            const Avatar = await AvatarListing();
            setTournaments([]);
            initFilters1();
        } catch (e) {

        }

        dispatch(setStart(false));

    }, []);

    useEffect(() => {
        getAvatarData();
    }, [getAvatarData]);

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH, operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'noOfPlayers': { value: null, matchMode: FilterMatchMode.STARTS_WITH, operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue1('');
    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => EditCategory(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-success mr-2" onClick={() => DeleteCategory(rowData)} />
            </Fragment>
        );
    }

    const EditCategory = (data) => {
        navigate("/edit-avatar-category/" + data.id)
    }

    const DeleteCategory = async (data) => {
        setAvatar(avatars.filter(item => item.id !== data.id));
        let dele = await delCategory(data.id)
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const renderHeader1 = () => {
        return (
            <>
                <div className="flex justify-content-between">
                    {/* <div className="float-right">
                        <Link to="/add-avatar" className="btn btn-success p-3">Add Avatar</Link>
                    </div> */}
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined mr-1" onClick={clearFilter1} />
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                    </span>
                </div>
            </>
        )
    }

    const header1 = renderHeader1();
    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Tournaments</h4>
                </div>
            </div>
            <div className="datatable-doc-demo">
                <div className="card">
                    <DataTable paginator showGridlines dataKey="id" filters={filters1} filterDisplay="menu" value={tournaments} rows={10} globalFilterFields={['name', 'noOfPlayers']} header={header1} emptyMessage="No customers found." responsiveLayout="scroll">
                        <Column filterField="name" filter field="name" header="Name" sortable></Column>
                        <Column filterField="noOfPlayers" filter field="noOfPlayers" header="No.Of Players" sortable></Column>
                        <Column filterField="gameCenter" filter field="gameCenter" header="Game Center" sortable></Column>
                        {/* <Column body={actionBodyTemplate} header="Action" style={{ width: '130px' }}></Column> */}
                    </DataTable>
                </div>
            </div>
        </AuthLayout>
    );
};


export default TournamentsView;


