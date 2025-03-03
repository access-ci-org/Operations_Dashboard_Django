import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";

import defaultBadgeIcon from "../assets/badge_icon_default.png"
import {useBadges} from "../contexts/BadgeContext";
import LoadingBlock from "../components/LoadingBlock";

const filters = ["All Resources", "In Progress", "Complete - Active Integration", "Pending Verification",
    "Verification Failed"];


/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Organization() {
    const {organizationId} = useParams();
    const {organizationMap, fetchOrganization} = useOrganizations();
    const {
        resources,
        resourceMap,
        fetchResources,
        fetchSelectedResources,
        getResource,
        getResourceBadges,
        getOrganizationResourceIds
    } = useResources();
    const {fetchBadges} = useBadges();
    const [filterSelection, setFilterSelection] = useState({});
    const [resourceIds, setResourceIds] = useState([]);

    const organization = organizationMap[organizationId];

    useEffect(() => {
        fetchBadges();
        fetchResources();
        fetchOrganization({organizationId});
    }, []);

    useEffect(() => {
        if (organization && resources) {
            setResourceIds(getOrganizationResourceIds({organizationName: organization.organization_name}));
        }
    }, [organization, resources]);

    useEffect(() => {
        if (resourceIds) {
            fetchSelectedResources({resourceIds});
        }
    }, [resourceIds])

    if (organization) {
        let inProgressResources = []
        let establishedResources = []
        let processing = false;

        if (resourceIds && resourceIds.length > 0) {
            for (let i = 0; i < resourceIds.length; i++) {
                let resourceId = resourceIds[i];
                let resource = getResource({resourceId})
                if (resource.roadmaps && resource.roadmaps.length > 0) {
                    establishedResources.push(resource);
                } else if (resource.roadmaps) {
                    inProgressResources.push(resource);
                } else {
                    processing = true;
                }
            }
        } else {
            processing = true;
        }


        return <div className="container">
            <div className="row">
                <h1 className="col-lg-12">
                    {organization.organization_name}
                </h1>
                <div className="col-lg-2 col-m-3 col-sm-4 bg-white" style={{
                    backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    height: 200
                }}>
                </div>
                <p className="col">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className="col-12">
                    <div className="input-group mb-3 search-input">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input type="text" className="form-control"
                               placeholder="Search Resource by Name, Type, ResourceBadge, etc"
                               aria-label="Search keywords"/>
                    </div>
                </div>
                <div className="w-12">
                    Filters :
                    {filters.map((filter, filterIndex) => {
                        let badgeClassName = "badge rounded-pill";
                        if (!filterSelection[filter]) {
                            badgeClassName += " bg-light text-dark";
                        } else {
                            badgeClassName += " text-light bg-dark";
                        }
                        return <a key={filterIndex} className={badgeClassName}>{filter}</a>
                    })}
                </div>

                <div className="container">
                    <LoadingBlock processing={processing} className="pt-4 pb-5">
                        <div className="col-12 pt-4">
                            <h2>In Progress</h2>
                            <div className="w-100 row row-cols-3">
                                {inProgressResources.map((resource, resourceIndex) => {
                                    let badges = getResourceBadges({resourceId: resource.cider_resource_id});

                                    return <div className="col p-3" key={resourceIndex}>
                                        {getResourceCard(organization, resource, badges)}
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="col-12 pt-4">
                            <h2>Current Integrations</h2>

                            <div className="w-100 row row-cols-3">
                                {establishedResources.map((resource, resourceIndex) => {
                                    let badges = getResourceBadges({resourceId: resource.cider_resource_id});
                                    return <div className="col p-3" key={resourceIndex}>
                                        {getResourceCard(organization, resource, badges)}
                                    </div>
                                })}
                            </div>
                        </div>
                    </LoadingBlock>
                </div>
            </div>
        </div>

    } else {
        return <div className="container">
            <LoadingBlock/>
        </div>
    }
}

function getResourceCard(organization, resource, badges) {
    return <div className="w-100 resource-card p-2">
        <div className="w-100 bg-light p-1 resource-card-header">
            <div className="w-100 ps-2">
                <a href="#" className="btn btn-link">Edit</a>
            </div>
            <h3 className="w-100">{resource.resource_descriptive_name}</h3>
            <div className="resource-card-header-thumbnail">
                <div className="bg-white resource-card-header-icon"
                     style={{backgroundImage: `url(${organization.other_attributes.organization_logo_url})`}}>
                </div>
                <div className="p-2 text-secondary">{resource.cider_type}</div>
            </div>
        </div>
        <div className="w-100 resource-card-body">
            <div className=" w-100 resource-card-badge-list d-flex flex-row">
                {badges && badges.slice(0, 3).map(badge => {
                    return <div className="background-image-center-no-repeat" key={badge.badge_id}
                                style={{backgroundImage: `url(${defaultBadgeIcon})`, width: 40, height: 40}}>
                    </div>
                })}
                {badges && badges.length > 3 && <div>
                    <Link to={`/resources/${resource.cider_resource_id}`}
                          className="btn btn-link text-secondary p-2 text-decoration-none">
                        +{badges.length - 3}
                    </Link>
                </div>}
            </div>

            <p className="w-100">
                {resource.resource_description}
            </p>
        </div>
        <Link to={`/resources/${resource.cider_resource_id}`} className="btn btn-dark w-100">
            View
        </Link>
    </div>
}
