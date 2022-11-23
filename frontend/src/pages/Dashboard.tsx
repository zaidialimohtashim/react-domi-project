import { Fragment, useState } from "react";
import { Chart } from 'primereact/chart';
import Footer from "./partials/footer";
import Header from "./partials/header";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
const Dashboard = () => {
    const options = {
        chart: {
            type: "line",
            height: 60,
            sparkline: {
                enabled: !0
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2,
            curve: "smooth"
        },
        markers: {
            size: 0
        },
        colors: ["#727cf5"],
        tooltip: {
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    };

    const series = [{
        data: [3844, 3855, 3841, 3867, 3822, 3843, 3821, 3841, 3856, 3827, 3843]
    }];

    var options2 = {
        chart: {
            type: "bar",
            height: 60,
            sparkline: {
                enabled: !0
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "60%"
            }
        },
        colors: ["#727cf5"],
        series: [{
            data: [36, 77, 52, 90, 74, 35, 55, 23, 47, 10, 63]
        }],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
            crosshairs: {
                width: 1
            }
        },
        tooltip: {
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    };

    var options3 = {
        chart: {
            type: "line",
            height: 60,
            sparkline: {
                enabled: !0
            }
        },
        series: [{
            data: [41, 45, 44, 46, 52, 54, 43, 74, 82, 82, 89]
        }],
        stroke: {
            width: 2,
            curve: "smooth"
        },
        markers: {
            size: 0
        },
        colors: ["#727cf5"],
        tooltip: {
            fixed: {
                enabled: !1
            },
            x: {
                show: !1
            },
            y: {
                title: {
                    formatter: function (e) {
                        return ""
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    };


    return (
        <Fragment>
            <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
                <div>
                    <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-xl-12 stretch-card">
                    <div className="row flex-grow">
                        <div className="col-md-4 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <h6 className="card-title mb-0">New Customers</h6>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-12 col-xl-5">
                                            <h3 className="mb-2">3,897</h3>
                                            <div className="d-flex align-items-baseline">
                                                <p className="text-success">
                                                    <span>+3.3%</span>
                                                    <i data-feather="arrow-up" className="icon-sm mb-1"></i>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-12 col-xl-7">
                                            <ReactApexChart
                                                type="line"
                                                options={options}
                                                series={series}
                                                height={60}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <h6 className="card-title mb-0">New Orders</h6>
                                        <div className="dropdown mb-2">
                                            <button className="btn p-0" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="eye" className="icon-sm mr-2"></i> <span className="">View</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="edit-2" className="icon-sm mr-2"></i> <span className="">Edit</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="trash" className="icon-sm mr-2"></i> <span className="">Delete</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="printer" className="icon-sm mr-2"></i> <span className="">Print</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="download" className="icon-sm mr-2"></i> <span className="">Download</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-12 col-xl-5">
                                            <h3 className="mb-2">35,084</h3>
                                            <div className="d-flex align-items-baseline">
                                                <p className="text-danger">
                                                    <span>-2.8%</span>
                                                    <i data-feather="arrow-down" className="icon-sm mb-1"></i>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-12 col-xl-7">
                                            <ReactApexChart
                                                type="bar"
                                                options={options2}
                                                series={options2.series}
                                                height={60}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-baseline">
                                        <h6 className="card-title mb-0">Growth</h6>
                                        <div className="dropdown mb-2">
                                            <button className="btn p-0" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton2">
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="eye" className="icon-sm mr-2"></i> <span className="">View</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="edit-2" className="icon-sm mr-2"></i> <span className="">Edit</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="trash" className="icon-sm mr-2"></i> <span className="">Delete</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="printer" className="icon-sm mr-2"></i> <span className="">Print</span></a>
                                                <a className="dropdown-item d-flex align-items-center" href="#"><i data-feather="download" className="icon-sm mr-2"></i> <span className="">Download</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-md-12 col-xl-5">
                                            <h3 className="mb-2">89.87%</h3>
                                            <div className="d-flex align-items-baseline">
                                                <p className="text-success">
                                                    <span>+2.8%</span>
                                                    <i data-feather="arrow-up" className="icon-sm mb-1"></i>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-12 col-xl-7">
                                            <ReactApexChart
                                                type="line"
                                                options={options3}
                                                series={options3.series}
                                                height={60}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment> 
    )
}

export default Dashboard;