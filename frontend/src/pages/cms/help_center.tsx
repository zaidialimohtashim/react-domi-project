import React, { useState, useEffect, useCallback } from "react"
import { PageComponent } from "../../Components/PageComponent";
import { AuthLayout } from "../master";
export const HelpCenter = () => {
    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Help Center</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PageComponent slug="help_center" />
                </div>
            </div>
        </AuthLayout >
    )
}
