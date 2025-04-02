import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

import roadmapsBanner from "../assets/roadmaps-banner.jpeg"
import hpcLogo from "../assets/integration_icon_compute.png"
import storageLogo from "../assets/integration_icon_storage.png"
import cloudLogo from "../assets/integration_icon_cloud.png"
import gatewaysLogo from "../assets/integration_icon_science_gateways.png"

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function NewResource() {
    const {resources} = useResources();
    const [updatedResources, setUpdatedResources] = useState(null);
    const [displayedResources, setDisplayedResources] = useState(null);

    // sort resources by organization name and group them by organization
    useEffect(() => {
        const sortedData = resources.sort((a, b) =>
            a.organization_name.localeCompare(b.organization_name));
        const groupedData = groupByOrganization(sortedData);

        setUpdatedResources(groupedData);
        setDisplayedResources(groupedData);
    }, [resources]);

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });

        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
        dropdownElementList.map(function (dropdownToggleEl) {
            return new bootstrap.Dropdown(dropdownToggleEl)
        })
    }, []);

    // group resources by organization name
    const groupByOrganization = (resources) => {
        const groups = {};
        resources.forEach(resource => {
            const {organization_name} = resource;
            if (!groups[organization_name]) {
                groups[organization_name] = {
                    organization_name,
                    resources: []
                };
            }
            groups[organization_name].resources.push(resource);
        });

        return Object.values(groups);
    }

    return (
        <div className="row">
            <div className="row">
                <div className="col-sm-8">
                    <h1 style={{fontWeight: '500'}}>Welcome to the ACCESS Integration Roadmaps </h1>
                    <p><small>Discover how to integrate your infrastructure into the ACCESS environment.</small></p>
                    <p>
                        <strong>Select</strong> the roadmap that best aligns with your operational goals under the
                        infrastructure class you wish to integrate. Let’s help you achieve the ACCESS allocated status
                        and beyond.
                    </p>
                </div>
                <div className="col-sm-4">
                    <img src={roadmapsBanner} className="w-100"/>
                </div>
            </div>
            <div className="row row-cols-2">
                <div className="col p-3">
                    <div className="infrastructure-type-card p-3 w-100 h-100">
                        <img src={hpcLogo}/>
                        <h3>High Performance Computing</h3>
                        <p>
                            High-performance computing clusters are used by logging in to front-end nodes, installing
                            application software, and running batch computing jobs under a scheduler. These compute
                            resources may include GPUs, and always provide some tightly coupled local storage.
                        </p>

                        <div className="dropdown w-100 text-center">
                            <button className="btn btn-secondary" type="button">
                                Start here
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col p-3">
                    <div className="infrastructure-type-card p-3 w-100 h-100">
                        <img src={storageLogo}/>
                        <h3>Storage</h3>
                        <p>
                            Storage resources are used to store and manage large amounts of data.
                        </p>

                        <div className="dropdown w-100 text-center">
                            <button className="btn btn-secondary" type="button">
                                Start here
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col p-3">
                    <div className="infrastructure-type-card p-3 w-100 h-100">
                        <img src={cloudLogo}/>
                        <h3>Cloud</h3>
                        <p>
                            Cloud infrastructure is used by launching and running virtual machines or containers.
                        </p>

                        <div className="dropdown w-100 text-center">
                            <button className="btn btn-secondary" type="button">
                                Start here
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col p-3">
                    <div className="infrastructure-type-card p-3 w-100 h-100">
                        <img src={gatewaysLogo}/>
                        <h3>Science Gateways</h3>
                        <p>
                            Websites / portals where researchers can run high-level computational science applications without having to directly interact with low level compute, storage, or cloud resources or request ACCESS allocations. These resources will typically allow the researcher to select their input and output datasets, select and configure the application they want to run, and then run that application for the researcher using compute, storage, and/or cloud resources that have been pre-configured for executing science gateway applications.    
                        </p>

                        <div className="dropdown w-100 text-center">
                            <button className="btn btn-secondary" type="button">
                                Start here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}