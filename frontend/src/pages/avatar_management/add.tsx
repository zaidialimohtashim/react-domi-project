import { clear } from 'console';
import React, { useState, useEffect, useCallback } from 'react';
import { Divider, InputText, Dropdown } from 'primereact';
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
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import { preloaderSlice, setStart } from '../../../redux/preloaderSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../lib/toast';
const AddAvatarCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [textures, setTextures] = useState<any[]>([]);
  const [meshes, setMeshes] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [blends, setBlends] = useState<any[]>([]);
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

  const addTexture = () => {
    setTextures([
      ...textures,
      { url: '', value: '', thumbnailURL: '', id: nanoid() },
    ]);
  };
  const removeTexture = (index: string) => {
    const updatedTexture = textures.filter(item => item.id !== index);
    setTextures(updatedTexture);
    setValue('data.texture', updatedTexture);
  };

  //====== End of Texture ======= //

  //====== Meshes ======= //
  const addMeshes = () => {
    setMeshes([
      ...meshes,
      { url: '', value: '', thumbnailURL: '', id: nanoid() },
    ]);
  };

  const removeMesh = (index: string) => {
    const updatedMesh = meshes.filter(item => item.id !== index);
    setMeshes(updatedMesh);
    setValue('data.mesh', updatedMesh);
  };

  //====== End of Meshes ======= //

  //====== Colors ======= //
  const addColor = () => {
    setColors([
      ...colors,
      { url: '', value: '', thumbnailURL: '', id: nanoid() },
    ]);
  };

  const removeColor = (index: string) => {
    const updatedColor = colors.filter(item => item.id !== index);
    setColors(updatedColor);
    setValue('data.color', updatedColor);
  };

  //====== End of Colors ======= //

  //====== Blends ======= //
  const addBlend = () => {
    setBlends([
      ...blends,
      { url: '', value: '', thumbnailURL: '', id: nanoid() },
    ]);
  };

  const removeBlend = (index: string) => {
    const updatedBlend = blends.filter(item => item.id !== index);
    setBlends(updatedBlend);
    setValue('data.blend', updatedBlend);
  };

  //====== End of Blends ======= //

  const chooseOptions = {
    label: 'Browse',
    icon: 'pi pi-fw pi-upload',
    className: 'removeStye',
  };

  const submitHandler = async data => {
    console.log(data);
    try {
      dispatch(setStart(true));
      await addNewCategory({
        ...data,
        data: {
          texture: !data.data?.texture
            ? []
            : data.data.texture.map(item => ({
                url: typeof item.url == 'undefined' ? '' : item.url,
                value: item.value,
                thumbnailURL:
                  typeof item.thumbnailURL == 'undefined'
                    ? ''
                    : item.thumbnailURL,
              })),
          mesh: !data.data?.mesh
            ? []
            : data.data.mesh.map(item => ({
                url: typeof item.url == 'undefined' ? '' : item.url,
                value: item.value,
                thumbnailURL:
                  typeof item.thumbnailURL == 'undefined'
                    ? ''
                    : item.thumbnailURL,
              })),
          color: !data.data?.color
            ? []
            : data.data.color.map(item => ({
                url: typeof item.url == 'undefined' ? '' : item.url,
                value: item.value,
                thumbnailURL:
                  typeof item.thumbnailURL == 'undefined'
                    ? ''
                    : item.thumbnailURL,
              })),
          blend: !data.data?.blend
            ? []
            : data.data.blend.map(item => ({
                url: typeof item.url == 'undefined' ? '' : item.url,
                value: item.value,
                thumbnailURL:
                  typeof item.thumbnailURL == 'undefined'
                    ? ''
                    : item.thumbnailURL,
              })),
        },
      });
      toast('success', 'Successfully Added');
      navigate('/avatar-management');
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

      if (image && model == 'texture' && key == 'url') {
        setTextures(
          textures.map(item => {
            if (item.id == index) {
              textures[i].url = image.data.data.file ?? '';
            }
            return item;
          })
        );
      }

      if (image && model == 'texture' && key == 'thumbnailURL') {
        setTextures(
          textures.map(item => {
            if (item.id == index) {
              textures[i].thumbnailURL = image.data.data.thumbnail ?? '';
            }
            return item;
          })
        );
      }

      if (image && model == 'mesh' && key == 'url') {
        setMeshes(
          meshes.map(item => {
            if (item.id == index) {
              meshes[i].url = image.data.data.file ?? '';
            }
            return item;
          })
        );
      }

      if (image && model == 'mesh' && key == 'thumbnailURL') {
        setMeshes(
          meshes.map(item => {
            if (item.id == index) {
              meshes[i].thumbnailURL = image.data.data.thumbnail ?? '';
            }
            return item;
          })
        );
      }

      if (image && model == 'color' && key == 'url') {
        setColors(
          colors.map(item => {
            if (item.id == index) {
              colors[i].url = image.data.data.file ?? '';
            }
            return item;
          })
        );
      }

      if (image && model == 'color' && key == 'thumbnailURL') {
        setColors(
          colors.map(item => {
            if (item.id == index) {
              colors[i].thumbnailURL = image.data.data.thumbnail ?? '';
            }
            return item;
          })
        );
      }

      if (image && model == 'blend' && key == 'url') {
        setBlends(
          blends.map(item => {
            if (item.id == index) {
              blends[i].url = image.data.data.file ?? '';
            }
            return item;
          })
        );
      }

      if (image && model == 'blend' && key == 'thumbnailURL') {
        setBlends(
          blends.map(item => {
            if (item.id == index) {
              blends[i].thumbnailURL = image.data.data.thumbnail ?? '';
            }
            return item;
          })
        );
      }

      if (key == 'url') {
        setValue(name, image.data.data.file);
        idKey = name.replace('url', 'id');
      }
      if (key == 'thumbnailURL') {
        setValue(name, image.data.data.thumbnail);
        idKey = name.replace('thumbnailURL', 'id');
      }
      setValue(idKey, nanoid());
    } catch (e) {}

    dispatch(setStart(false));
  };

  return (
    <AuthLayout>
      <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
        <div>
          <h4 className="mb-3 mb-md-0">Add Avatar Category</h4>
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
                      className="form-control"
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
                  Textures{' '}
                  <Button
                    onClick={addTexture}
                    name="shortcode"
                    className="float-right btn btn-sm p-button p-component p-button-rounded p-button-icon-only fa_size"
                  >
                    {' '}
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Button>
                </h4>
                <Divider></Divider>
                <div className="clearFix"></div>
                {textures.map((item, i) => (
                  <div
                    key={item.id}
                    className="textures addRow row col-md-12 mb-2 pr-0 relative"
                  >
                    <div className="col-md-6 pr-0">
                      <label className="pl-1">
                        <strong>Value</strong>
                      </label>
                      <span className="">
                        <InputText
                          {...register(`data.texture.${i}.value`, {
                            required: {
                              value: false,
                              message: 'value is required!',
                            },
                          })}
                          className="form-control"
                          placeholder="Enter Value"
                        />
                      </span>
                      {/* <input type="hidden" {...register(`data.texture.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}
                      <input
                        type="hidden"
                        {...register(`data.texture.${i}.id`, {
                          required: {
                            value: false,
                            message: 'value is required!',
                          },
                        })}
                      />
                      <span className="text-danger absolute error_message">
                        {/*@ts-ignore*/}
                        <> {errors?.data?.texture?.[i]?.value?.message} </>
                      </span>
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-2">
                        <strong>Image</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.texture.${i}.url`, {
                            required: {
                              value: false,
                              message: 'Url is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.texture.${i}.url`,
                              e,
                              item.id,
                              i,
                              'url'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.texture?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-2">
                        <strong>Thumbnail</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.texture.${i}.thumbnailURL`, {
                            required: {
                              value: false,
                              message: 'File is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.texture.${i}.thumbnailURL`,
                              e,
                              item.id,
                              i,
                              'thumbnailURL'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.texture?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeTexture(item.id)}
                        className="link"
                        icon={faTrash}
                      />
                    </div>
                  </div>
                ))}
                <Divider></Divider>
              </div>

              <div className="row">
                <h4 className="ch4 pl-3 pr-3 col-md-12">
                  Meshes{' '}
                  <Button
                    name="shortcode"
                    onClick={addMeshes}
                    className="float-right btn btn-sm p-button p-component p-button-rounded p-button-icon-only fa_size"
                  >
                    {' '}
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Button>
                </h4>
                <Divider></Divider>
                <div className="clearFix"></div>
                {meshes.map((item, i) => (
                  <div
                    key={item.id}
                    className="mashes addRow row col-md-12 mb-2 pr-0"
                  >
                    <div className="col-md-6 pr-0">
                      <label className="pl-1">
                        <strong>Value</strong>
                      </label>
                      <span className="">
                        <InputText
                          {...register(`data.mesh.${i}.value`, {
                            required: {
                              value: false,
                              message: 'value is required!',
                            },
                          })}
                          className="form-control"
                          placeholder="Enter Value"
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.mesh?.[i]?.value?.message}{' '}
                      </span>
                      {/* <input type="hidden" {...register(`data.mesh.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}
                      <input
                        type="hidden"
                        {...register(`data.mesh.${i}.id`, {
                          required: {
                            value: false,
                            message: 'value is required!',
                          },
                        })}
                      />
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-2">
                        <strong>Image</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.mesh.${i}.url`, {
                            required: {
                              value: false,
                              message: 'File is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.mesh.${i}.url`,
                              e,
                              item.id,
                              i,
                              'url'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.mesh?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-1">
                        <strong>Thumbnail</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.mesh.${i}.thumbnailURL`, {
                            required: {
                              value: false,
                              message: 'File is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.mesh.${i}.thumbnailURL`,
                              e,
                              item.id,
                              i,
                              'thumbnailURL'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.mesh?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeMesh(item.id)}
                        className="link"
                        icon={faTrash}
                      />
                    </div>
                  </div>
                ))}
                <Divider></Divider>
              </div>
              <div className="row">
                <h4 className="ch4 pl-3 pr-3 col-md-12">
                  Colors{' '}
                  <Button
                    onClick={addColor}
                    name="shortcode"
                    className="float-right btn btn-sm p-button p-component p-button-rounded p-button-icon-only fa_size"
                  >
                    {' '}
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Button>
                </h4>
                <Divider></Divider>
                <div className="clearFix"></div>
                {colors.map((item, i) => (
                  <div
                    key={item.id}
                    className="colors addRow row col-md-12 mb-2 pr-0"
                  >
                    <div className="col-md-6 pr-0">
                      <label className="pl-1">
                        <strong>Value</strong>
                      </label>
                      <span className="">
                        <InputText
                          {...register(`data.color.${i}.value`, {
                            required: {
                              value: false,
                              message: 'value is required!',
                            },
                          })}
                          className="form-control"
                          placeholder="Enter Value"
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.color?.[i]?.value?.message}{' '}
                      </span>
                      {/* <input type="hidden" {...register(`data.color.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}
                      <input
                        type="hidden"
                        {...register(`data.color.${i}.id`, {
                          required: {
                            value: false,
                            message: 'value is required!',
                          },
                        })}
                      />
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-2">
                        <strong>Image</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.color.${i}.url`, {
                            required: {
                              value: false,
                              message: 'File is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.color.${i}.url`,
                              e,
                              item.id,
                              i,
                              'url'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.color?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-1">
                        <strong>Thumbnail</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.color.${i}.thumbnailURL`, {
                            required: {
                              value: false,
                              message: 'File is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.color.${i}.thumbnailURL`,
                              e,
                              item.id,
                              i,
                              'thumbnailURL'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.color?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeColor(item.id)}
                        className="link"
                        icon={faTrash}
                      />
                    </div>
                  </div>
                ))}

                <Divider></Divider>
              </div>
              <div className="row">
                <h4 className="ch4 pl-3 pr-3 col-md-12">
                  Blends{' '}
                  <Button
                    onClick={addBlend}
                    name="shortcode"
                    className="float-right btn btn-sm p-button p-component p-button-rounded p-button-icon-only fa_size"
                  >
                    {' '}
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Button>
                </h4>
                <Divider></Divider>
                <div className="clearFix"></div>
                {blends.map((item, i) => (
                  <div
                    key={item.id}
                    className="blends addRow row col-md-12 mb-2 pr-0"
                  >
                    <div className="col-md-6 pr-0">
                      <label className="pl-1">
                        <strong>Value</strong>
                      </label>
                      <span className="">
                        <InputText
                          {...register(`data.blend.${i}.value`, {
                            required: {
                              value: false,
                              message: 'value is required!',
                            },
                          })}
                          className="form-control"
                          placeholder="Enter Value"
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.blend?.[i]?.value?.message}{' '}
                      </span>
                      {/* <input type="hidden" {...register(`data.blend.${i}.url`, { required: { value: false, message: "value is required!" }, })} /> */}
                      <input
                        type="hidden"
                        {...register(`data.blend.${i}.id`, {
                          required: {
                            value: false,
                            message: 'value is required!',
                          },
                        })}
                      />
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-2">
                        <strong>Image</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.blend.${i}.url`, {
                            required: {
                              value: false,
                              message: 'File is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.blend.${i}.url`,
                              e,
                              item.id,
                              i,
                              'url'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.blend?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <label className="pl-1">
                        <strong>Thumbnail</strong>
                      </label>
                      <span className="">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.blend.${i}.thumbnailURL`, {
                            required: {
                              value: false,
                              message: 'File is required!',
                            },
                          })}
                          mode="basic"
                          onSelect={e =>
                            handleImage(
                              `data.blend.${i}.thumbnailURL`,
                              e,
                              item.id,
                              i,
                              'thumbnailURL'
                            )
                          }
                          accept=".jpg,.png"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {/*@ts-ignore*/}
                        {errors?.data?.blend?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeBlend(item.id)}
                        className="link"
                        icon={faTrash}
                      />
                    </div>
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
      </div>
    </AuthLayout>
  );
};

export default AddAvatarCategory;
