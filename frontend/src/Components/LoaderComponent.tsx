import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
export const LoaderComponent = (props: any) => {
    const isLoading = useSelector(state => state.preloader.start)
    return (
        isLoading && <div className="loading"></div>
    )
}