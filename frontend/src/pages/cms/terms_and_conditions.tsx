import React, { useState, useEffect, useCallback } from "react"
import { PageComponent } from "../../Components/PageComponent";
import { AuthLayout } from "../master";
export const TermsConditions = () => {
    return (
        <AuthLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Terms and Condition</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PageComponent slug="term_and_condition" />
                </div>
            </div>
        </AuthLayout >
    )
}

