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
import { useDispatch } from "react-redux";
import { setStart } from "../../../redux/preloaderSlice";
import { assetList } from "../../../api/AssetApi";
const AssetsManagementView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [assets, setAssets] = useState<any[]>([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState<any>(null);

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        console.log(_filters1)
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const getAssetData = useCallback(async () => {
        try {
            dispatch(setStart(true));
            const Assets = await assetList();
            setAssets(Assets.data.data);
            initFilters1();
        } catch (e) {

        }

        dispatch(setStart(false));

    }, []);

    useEffect(() => {
        getAssetData();
    }, [getAssetData]);

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH, operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue1('');
    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <Fragment>
                {/* <Button icon="pi pi-eye" className="p-button-rounded p-button-success mr-2" onClick={() => ViewCategory(rowData)} /> */}
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => EditCategory(rowData)} />
            </Fragment>
        );
    }

    const EditCategory = (data) => {
        navigate("/edit-asset-builder/" + data.id)
    }

    const imageBodyTemplate = (rowData) => {
        return <div className="thumbnail_image"><img src={rowData.images.url} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" /></div>;
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const renderHeader1 = () => {
        return (
            <>
                <div className="flex justify-content-between">
                    <div className="float-right">
                        <Link to="/asset-builder" className="btn btn-success p-3">Add Assets</Link>
                    </div>
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
                    <h4 className="mb-3 mb-md-0">Assets Management</h4>
                </div>
            </div>
            <div className="datatable-doc-demo">
                <div className="card">
                    <DataTable paginator showGridlines dataKey="id" filters={filters1} filterDisplay="menu" value={assets} rows={10} globalFilterFields={['title']} header={header1} emptyMessage="No customers found." responsiveLayout="scroll">
                        <Column filterField="title" filter field="title" header="Title" sortable></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        {/* <Column filterField="shortCode" filter field="shortCode" header="Short Code" sortable></Column> */}
                        <Column body={actionBodyTemplate} header="Action" style={{ width: '100px' }}></Column>
                    </DataTable>
                </div>
            </div>
        </AuthLayout>
    );
};


export default AssetsManagementView;


