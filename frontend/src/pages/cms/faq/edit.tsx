import { InputText } from "primereact";
import React, { useState, useEffect, useCallback } from "react"
import { AuthLayout } from "../../master";
import { Editor } from 'primereact/editor';
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "../../../lib/toast";
import { updateFaq, getFaqById } from "../../../../api/CmsApi";
import { useNavigate, useParams } from "react-router-dom";

export const EditFaq = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [text1, setText1] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [ids, setIds] = useState<string>('');
    const [loaded, setLoaded] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const updateText = (data) => {
        setText1(data)
        setError("");
    }
    useEffect(() => {
        //@ts-ignore
        setIds(params.id)
        getFaqFromId(params.id)

    }, [])
    const getFaqFromId = async (id) => {
        try {
            let faq = await getFaqById(id);
            setValue('question', faq.data.data.question)
            setText1(faq.data.data.answer)
        } catch (error) {

        }
        setLoaded(true)

    }
    const formSubmit = (data) => {
        //@ts-ignore
        if (text1.htmlValue == "" || text1 == "") {
            setError("Content is required")
            return false;
        }

        setError("");
        let request = {
            id: ids,
            question: data.question,
            answer: text1.htmlValue ?? text1,
        };

        updateFaq(request);
        navigate("/faq")
        toast("success", "Updated Successfully")
    }
    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div className="">
                    <h4 className="mb-3 mb-md-0">Update FAQ</h4>
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
                            {loaded && <Editor required placeholder="Write Answer Here...." style={{ height: '320px' }} value={text1} onTextChange={(e) => updateText(e)} />}
                        </div>
                        <span className="text-danger absolute error_message"> {error} </span>
                        <div className="col-md-2">
                            <Button type="submit">Update Faq</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout >
    )
}