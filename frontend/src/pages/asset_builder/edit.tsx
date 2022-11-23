import React, { useState, useRef, useCallback, useEffect } from "react";
import { AuthLayout } from "../master";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Divider, InputText } from "primereact";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { preloaderSlice, setStart } from "../../../redux/preloaderSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Upload, addNewCategory } from "../../../api/AvatarApi";
import { editAssets, getAssets } from "../../../api/AssetApi";
import { useParams } from "react-router-dom";
import { toast } from "../../lib/toast";
export const EditAssetbuilder = () => {
    const dispatch = useDispatch()
    const [asset, setAsset] = useState<any>({});
    const param = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const getAssetData = useCallback(async () => {
        //@ts-ignore
        let assets = await getAssets(param.id);
        setValue('title', assets.data.data.title)
        setValue('images.thumbnailURL', assets.data.data.images.thumbnailURL)
        setValue('images.url', assets.data.data.images.url)
        //thumbnailURL
    }, []);

    useEffect(() => {
        getAssetData()
    }, [getAssetData]);



    const chooseOptions = { label: "Browse", icon: "pi pi-fw pi-upload", className: "removeStye" };

    const submitHandler = async (data) => {

        try {
            dispatch(setStart(true))
            data.id = param.id
            await editAssets(data);
            toast("success", "Successfully Updated")
        } catch (e) {
            toast("error", "Somthing Went Wrong")
        }
        dispatch(setStart(false))
    };


    const handleImage = async (name, value) => {
        try {
            dispatch(setStart(true))
            let formData = new FormData();
            formData.append("file", value.files[0]);
            let image = await Upload(formData)
            setValue(name, image.data.data.file)
            setValue(name.replace("thumbnailURL", "url"), image.data.data.thumbnail)
        } catch (e) { }

        dispatch(setStart(false))
    };

    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h2 className="mb-3 mb-md-0">Edit Asset Builder</h2>
                </div>
            </div>
            <form className="" method="post" id="category_form" onSubmit={handleSubmit(submitHandler)}>
                <h4>Asset Title</h4>
                <div className="row">
                    <div className="col-md-4 pr-0 mb-3">
                        <span className="">
                            <InputText {...register(`title`, { required: { value: true, message: "Asset title is required!" } })} className="form-control" placeholder="Enter Asset title" />
                        </span>
                        <span className="text-danger absolute error_message"> {errors?.title?.message} </span>
                    </div>
                </div>
                <FileUpload
                    chooseOptions={chooseOptions}
                    {...register(`images.thumbnailURL`, { required: { value: true, message: "File is required!" }, })}
                    mode="basic"
                    onSelect={(e) => handleImage(`images.thumbnailURL`, e)}
                    accept=".jpg.,.png"
                    maxFileSize={1000000}
                />
                <input type="hidden" {...register(`images.thumbnailURL`, { required: { value: true, message: "thumbnailURL is required!" }, })} />
                <input type="hidden" {...register(`images.url`, { required: { value: true, message: "Url is required!" }, })} />
                <span className="text-danger absolute error_message"> {errors?.images?.message} </span>
                <div className="clearFix"></div>
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};

export default EditAssetbuilder;
