import { InputText } from "primereact";
import React, { useState, useEffect, useCallback } from "react"
import { AuthLayout } from "../../master";
import { Editor } from 'primereact/editor';
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "../../../lib/toast";
import { addFaq } from "../../../../api/CmsApi";
import { useNavigate } from "react-router-dom";
export const AddFaq = () => {
    const navigate = useNavigate();
    const [text1, setText1] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loaded, setLoaded] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const updateText = (data) => {
        setText1(data)
        setError("");
    }
    const formSubmit = (data) => {
        //@ts-ignore
        if (text1.htmlValue == "" || text1 == "") {
            setError("Content is required")
            return false;
        }

        setError("");
        let request = {
            question: data.question,
            answer: text1.htmlValue,
        };

        addFaq(request);
        navigate("/faq")
        toast("success", "Added Successfully")
    }
    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Add FAQ</h4>
                </div>
            </div>
            <div className="card p-3">
                <div className="row">
                    <form className="col-md-12" method="post" onSubmit={handleSubmit(formSubmit)} >
                        <div className="col-md-12 mb-3">
                            <InputText {...register('question', { required: { value: true, message: 'Question is required' } })} placeholder="Enter Question" className="col-md-12" />
                            <span className="text-danger"> {errors?.question?.message}</span>
                        </div>
                        <div className="col-md-12 mb-3">
                            <Editor required placeholder="Write Answer Here...." style={{ height: '320px' }} value={text1} onTextChange={(e) => updateText(e)} />
                        </div>
                        <span className="text-danger absolute error_message"> {error} </span>
                        <div className="col-md-2">
                            <Button type="submit">Save Faq</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout >
    )
}