import './App.css';
import './styles/style.scss';
import ResourceCatalog from "./pages/ResourceCatalog";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ResourceDetail from "./pages/ResourceDetail";
import BadgeDetail from "./pages/BadgeDetail";
import Demo from "./pages/Demo";
import axios from "axios";
import {ResourcesProvider} from "./contexts/ResourcesContext";
import {BadgeProvider} from "./contexts/BadgeContext";
import {TaskProvider} from "./contexts/BadgeContext";

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
        const authorizeUrl = "https://cilogon.org/authorize?" +
            "response_type=code&" +
            "client_id=cilogon:/client_id/27b627c35a7f4d2649c304d45bcc08ca&" +
            "redirect_uri=https://operations.access-ci.org&" +
            "scope=openid+profile+email+org.cilogon.userinfo";
        console.log("authorizeUrl : " + authorizeUrl);
        alert("authorizeUrl : " + authorizeUrl);
        window.location.href = authorizeUrl;
        return false;
    }

    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://cilogon.org/oauth2/token';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': 'cilogon:/client_id/27b627c35a7f4d2649c304d45bcc08ca',
        'client_secret': "niRuUY0DITje1oSNyIiUhidS-KwSNGzhhEtMpmIRGsaNOp58bzG7EyiivE7RS3J_XZpp8mn8aYcoFeRykWyFbw",
        'redirect_uri': 'http://127.0.0.1:3000',
        'grant_type': 'authorization_code',
        'code': code,

        // 'response_type': 'token',
        // 'scope': 'https://cilogon.org/oauth2/idToken/abcdef123456',
        // 'include_granted_scopes': 'true',
        // 'state': 'pass-through value'
    };

    // function jsonToQueryString(json) {
    //   return '?' +
    //       Object.keys(json).map(function(key) {
    //           return encodeURIComponent(key) + '=' +
    //               encodeURIComponent(json[key]);
    //       }).join('&');
    //   }

    const headers = {
        "Access-Control-Allow-Origin": "*"
    }
    axios.post(oauth2Endpoint, params, {headers}).then((response) => {
        console.log("#### Cilogon token response #### ", response);
    });

    return true;


    // Add form parameters as hidden input values.
    // for (var p in params) {
    //   var input = document.createElement('input');
    //   input.setAttribute('type', 'hidden');
    //   input.setAttribute('name', p);
    //   input.setAttribute('value', params[p]);
    //   form.appendChild(input);
    // }
    //
    // // Add form to page and submit it to open the OAuth 2.0 endpoint.
    // document.body.appendChild(form);
    // form.submit();
}


// Setting the default baseURL
// axios.defaults.baseURL = "http://127.0.0.1:8000/wh2/integration_badges/v1";
axios.defaults.baseURL = "https://opsapi3.access-ci.org/wh2/integration_badges/v1/"

// define the workflow states
export const workflow_states = {
    NOT_PLANNED: "Not Planned",
    PLANNED: "Planned",
    TASK_COMPLETED: "Task Completed",
    VERIFICATION_FAILED: "Verification Failed",
    VERIFIED: "Verified",
    DEPRECATED: "Deprecated"
};

function App() {
    // if (!oauthSignIn()) {
    //     return null;
    // }

    return (
        <ResourcesProvider>
            <BadgeProvider>
                <TaskProvider>
                    <div className={"main"}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<ResourceCatalog/>}/>
                                <Route path="/resourceDetail/:resourceId" element={<ResourceDetail/>}/>
                                <Route path="/resourceBadge/:resourceId/:badgeId" element={<BadgeDetail/>}/>

                                {process.env.NODE_ENV === "production" ? null : (
                                    <Route path="/demo" element={<Demo/>}/>
                                )}
                            </Routes>
                        </BrowserRouter>
                    </div>
                </TaskProvider>
            </BadgeProvider>
        </ResourcesProvider>
    );
}

export default App;
