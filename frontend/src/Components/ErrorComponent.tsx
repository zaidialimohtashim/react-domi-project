import { InputText } from "primereact"
import React, { useCallback, useState } from "react"
import { emmiter } from "../lib/emmiter"
export const InputCompontent = (props) => {
    const [error, hasError] = useState(false)
    emmiter.on("validate-from", () => {
        console.log("123123", error, props.value)
        if (!props.value && props.required) {
            hasError(true)
        } else {
            hasError(false)
        }
    })
    const className = useCallback(() => {
        return (props.required ? "required" : "") + " form-control " + (error ? "invalid" : "valid")
    }, [error])


    return (
        <div className="col-md-6 pr-0">
            <span className="">
                <InputText name="name" onChange={props.onChange} className={className()} placeholder="Enter Name" />
            </span>
            {error &&
                <span className="text-danger">This field is required!</span>
            }
        </div>
    )
}