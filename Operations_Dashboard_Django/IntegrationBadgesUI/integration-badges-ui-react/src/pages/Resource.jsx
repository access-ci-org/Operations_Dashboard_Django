import {Link, useParams} from "react-router-dom";
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";

import defaultBadgeIcon from "../assets/badge_icon_default.png"
import {useTranslation} from "react-i18next";

export default function Resource() {
    const {t} = useTranslation();
    const {resourceId} = useParams();
    const {fetchOrganizations} = useOrganizations();
    const {fetchResource, getResource, getResourceBadges, getResourceOrganization} = useResources();
    const {fetchBadges} = useBadges();
    const [filterSelection, setFilterSelection] = useState({});

    useEffect(() => {
        fetchResource({resourceId});
        fetchOrganizations();
        fetchBadges();
    }, []);

    const resource = getResource({resourceId});
    let organization = getResourceOrganization({resourceId})
    let badges = getResourceBadges({resourceId});

    if (resource && organization) {
        return <div className="container">
            <div className="row">
                <h1>{resource.resource_descriptive_name}</h1>
                <div>
                    By&nbsp;&nbsp;
                    <Link to={`/organizations/${organization.organization_id}`} className="btn btn-link text-dark">
                        {organization.organization_name}
                    </Link>
                </div>
            </div>
            <div className="row pt-5">
                <h2>Overview</h2>
                <div className="row">
                    <div className="col">
                        <label className="text-secondary">Resource Type</label>
                        <div>{resource.cider_type}</div>
                    </div>
                    <div className="col">
                        <label className="text-secondary">Latest Status</label>
                        <div>{resource.latest_status}</div>
                    </div>
                    <div className="col">
                        <label className="text-secondary">Global Resource ID</label>
                        <div>{resource.info_resourceid}</div>
                    </div>
                </div>
            </div>
            <div className="w-100 pt-3 pb-3">
                <p>{resource.resource_description}</p>
                <Link to={resource.user_guide_url} className="btn btn-dark">View User Guide</Link>
            </div>
            <div className=" w-100 pt-5 pb-5 text-medium lead fst-italic fs-3">
                Review the list of badges waiting for completion and start completing tasks to earn badges and track
                your progress!
            </div>

            <div className="row">
                <h2>Badges</h2>
                {(() => {

                    let badgeStatistics = {
                        [BadgeWorkflowStatus.NOT_PLANNED]: 0,
                        [BadgeWorkflowStatus.PLANNED]: 0,
                        [BadgeWorkflowStatus.TASK_COMPLETED]: 0,
                        [BadgeWorkflowStatus.VERIFICATION_FAILED]: 0,
                        [BadgeWorkflowStatus.VERIFIED]: 0,
                        [BadgeWorkflowStatus.DEPRECATED]: 0,
                    };

                    if (badges && badges.length > 0) {
                        for (let i = 0; i < badges.length; i++) {
                            const badge = badges[i];
                            badgeStatistics[badge.status]++;
                        }

                        return <Nav variant="underline" defaultActiveKey="1" className="ps-3">
                            <Nav.Item>
                                <Nav.Link eventKey="0">
                                    Verification Approved ({badgeStatistics[BadgeWorkflowStatus.VERIFIED]})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="1">All ({badges.length})</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2">
                                    Verification Pending
                                    ({badgeStatistics[BadgeWorkflowStatus.TASK_COMPLETED]
                                    + badgeStatistics[BadgeWorkflowStatus.VERIFICATION_FAILED]})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3">Verification Failed
                                    ({badgeStatistics[BadgeWorkflowStatus.VERIFICATION_FAILED]})</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    }

                    return null
                })()}


                <div className="w-100 pt-2 pb-5 row row-cols-3">
                    {badges && badges.map((badge) => {
                        return <div className="col p-3" key={badge.badge_id}>
                            {getBadgeCard(organization, resource, badge, t)}
                        </div>
                    })}
                    {badges && badges.length === 0 && <div className="w-100 p-3 text-center lead">
                        No badges available
                    </div>}
                </div>
            </div>
        </div>
    } else {
        return <div>Loading...</div>
    }

}

function getBadgeCard(organization, resource, badge, t) {

    if (organization && resource && badge) {
        return <div className="w-100 badge-card p-2">
            <div className="w-100 p-1 badge-card-header">
                <div className="badge-card-header-thumbnail">
                    <div className="badge-card-header-icon"
                         style={{backgroundImage: `url(${defaultBadgeIcon})`}}>
                    </div>
                </div>
                <h3 className="w-100">{badge.name}</h3>
            </div>
            <div className="w-100 badge-card-body">
                <p className="w-100">
                    {badge.resource_provider_summary}
                </p>


                <div className="w-100 text-center">
                    <small className={`ps-2 pe-2 pt-1 pb-1 rounded-1 ${t(`badgeWorkflowStatusClass.${badge.status}`)}`}>
                        {badge.status ? t(`badgeWorkflowStatus.${badge.status}`) : "  "}
                    </small>
                </div>
            </div>
            <Link to={`/resources/${resource.cider_resource_id}/badges/${badge.badge_id}`}
                  className="btn btn-dark w-100">
                View
            </Link>
        </div>
    }
}
