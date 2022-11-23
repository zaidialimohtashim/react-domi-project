import { Divider, FileUpload, InputText, Dropdown } from 'primereact';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getCategory } from '../../../api/AvatarApi';
import { setStart } from '../../../redux/preloaderSlice';
import { AuthLayout } from '../master';
import { useForm } from 'react-hook-form';
import { nanoid } from '@reduxjs/toolkit';
import { Upload, updateCategory } from '../../../api/AvatarApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { toast } from '../../lib/toast';
const EditAvatarCatory = () => {
  const params = useParams();
  const [ServerError, setServerError] = useState<String>('');
  const chooseOptions = {
    label: 'Browse',
    icon: 'pi pi-fw pi-upload',
    className: 'removeStye',
  };
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    unregister,
  } = useForm();
  const [Categories, setCategories] = useState<Object>({});
  const [textures, setTextures] = useState<any[]>([]);
  const [meshes, setMeshes] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [blends, setBlends] = useState<any[]>([]);
  const [name, setName] = useState<any>('');
  const [shortcode, setShortcode] = useState<any>('');
  const [uid, setUid] = useState<any>(0);
  const [id, setId] = useState<any>(0);
  const [gender, setGender] = useState('');

  const getAllCategories = async () => {
    try {
      dispatch(setStart(true));
      let response = await getCategory(params.id);
      setName(response.data.data.name);
      setUid(response.data.data.uid);
      setId(response.data.data.id);
      setShortcode(response.data.data.shortCode);
      setCategories(response.data.data);
      setTextures(response.data.data.data.texture);
      setMeshes(response.data.data.data.mesh);
      setColors(response.data.data.data.color);
      setBlends(response.data.data.data.blend);
      setGender(response.data.data.gender);

      response.data.data.data.texture.forEach((el, index) => {
        setValue(`data.texture.${index}.value`, el.value);
        setValue(`data.texture.${index}.thumbnailURL`, el.thumbnailURL);
        setValue(`data.texture.${index}.url`, el.url);
        setValue(`data.texture.${index}.id`, nanoid());
      });

      response.data.data.data.mesh.forEach((el, index) => {
        setValue(`data.mesh.${index}.value`, el.value);
        setValue(`data.mesh.${index}.thumbnailURL`, el.thumbnailURL);
        setValue(`data.mesh.${index}.url`, el.url);
        setValue(`data.mesh.${index}.id`, nanoid());
      });

      response.data.data.data.color.forEach((el, index) => {
        setValue(`data.color.${index}.value`, el.value);
        setValue(`data.color.${index}.thumbnailURL`, el.thumbnailURL);
        setValue(`data.color.${index}.url`, el.url);
        setValue(`data.color.${index}.id`, nanoid());
      });

      response.data.data.data.blend.forEach((el, index) => {
        setValue(`data.blend.${index}.value`, el.value);
        setValue(`data.blend.${index}.thumbnailURL`, el.thumbnailURL);
        setValue(`data.blend.${index}.url`, el.url);
        setValue(`data.blend.${index}.id`, nanoid());
      });

      setValue('uid', response.data.data.uid);
      setValue('name', response.data.data.name);
      setValue('shortCode', response.data.data.shortCode);
      setValue('gender', response.data.data.gender);
    } catch (e) {}
    dispatch(setStart(false));
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const addTexture = () => {
    setTextures([
      ...textures,
      { url: '', value: '', thumbnailURL: '', id: nanoid(), itemID: nanoid() },
    ]);
  };

  const removeTexture = (index: string, i: Number) => {
    setTextures(textures.filter(item => item.itemID !== index));
    unregister(`data.texture.${i}.value`);
    unregister(`data.texture.${i}.id`);
    unregister(`data.texture.${i}.url`);
    unregister(`data.texture.${i}.thumbnailURL`);
    delete textures[i];
  };

  //====== End of Texture ======= //

  //====== Meshes ======= //
  const addMeshes = () => {
    setMeshes([
      ...meshes,
      { url: '', value: '', thumbnailURL: '', id: nanoid(), itemID: nanoid() },
    ]);
  };

  const removeMesh = (index: string, i: Number) => {
    setMeshes(meshes.filter(item => item.itemID !== index));
    unregister(`data.mesh.${i}.value`);
    unregister(`data.mesh.${i}.id`);
    unregister(`data.mesh.${i}.url`);
    unregister(`data.mesh.${i}.thumbnailURL`);
    delete meshes[i];
  };

  //====== End of Meshes ======= //

  //====== Colors ======= //
  const addColor = () => {
    setColors([
      ...colors,
      { url: '', value: '', thumbnailURL: '', id: nanoid(), itemID: nanoid() },
    ]);
  };

  const removeColor = (index: string, i: Number) => {
    setColors(colors.filter(item => item.itemID !== index));
    unregister(`data.color.${i}.value`);
    unregister(`data.color.${i}.id`);
    unregister(`data.color.${i}.url`);
    unregister(`data.color.${i}.thumbnailURL`);
    //@ts-ignore
    delete colors[i];
  };

  //====== End of Colors ======= //

  //====== Blends ======= //
  const addBlend = () => {
    setBlends([
      ...blends,
      { url: '', value: '', thumbnailURL: '', id: nanoid(), itemID: nanoid() },
    ]);
  };

  const removeBlend = (index: string, i: Number) => {
    setBlends(blends.filter(item => item.itemID !== index));
    unregister(`data.blend.${i}.value`);
    unregister(`data.blend.${i}.id`);
    unregister(`data.blend.${i}.url`);
    unregister(`data.blend.${i}.thumbnailURL`);
    // delete blends[i];
  };

  //====== End of Blends ======= //

  const submitHandler = async data => {
    console.log(data);
    try {
      dispatch(setStart(true));
      data.id = id;
      await updateCategory({
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
      toast('success', 'Successfully Updated');
    } catch (e) {}
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
          <h4 className="mb-3 mb-md-0">Update Avatar Category</h4>
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
                    {' '}
                    {errors?.uid?.message}{' '}
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
                    {' '}
                    {errors?.name?.message}{' '}
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
                    {' '}
                    {errors?.shortCode?.message}{' '}
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
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.texture?.[i]?.value?.message}{' '}
                      </span>
                      <input
                        type="hidden"
                        {...register(`data.texture.${i}.id`, {
                          required: {
                            value: false,
                            message: 'value is required!',
                          },
                        })}
                      />
                    </div>
                    <div className="col-md-3 pr-0">
                      <span className="float-right">
                        <FileUpload
                          chooseOptions={chooseOptions}
                          {...register(`data.texture.${i}.url`, {
                            required: {
                              value: false,
                              message: 'File is required!',
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.texture?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <span className="float-right">
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.texture?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeTexture(item.itemID, i)}
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
                        {errors?.data?.mesh?.[i]?.value?.message}{' '}
                      </span>
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
                      <span className="float-right">
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.mesh?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <span className="float-right">
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.mesh?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeMesh(item.itemID, i)}
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
                        {errors?.data?.color?.[i]?.value?.message}{' '}
                      </span>
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
                      <span className="float-right">
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.color?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <span className="float-right">
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.color?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeColor(item.itemID, i)}
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
                        {errors?.data?.blend?.[i]?.value?.message}{' '}
                      </span>
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
                      <span className="float-right">
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.blend?.[i]?.url?.message}{' '}
                      </span>
                      {item.url && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.url} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 pr-0">
                      <span className="float-right">
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
                          accept="image/*"
                          maxFileSize={1000000}
                        />
                      </span>
                      <span className="text-danger absolute error_message">
                        {' '}
                        {errors?.data?.blend?.[i]?.thumbnailURL?.message}{' '}
                      </span>
                      {item.thumbnailURL && (
                        <div className="col-md-12 clearFix">
                          <div className="image_thumbnail">
                            <img src={item.thumbnailURL} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="trash_box">
                      <FontAwesomeIcon
                        onClick={() => removeBlend(item.itemID, i)}
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
                  <Button type="submit">Update</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EditAvatarCatory;
