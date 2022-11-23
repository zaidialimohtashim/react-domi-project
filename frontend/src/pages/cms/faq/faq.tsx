import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../partials/footer";
import Header from "../../partials/header";
import Sidebar from "../../partials/sidebar";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Column } from "primereact/column";
// import "./DataTableDemo.css";
import { AuthLayout } from "../../master";
import { useDispatch } from "react-redux";
import { setStart } from "../../../../redux/preloaderSlice";
import { getFaq, deleteFaq } from "../../../../api/CmsApi";
export const Faq = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [faq, setFaq] = useState<any[]>([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState<any>(null);

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        console.log(_filters1)
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const getText = (html) => {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;

        return tmp.textContent || tmp.innerText;
    };

    const getFaqs = useCallback(async () => {
        try {
            dispatch(setStart(true));
            const faqs = await getFaq();
            let faq = faqs.data.data.map((items) => {
                items.answer = getText(items.answer)
                return items
            })
            setFaq(faq);
            initFilters1();
        } catch (e) {

        }

        dispatch(setStart(false));

    }, []);

    useEffect(() => {
        getFaqs();
    }, [getFaqs]);

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'question': { value: null, matchMode: FilterMatchMode.STARTS_WITH, operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'answer': { value: null, matchMode: FilterMatchMode.STARTS_WITH, operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue1('');
    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => EditFaq(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-success mr-2" onClick={() => DeleteFaq(rowData)} />
            </Fragment>
        );
    }

    const EditFaq = (data) => {
        navigate("/edit-faq/" + data.id)
    }

    const DeleteFaq = async (data) => {
        setFaq(faq.filter(item => item.id !== data.id));
        let dele = await deleteFaq(data.id)
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const renderHeader1 = () => {
        return (
            <>
                <div className="flex justify-content-between">
                    <div className="float-right">
                        <Link to="/add-faq" className="btn btn-success p-3">Add Faq</Link>
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
                    <h4 className="mb-3 mb-md-0">FAQ</h4>
                </div>
            </div>
            <div className="datatable-doc-demo">
                <div className="card">
                    <DataTable paginator showGridlines dataKey="id" filters={filters1} filterDisplay="menu" value={faq} rows={10} globalFilterFields={['question', 'answer']} header={header1} emptyMessage="No Faq found." responsiveLayout="scroll">
                        <Column filterField="question" filter field="question" header="Question" sortable></Column>
                        <Column filterField="answer" filter field="answer" header="Answer" sortable></Column>
                        <Column body={actionBodyTemplate} header="Action" style={{ width: '130px' }}></Column>
                    </DataTable>
                </div>
            </div>
        </AuthLayout>
    );
};