/**
 * The JSON object definitions used in the integration badges project.
 */

/************************************************************/

/**
 * @typedef {Object} Badge - The badge object containing full badge information. Acquired through the badge context.
 * @property {number} badge_id - The badge id.
 * @property {string} name - The name of the badge.
 * @property {string} researcher_summary - The summary of the badge provided for researchers.
 * @property {string} resource_provider_summary - The summary of the badge provided for RPs.
 * @property {string} graphic - The URL of the badge graphic.
 * @property {string} default_badge_access_url - The default badge access URL. If badge_access_url is
 * not available from the resource-badge model, this is used.
 * @property {string} default_badge_access_url_label - The default badge access URL label. If badge_access_url_label is
 * not available from the resource-badge model, this is used.
 * @property {Array<Badge>} prerequisites - The list of badges that are prerequisites for the current badge.
 * @property {string} verification_method - The method used to verify the badge.
 * @property {string} verification_summary - The summary of the verification method.
 */

/************************************************************/
// Resource Catalog (Resource List) Page Definitions

/**
 * @typedef {Object} ResourceList - The list of resources acquired and modified from the resources context.
 * @property {Array<Institution>} resources - The list of resources grouped by organization.
 */

/**
 * @typedef {Object} Institution - Contains all resources that belong to that organization.
 * @property {string} organization_name - The name of the organization.
 * @property {Array<ResourceListResource>} resources - The list of resources under the organization.
 */

/**
 * @typedef {Object} ResourceListResource - The single resource to display in the resource catalog.
 * @property {number} cider_resource_id - The cider resource id of the resource.
 * @property {string} cider_type - The type of the resource.
 * @property {string} info_resourceid - The info resource id of the resource.
 * @property {string} organization_logo_url - The URL of the organization logo.
 * @property {string} organization_name - The name of the organization.
 * @property {string} organization_url - The URL of the organization.
 * @property {string} resource_description - The description of the resource.
 * @property {string} resource_descriptive_name - The descriptive name of the resource.
 * @property {Array<ResourceListResourceBadge>} badges - The available (Verified) badges for the resource. It does not contain the
 * full badge information initially, which is then acquired through searching across the badge context list.
 */

/**
 * @typedef {Object} ResourceListResourceBadge - The available (Verified) badge for the resource.
 * @property {number} resource_id - The resource id.
 * @property {number} badge_id - The badge id.
 * @property {string} badge_access_url - The URL to access the badge.
 * @property {string} badge_access_url_label - The label for the badge access URL.
 * @property {string} status - The current badge status.
 * @property {string} comment - The concierge comment for the current badge status.
 ***** Acquired in ResourceCard after searching across the badge context list ******
 * @property {string} resource_name - The name of the resource.
 * @property {Object} badge - The badge object containing full badge information. Acquired through searching across
 * the badge context list.
 */

/************************************************************/
// Resource Detail Page Definitions

/**
 * @typedef {Object} Resource - Including all the details of a single resource.
 * @property {number} cider_resource_id - The cider resource id of the resource.
 * @property {string} cider_type - The type of the resource.
 * @property {string} info_resourceid - The info resource id of the resource.
 * @property {string} latest_status - The latest status of the resource.
 * @property {string} organization_logo_url - The URL of the organization logo.
 * @property {string} organization_name - The name of the organization.
 * @property {string} organization_url - The URL of the organization.
 * @property {string} resource_description - The description of the resource.
 * @property {string} resource_descriptive_name - The descriptive name of the resource.
 * @property {string} user_guide_url - The URL of the user guide for the resource.
 * @property {Array<BadgeWorkflow>} badge_status - The list of badge workflow models associated with the resource. It
 * shows the statuses of badges that are at least planned for the current resource.
 * @property {Array<Roadmap>} roadmaps - The list of roadmaps associated with the resource.
 */

/**
 * @typedef {Object} BadgeWorkflow - The workflow model of a badge, similar to the ResourceListResourceBadge model.
 * @property {number} badge_id - The badge id.
 * @property {string} badge_access_url - The URL to access the badge.
 * @property {string} badge_access_url_label - The label for the badge access URL.
 * @property {string} comment - The concierge comment for the current badge status.
 * @property {string} status - The current badge status.
 * @property {Date} status_updated_at - The date when the badge status was last updated.
 * @property {string} status_updated_by - The user who last updated the badge status.
 */

