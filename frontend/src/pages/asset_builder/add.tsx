import { clear } from 'console';
import React, { useState, useEffect, useCallback } from 'react';
import { Divider, InputText, Dropdown, InputNumber } from 'primereact';
import { Button, Image } from 'react-bootstrap';
import { FileUpload } from 'primereact/fileupload';
import { AuthLayout } from '../master';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { store } from '../../../redux/store';
import { nanoid } from '@reduxjs/toolkit';
import mitt from 'mitt';
import { InputCompontent } from '../../Components/ErrorComponent';
import { emmiter } from '../../lib/emmiter';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import fs from 'fs';
import formData from 'form-data';
import { Upload, addNewCategory } from '../../../api/AvatarApi';
import { addAsset } from '../../../api/AssetApi';
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import { preloaderSlice, setStart } from '../../../redux/preloaderSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../lib/toast';
const AddAssets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [gender, setGender] = useState('');
    const [classtype, setClassType] = useState('');
    const [items, setItems] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);
    const [err, setErr] = useState<any[]>([{ index: '', key: '', error: '' }]);
    const [ServerError, setServerError] = useState<String>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        getFieldState,
    } = useForm();
    const [url, setUrl] = useState<any[]>([{ key: '', url: '' }]);
    const [thumbnail, setThumbnail] = useState<any[]>([
        { key: '', thumbnail: '' },
    ]);
    //====== Texture ======= //

    const addItem = () => {
        setItems([
            ...items,
            { itemName: '', itemType: '', itemIcon: '', itemTexUrls: [], itemDesc: '', itemPrice: {}, itemClass: '', id: nanoid() },
        ]);
    };

    const changeChain = (data, e) => {
        setValue(data, e);
    }

    const changePrice = (data, e) => {
        setValue(data, e);
    }
    const changeUsdt = (data, e) => {
        setValue(data, e);
    }

    const addImages = (item) => {
        setItems(items.map((it, i) => {
            if (it.id == item.id) {
                it.itemTexUrls.push({ texId: "", texUrl: "", iconUrl: "" })
            }
            return it;
        }))

    }

    const removeItem = (index: string) => {
        const updateItem = items.filter(item => item.id !== index);
        setItems(updateItem);
        setValue('data.item', updateItem);
    };

    //====== End of Blends ======= //

    const chooseOptions = {
        label: 'Browse',
        icon: 'pi pi-fw pi-upload',
        className: 'removeStye',
    };

    const submitHandler = async data => {
        console.log(data)
        try {
            dispatch(setStart(true));
            let result = {
                ...data,
                data: {
                    item: !data.data?.item
                        ? []
                        : data.data.item.itemTexUrls.map(item => ({
                            texId: nanoid(),
                            texUrl: typeof item.texUrl == 'undefined' ? '' : item.texUrl,
                            iconUrl:
                                typeof item.iconUrl == 'undefined'
                                    ? ''
                                    : item.iconUrl,
                        })),
                },
            };



            // await addAsset({
            //     ...data,
            //     data: {
            //         item: !data.data?.item
            //             ? []
            //             : data.data.item.map(item => ({
            //                 url: typeof item.url == 'undefined' ? '' : item.url,
            //                 value: item.value,
            //                 thumbnailURL:
            //                     typeof item.thumbnailURL == 'undefined'
            //                         ? ''
            //                         : item.thumbnailURL,
            //             })),
            //     },
            // });
            // toast('success', 'Successfully Added');
            // navigate('/avatar-management');
        } catch (e) {
            console.log(e);
            toast('error', 'Somthing Went Wrong');
        }

        dispatch(setStart(false));
    };

    const handleImage = async (name, value, index, i, key) => {
        try {
            dispatch(setStart(true));
            let formData = new FormData();
            formData.append('file', value.files[0]);
            let image = await Upload(formData);
            let idKey = '';
            let model = name.split('.')[1];

            if (image && model == 'item' && key == 'texUrl') {
                setItems(
                    items.map(item => {
                        if (item.id == index) {
                            items[i].url = image.data.data.file ?? '';
                        }
                        return item;
                    })
                );
            }

            if (image && model == 'item' && key == 'itemIcon') {
                setItems(
                    items.map(item => {
                        if (item.id == index) {
                            items[i].itemIcon = image.data.data.thumbnail ?? '';
                        }
                        return item;
                    })
                );
            }


            if (image && model == 'item' && key == 'iconUrl') {
                setItems(
                    items.map(item => {
                        if (item.id == index) {
                            items[i].url = image.data.data.thumbnail ?? '';
                        }
                        return item;
                    })
                );
            }


            if (key == 'iconUrl') {
                setValue(name, image.data.data.file);
                idKey = name.replace('iconUrl', 'id');
            }
            if (key == 'texUrl') {
                setValue(name, image.data.data.file);
                idKey = name.replace('texUrl', 'id');
            }
            if (key == 'itemIcon') {
                setValue(name, image.data.data.file);
                idKey = name.replace('itemIcon', 'id');
            }

            setValue(idKey, nanoid());
        } catch (e) { }

        dispatch(setStart(false));
    };

    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Add Assets</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {ServerError != '' ? (
                        <div className="alert alert-danger"> {ServerError}</div>
                    ) : (
                        ''
                    )}
                    <div className="card p-4">
                        <form
                            className="p-fluid"
                            method="post"
                            id="category_form"
                            onSubmit={handleSubmit(submitHandler)}
                        >
                            <div className="row">
                                <div className="col-md-3 pr-0">
                                    <span className="">
                                        <InputText
                                            {...register(`uid`, {
                                                required: { value: true, message: 'id is required!' },
                                            })}
                                            className="form-control"
                                            placeholder="Enter Unique id"
                                        />
                                    </span>
                                    <span className="text-danger absolute error_message">
                                        <> {errors?.uid?.message} </>
                                    </span>
                                </div>

                                <div className="col-md-3 pr-0">
                                    <span className="">
                                        <InputText
                                            {...register(`name`, {
                                                required: { value: true, message: 'Name is required!' },
                                            })}
                                            className="form-control"
                                            placeholder="Enter Name"
                                        />
                                    </span>
                                    <span className="text-danger absolute error_message">
                                        <> {errors?.name?.message} </>
                                    </span>
                                </div>

                                <div className="col-md-3">
                                    <span className="">
                                        <InputText
                                            {...register(`shortCode`, {
                                                required: {
                                                    value: true,
                                                    message: 'Shortcode is required!',
                                                },
                                            })}
                                            placeholder="Enter Shortcode"
                                            className="form-control"
                                        />
                                    </span>
                                    <span className="text-danger absolute error_message">
                                        <>{errors?.shortCode?.message} </>
                                    </span>
                                </div>
                                <div className="col-md-3">
                                    <span className="">
                                        <Dropdown
                                            {...register(`gender`, {
                                                required: {
                                                    value: true,
                                                    message: 'Gender is required!',
                                                },
                                            })}
                                            options={[
                                                { label: 'male', value: 'male' },
                                                { label: 'female', value: 'female' },
                                            ]}
                                            value={gender}
                                            onChange={e => setGender(e.value)}
                                            placeholder="Enter Gender"
                                        />
                                    </span>
                                    <span className="text-danger absolute error_message">
                                        <>{errors?.gender?.message} </>
                                    </span>
                                </div>
                                <Divider></Divider>
                            </div>
                            <div className="row">
                                <h4 className="ch4 pl-3 pr-3 col-md-12">
                                    Asset Attributes{' '}
                                    <Button
                                        onClick={addItem}
                                        name="shortcode"
                                        className="float-right btn btn-sm p-button p-component p-button-rounded p-button-icon-only fa_size"
                                    >
                                        {' '}
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </Button>
                                </h4>
                                <Divider></Divider>
                                <div className="clearFix"></div>
                                {items.map((item, i) => (
                                    <div
                                        key={item.id}
                                        className="textures itemBox addRow  col-md-12 mb-2 pr-0 relative">
                                        <div className="row">
                                            <input
                                                type="hidden"
                                                {...register(`data.item.${i}.id`, {
                                                    required: {
                                                        value: false,
                                                        message: 'id is required!',
                                                    },
                                                })}
                                            />
                                            <div className="col-md-4 pr-0">
                                                <label className="pl-1">
                                                    <strong>Item Name</strong>
                                                </label>
                                                <span className="">
                                                    <InputText
                                                        {...register(`data.item.${i}.itemName`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Item Name is required!',
                                                            },
                                                        })}
                                                        placeholder="Enter Item Name"
                                                    />
                                                </span>
                                                <span className="text-danger absolute error_message">
                                                    {/*@ts-ignore*/}
                                                    <> {errors?.data?.item?.[i]?.itemName?.message} </>
                                                </span>
                                            </div>
                                            <div className="col-md-4 pr-0">
                                                <label className="pl-1">
                                                    <strong>Item Type</strong>
                                                </label>
                                                <span className="">
                                                    <InputText
                                                        {...register(`data.item.${i}.itemType`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Item Type is required!',
                                                            },
                                                        })}
                                                        placeholder="Enter Item Type"
                                                    />
                                                </span>
                                                {/* <input type="hidden" {...register(`data.texture.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}

                                                <span className="text-danger absolute error_message">
                                                    {/*@ts-ignore*/}
                                                    <> {errors?.data?.item?.[i]?.itemType?.message} </>
                                                </span>
                                            </div>
                                            <div className="col-md-2 pr-0">
                                                <label className="pl-1">
                                                    <strong>Item Class</strong>
                                                </label>
                                                <span className="">
                                                    <Dropdown
                                                        {...register(`data.item.${i}.itemClass`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Class is required!',
                                                            },
                                                        })}
                                                        options={[
                                                            { label: 'A', value: 'A' },
                                                            { label: 'B', value: 'B' },
                                                            { label: 'C', value: 'C' },
                                                        ]}
                                                        value={classtype}
                                                        onChange={e => setClassType(e.value)}
                                                        placeholder="Enter Class"
                                                    />

                                                </span>
                                                {/* <input type="hidden" {...register(`data.texture.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}

                                                <span className="text-danger absolute error_message">
                                                    {/*@ts-ignore*/}
                                                    <> {errors?.data?.item?.[i]?.itemClass?.message} </>
                                                </span>
                                            </div>
                                            <div className="col-md-2 pr-0">
                                                <label className="pl-2">
                                                    <strong>Image</strong>
                                                </label>
                                                <span className="">
                                                    <FileUpload
                                                        chooseOptions={chooseOptions}
                                                        {...register(`data.item.${i}.itemIcon`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Icon is required!',
                                                            },
                                                        })}
                                                        mode="basic"
                                                        onSelect={e =>
                                                            handleImage(
                                                                `data.item.${i}.itemIcon`,
                                                                e,
                                                                item.id,
                                                                i,
                                                                'itemIcon'
                                                            )
                                                        }
                                                        accept=".jpg,.png"
                                                        maxFileSize={1000000}
                                                    />
                                                </span>
                                                <span className="text-danger absolute error_message">
                                                    {' '}
                                                    {/*@ts-ignore*/}
                                                    {errors?.data?.item?.[i]?.itemIcon?.message}{' '}
                                                </span>
                                                {item.itemIcon && (
                                                    <div className="">
                                                        <div className="image_thumbnail">
                                                            <img src={item.itemIcon} />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="trash_box">
                                                    <FontAwesomeIcon
                                                        onClick={() => removeItem(item.id)}
                                                        className="link"
                                                        icon={faTrash}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-5 pr-0 mt-2">
                                                <label className="pl-1">
                                                    <strong>Item Description</strong>
                                                </label>
                                                <span className="">
                                                    <InputText
                                                        {...register(`data.item.${i}.itemDesc`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Description Name is required!',
                                                            },
                                                        })}
                                                        placeholder="Enter Description"
                                                    />
                                                </span>
                                                {/* <input type="hidden" {...register(`data.texture.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}

                                                <span className="text-danger absolute error_message">
                                                    {/*@ts-ignore*/}
                                                    <> {errors?.data?.item?.[i]?.itemDesc?.message} </>
                                                </span>
                                            </div>

                                            <div className="col-md-2 pr-0 mt-2">
                                                <label className="pl-1">
                                                    <strong>Chain</strong>
                                                </label>
                                                <span className="">
                                                    <InputText
                                                        {...register(`data.item.${i}.chain`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Chain is required!',
                                                            },
                                                        })}
                                                        placeholder="Enter Chain"
                                                        onChange={(e) => changeChain(`data.item.${i}.chain`, e.target.value)}
                                                    />
                                                </span>
                                                {/* <input type="hidden" {...register(`data.texture.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}

                                                <span className="text-danger absolute error_message">
                                                    {/*@ts-ignore*/}
                                                    <> {errors?.data?.item?.[i]?.chain?.message} </>
                                                </span>
                                            </div>
                                            <div className="col-md-2 pr-0 mt-2">
                                                <label className="pl-1">
                                                    <strong>Chain Price</strong>
                                                </label>
                                                <span className="">
                                                    <InputNumber
                                                        {...register(`data.item.${i}.chainPrice`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Chain Price is required!',
                                                            },
                                                        })}
                                                        onChange={(e) => changePrice(`data.item.${i}.chainPrice`, e.value)}
                                                        placeholder="Enter Chain Price"
                                                    />
                                                </span>
                                                <span className="text-danger absolute error_message">
                                                    {/*@ts-ignore*/}
                                                    <> {errors?.data?.item?.[i]?.chainPrice?.message} </>
                                                </span>
                                            </div>
                                            <div className="col-md-3 pr-5 mt-2">
                                                <label className="pl-1">
                                                    <strong>Price (USDT)</strong>
                                                </label>
                                                <span className="">
                                                    <InputNumber
                                                        {...register(`data.item.${i}.usdt`, {
                                                            required: {
                                                                value: true,
                                                                message: 'USDT Price is required!',
                                                            },
                                                        })}
                                                        min={0}
                                                        onChange={(e) => changeUsdt(`data.item.${i}.usdt`, e.value)}
                                                        placeholder="Enter USDT Price"
                                                    />
                                                </span>
                                                <span className="text-danger absolute error_message">
                                                    {/*@ts-ignore*/}
                                                    <> {errors?.data?.item?.[i]?.usdt?.message} </>
                                                </span>
                                            </div>
                                        </div>
                                        <h5 className='mt-3'>Item Images <Button onClick={() => addImages(item)}> <FontAwesomeIcon icon={faPlusCircle} /></Button></h5>
                                        {item?.itemTexUrls.map((img, z) => (<div className="row mt-2">
                                            <div className="col-md-2">
                                                <label className="pl-1">
                                                    <strong>Image</strong>
                                                </label>
                                                <span className="">
                                                    <FileUpload
                                                        chooseOptions={chooseOptions}
                                                        {...register(`data.item.${i}.itemTexUrls.${z}.texUrl`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Image is required!',
                                                            },
                                                        })}
                                                        mode="basic"
                                                        onSelect={e =>
                                                            handleImage(
                                                                `data.item.${i}.itemTexUrls.${z}.texUrl`,
                                                                e,
                                                                img.id,
                                                                i,
                                                                'texUrl'
                                                            )
                                                        }
                                                        accept=".jpg,.png"
                                                        maxFileSize={1000000}
                                                    />
                                                </span>
                                                <span className="text-danger absolute error_message">
                                                    {errors?.data?.item?.[i].itemTexUrls?.[z]?.texUrl?.message}
                                                </span>
                                            </div>
                                            <div className="col-md-2">
                                                <label className="pl-1">
                                                    <strong>Image Thumbnail</strong>
                                                </label>
                                                <span className="">
                                                    <FileUpload
                                                        chooseOptions={chooseOptions}
                                                        {...register(`data.item.${i}.itemTexUrls.${z}.iconUrl`, {
                                                            required: {
                                                                value: true,
                                                                message: 'Icon is required!',
                                                            },
                                                        })}
                                                        mode="basic"
                                                        onSelect={e =>
                                                            handleImage(
                                                                `data.item.${i}.itemTexUrls.${z}.iconUrl`,
                                                                e,
                                                                img.id,
                                                                i,
                                                                'iconUrl'
                                                            )
                                                        }
                                                        accept=".jpg,.png"
                                                        maxFileSize={1000000}
                                                    />
                                                </span>
                                                <span className="text-danger absolute error_message">{errors?.data?.item?.[i].itemTexUrls?.[z]?.iconUrl?.message} </span>
                                            </div>
                                        </div>))}
                                    </div>
                                ))}
                            </div>
                            <div className="clearFix"></div>
                            <div className="row">
                                <div className="col-md-12 mt-5">
                                    <Button type="submit">Save</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </AuthLayout >
    );
};

export default AddAssets;
