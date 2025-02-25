import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {Link, useLocation} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {useBadges} from "../contexts/BadgeContext";
import {useOrganizations} from "../contexts/OrganizationsContext";

const defaultLinkProps = {className: "btn btn-link text-medium"}

function CustomizedBreadcrumb() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/")
    const breadcrumbLinks = []
    const {organizationMap, organizationMapByName} = useOrganizations();
    const {resourceMap} = useResources();
    const {badgeMap} = useBadges();

    let key = 1;
    if (pathSegments[1] && pathSegments[1].length > 0) {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link} linkProps={{...defaultLinkProps, to: "/"}}>
            Home
        </Breadcrumb.Item>)
    }

    if (pathSegments[1] === "organizations") {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                              linkProps={{...defaultLinkProps, to: "/organizations"}}>
            Dashboard
        </Breadcrumb.Item>)
        if (pathSegments[2]) {
            const organization = organizationMap[pathSegments[2]];
            breadcrumbLinks.push(<Breadcrumb.Item
                key={key++} linkAs={Link}
                linkProps={{
                    ...defaultLinkProps,
                    to: `/organizations/${pathSegments[2]}`
                }}
            >
                {organization ? organization.organization_name : pathSegments[2]}
            </Breadcrumb.Item>)
        }
    }


    if (pathSegments[1] === "resources") {
        breadcrumbLinks.push(<Breadcrumb.Item key={key++} linkAs={Link}
                                              linkProps={{...defaultLinkProps, to: "/organizations"}}>
            Dashboard
        </Breadcrumb.Item>)
        if (pathSegments[2]) {
            const resource = resourceMap[pathSegments[2]];

            if (resource) {
                const organization = organizationMapByName[resource.organization_name];
                if (organization) {
                    breadcrumbLinks.push(<Breadcrumb.Item
                        key={key++} linkAs={Link}
                        linkProps={{
                            ...defaultLinkProps,
                            to: `/organizations/${organization.organization_id}`
                        }}
                    >
                        {organization.organization_name}
                    </Breadcrumb.Item>)
                }
            }

            breadcrumbLinks.push(<Breadcrumb.Item
                key={key++} linkAs={Link}
                linkProps={{
                    ...defaultLinkProps,
                    to: `/resources/${pathSegments[2]}`
                }}
            >
                {resource ? resource.resource_descriptive_name : pathSegments[2]}
            </Breadcrumb.Item>)
        }
    }

    return (
        <Breadcrumb>
            {breadcrumbLinks}
        </Breadcrumb>
    );
}

export default CustomizedBreadcrumb;