/**
 * @typedef {Object} Roadmap - The roadmap associated with a resource that contains all the badges for that roadmap.
 * @property {number} resource_id - The resource id.
 * @property {number} roadmap_id - The roadmap id.
 * @property {roadmap} roadmap - The roadmap object containing the roadmap name
 * and the list of badges associated with the roadmap.
 */

/**
 * @typedef {Object} roadmap - The roadmap object containing the roadmap name
 * and the list of badges associated with the roadmap.
 * @property {string} name - The name of the roadmap.
 * @property {number} roadmap_id - The roadmap id.
 * @property {Array<RoadmapBadgeInfo>} badges - The list of badges associated with the roadmap.
 */

/**
 * @typedef {Object} RoadmapBadgeInfo - The badge object associated with a roadmap.
 * @property {number} sequence_no - The sequence number of the badge in the roadmap.
 * @property {boolean} required - True if the badge is required for the roadmap.
 ***** A minimized badge object named 'badge' *****
 * @property {number} badge_id - The badge id.
 * @property {string} name - The name of the badge.
 */

/**
 * @typedef {Object} RoadmapBadge - The badge object associated with a roadmap, created by merging resource roadmap
 * badge info, badge full info, and badge workflow info. Created in BadgeSection.jsx and used to display badges in the
 * resource detail page.
 * @property {number} badge_id - The badge id.
 * @property {string} name - The name of the badge.
 * @property {boolean} required - True if the badge is required for the roadmap.
 * @property {string} resource_name - The name of the resource.
 * @property {string} status - The status of the badge.
 * @property {string} badge_access_url - The URL to access the badge.
 * @property {string} badge_access_url_label - The label for the badge access URL.
 */

/************************************************************/
// Bdage Detail Page Definitions

/**
 * @typedef {Object} CombinedBadge - The badge object combining info from resource and badge from the badge context.
 * The CombinedBadge object is a superset of the RoadmapBadge object.
 * @property {number} badge_id - The badge id.
 * @property {string} name - The name of the badge.
 * @property {string} researcher_summary - The summary of the badge provided for researchers.
 * @property {string} resource_provider_summary - The summary of the badge provided for RPs.
 * @property {string} graphic - The URL of the badge graphic.
 * @property {string} default_badge_access_url - The default badge access URL. If badge_access_url is
 * not available from the resource-badge model, this is used.
 * @property {string} default_badge_access_url_label - The default badge access URL label. If badge_access_url_label is
 * not available from the resource-badge model, this is used.
 * @property {string} verification_method - The method used to verify the badge.
 * @property {string} verification_summary - The summary of the verification method.
 * @property {string} status - The status of the badge.
 * @property {string} status_updated_at - The date when the badge status was last updated.
 * @property {string} status_updated_by - The user who last updated the badge status.
 * @property {string} comment - The concierge comment for the current badge status.
 * @property {string} badge_access_url - The URL to access the badge.
 * @property {string} badge_access_url_label - The label for the badge access URL.
 * @property {Array<string>} roadmap_names - The list of roadmap names associated with the badge.
 * @property {Array<Prerequisite>} prerequisites - The list of badges that are prerequisites for the current badge.
 */

/**
 * @typedef {Object} Task - The task object related to the badge.
 * @property {number} badge_id - The badge id.
 * @property {number} sequence_no - The sequence number of the task.
 * @property {task} task - The task object containing the details about the task.
 */

/**
 * @typedef {Object} task - The task object inside the Task object that contains the details about the task.
 * @property {string} name - The name of the task.
 * @property {number} task_id - The task id.
 * @property {string} implementor_roles - The list of roles that can implement the task.
 * @property {string} technical_summary - The description of the task.
 * @property {string} detailed_instructions_url - The URL of the user guide for the task.
 * @property {string} task_experts - The list of experts who can help with the task.
 */

/**
 * @typedef {Object} Prerequisite - The prerequisite badge object related to the badge.
 * @property {number} badge_id - The badge id.
 * @property {number} sequence_no - The sequence number of the prerequisite badge.
 * @property {number} prerequisite_badge_id - The badge id of the prerequisite badge.
 */