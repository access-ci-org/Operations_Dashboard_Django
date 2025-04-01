import './App.scss';
import './styles/style.scss';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Outlet, Route, Routes, BrowserRouter, useParams} from 'react-router-dom';
import axios from "axios";
import {BadgeProvider, useBadges} from "./contexts/BadgeContext";
import {ResourcesProvider, useResources} from "./contexts/ResourcesContext";
import NewResource from "./pages/NewResource";
import IntegrationDashboard from "./pages/IntegrationDashboard";
import {OrganizationsProvider, useOrganizations} from "./contexts/OrganizationsContext";
import Organization from "./pages/Organization";
import Home from "./pages/Home";
import CustomizedBreadcrumb from "./components/CustomizedBreadcrumb";
import Resource from "./pages/Resource";
import ResourceBadge from "./pages/ResourceBadge";
import {TaskProvider, useTasks} from "./contexts/TaskContext";
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import {useEffect, useState} from "react";
import LoadingBlock from "./components/LoadingBlock";
import ResourceEdit from "./pages/ResourceEdit.jsx";
import {RoadmapProvider} from "./contexts/RoadmapContext.jsx";

// Setting the default baseURL
axios.defaults.baseURL = import.meta.env.VITE_OPERATIONS_API_URL;

const RouterLayout = () => {
    const {fetchOrganizations, organizations} = useOrganizations();
    const {fetchResources, resources} = useResources();
    const {fetchBadges} = useBadges();

    useEffect(() => {
        fetchResources();
        fetchOrganizations();
        fetchBadges();
    }, []);

    return (
        <div className="w-100 access-operations-integration-badges">
            <div className="container">
                <CustomizedBreadcrumb/>
            </div>
            {resources && organizations ? <Outlet/> : <LoadingBlock processing={true}/>}
        </div>
    );
};

function App() {
    // if (!oauthSignIn()) {
    //     return null;
    // }

    return (
        <OrganizationsProvider>
            <RoadmapProvider>
                <TaskProvider>
                    <BadgeProvider>
                        <ResourcesProvider>
                            <I18nextProvider i18n={i18n}>
                                <div className="w-100 pt-3">
                                    <div className="w-100">
                                        <BrowserRouter basename={window.SETTINGS.PUBLIC_URL}>
                                            <Routes>
                                                <Route path="/" element={<RouterLayout/>}>
                                                    <Route index element={<Home/>}/>
                                                    <Route path="/organizations" element={<IntegrationDashboard/>}/>
                                                    <Route path="/organizations/:organizationId"
                                                           element={<Organization/>}/>
                                                    <Route path="/organizations/new" element={<NewResource/>}/>


                                                    <Route path="/resources/:resourceId" element={<Resource/>}/>
                                                    <Route path="/resources/:resourceId/edit"
                                                           element={<ResourceEdit/>}/>
                                                    <Route path="/resources/:resourceId/badges/:badgeId"
                                                           element={<ResourceBadge/>}/>

                                                </Route>
                                            </Routes>
                                        </BrowserRouter>
                                    </div>
                                </div>
                            </I18nextProvider>
                        </ResourcesProvider>
                    </BadgeProvider>
                </TaskProvider>
            </RoadmapProvider>
        </OrganizationsProvider>
    );
}

export default App;
