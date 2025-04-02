import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import {useResources} from "./ResourcesContext";
import DefaultReducer from "./reducers/DefaultReducer";

const OrganizationsContext = createContext({
    organizations: [], organizationMap: {}, organizationMapByName: {}, fetchOrganizations: () => {
    }, fetchOrganization: ({organizationId}) => {
    }, getOrganization: ({organizationName}) => {
    }
});

export const useOrganizations = () => useContext(OrganizationsContext);

/**
 * Context provider for organizations
 * @param children
 */
export const OrganizationsProvider = ({children}) => {
    const [organizations, setOrganizations] = useReducer(DefaultReducer, []);
    const [organizationMap, setOrganizationMap] = useReducer(DefaultReducer, {});
    const [organizationMapByName, setOrganizationMapByName] = useReducer(DefaultReducer, {});

    const fetchOrganization = async ({organizationId}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_ORGANIZATION_API_URL}organizations/organization_id/${organizationId}`);
            const organization = response.data.results;
            setOrganizationMap({
                ...organizationMap, [organizationId]: organization
            });

            setOrganizationMapByName({
                ...organizationMapByName, [organization.organization_name]: organization
            });

            setOrganizationMap({
                ...organizationMap, [organizationId]: {
                    ...organization
                }
            });

            return response.data.results;
        } catch (error) {
            return error;
        }
    };
    const fetchOrganizations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_ORGANIZATION_API_URL}organizations/`);
            const _organizations = response.data.results;
            setOrganizations(_organizations);

            const _organizationMap = {};
            const _organizationMapByName = {};
            for (let i = 0; i < _organizations.length; i++) {
                let _organization = _organizations[i];
                _organizationMap[_organization.organizationId] = _organization;
                _organizationMapByName[_organization.organization_name] = _organization;
            }


            setOrganizationMap({
                ...organizationMap, ..._organizationMap
            });

            setOrganizationMapByName({
                ...organizationMapByName, ..._organizationMapByName
            });

            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    const getOrganization = ({organizationName}) => {
        if (organizationMapByName[organizationName]) {
            return {
                ...organizationMapByName[organizationName]
            };
        }
    };

    return (<OrganizationsContext.Provider
            value={{
                organizations,
                organizationMap,
                organizationMapByName,
                fetchOrganizations,
                fetchOrganization,
                getOrganization
            }}>
            {children}
        </OrganizationsContext.Provider>);
};
