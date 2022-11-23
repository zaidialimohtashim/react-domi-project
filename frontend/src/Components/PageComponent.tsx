import React, { useState, useEffect, useCallback } from "react"
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { CmsPage, GetPage } from "../../api/CmsApi"
import { toast } from "../lib/toast";
export const PageComponent = (props) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [text1, setText1] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loaded, setLoaded] = useState(false);

    const getPage = async () => {
        try {
            let page = await GetPage(props.slug)
            setText1(page.data.data.content);
        } catch (error) {

        }
        setLoaded(true)
    }

    useEffect(() => {
        getPage()
    }, [])
    const formSubmit = (data) => {
        if (data.htmlValue == "" || data == "") {
            setError("Content is required")
            return false;
        }

        setError("");
        let request = {
            title: 'Term and Conditions',
            slug: props.slug,
            content: data.htmlValue,
        };
        CmsPage(request);
        toast("success", "Successfully Updated")
    }
    const updateText = (data) => {
        setText1(data)
        setError("");
    }
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    }
    const header = renderHeader();
    return (
        <form onSubmit={handleSubmit((e) => formSubmit(text1))}>
            <div className="card p-4">
                <div className="col-md-12">
                    {loaded && <Editor style={{ height: '320px' }} value={text1} onTextChange={(e) => updateText(e)} />}
                </div>
                <div className="col-md-12">
                    <span className="text-danger absolute error_message"> {error} </span>
                </div>
                <Button type="submit" className="col-md-2 m-3 p-3">Update</Button>
            </div>

        </form>
    )
}