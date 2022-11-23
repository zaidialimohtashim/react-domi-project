import React, { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { getCategory } from "../../../api/AvatarApi";
import { setStart } from "../../../redux/preloaderSlice";
import { AuthLayout } from "../master";
const ViewAvatarCatory = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [Categories, setCategories] = useState<Object>({})
    const getAllCategories = async () => {
        try {
            dispatch(setStart(true));
            let response = await getCategory(params.id);
            setCategories(response.data.data);
        } catch (e) { }
        dispatch(setStart(false));
    }
    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <AuthLayout>
            <div className="flex justify-content-between">
                <div >
                    <h4 className="mb-3 mb-md-0">View Category</h4>
                </div>
            </div>
            <div className="card">
                <div className="card-body">

                </div>
            </div>
        </AuthLayout>
    )
}

export default ViewAvatarCatory;