import React, { useState, useEffect, useCallback } from "react"
import { AuthLayout } from "../master";
import { PageComponent } from "../../Components/PageComponent";
export const PrivacyPolicy = () => {
    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Privacy Policy</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PageComponent slug="privacy_policy" />
                </div>
            </div >
        </AuthLayout >
    )
}