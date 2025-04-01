import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

const faq = [
    {
        title: "Where can I find infrastructure description and status information?",
        description: ""
    },
    {
        title: "How do I integrate my resource into ACCESS?",
        description: ""
    },
    {
        title: "Where can I post information about training and documentation for my resource?",
        description: ""
    },
    {
        title: "Are there collaborative development tools I can use?",
        description: ""
    },
    {
        title: "What support is available for RPs?",
        description: ""
    },
    {
        title: "How do RPs manage and monitor their infrastructure?",
        description: ""
    },
    {
        title: "How do RPs get involved in the ACCESS community?",
        description: ""
    }
];

const quickLinks = [
    {
        label: "Integration news",
        href: "#"
    },
    {
        label: "System status news",
        href: "#"
    },
    {
        label: "Ticketing system",
        href: "#"
    },
    {
        label: "report a security incident",
        href: "#"
    },
    {
        label: "Join the RP Slack channel",
        href: "#"
    },
    {
        label: "Join the RP Forum",
        href: "#"
    },
    {
        label: "Open a help ticket",
        href: "#"
    }
];

export default function Home() {
    return <div className="w-100">
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-8">
                    <div className="row"><h1>For Resource Providers</h1>
                        <p>
                            Resource Providers (RPs) are at the center of ACCESS, making research possible for the
                            diverse
                            community
                            ACCESS serves. Our providers share cyberinfrastructure resources and their expertise with
                            the
                            researchers and scientists who request allocations. This symbiotic relationship, supported
                            by other
                            areas of the program, makes scientific discoveries happen.
                        </p>
                    </div>

                    <div className="row mt-4">
                        <h2>Not sure where to start?</h2>

                        <div className="w-100 p1-2 pb-2">
                            <button type="button" className="btn btn-light w-100" style={{maxWidth: "300px"}}>
                                Learn How & Why to Become an RP
                            </button>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <h2>Ready to integrate a new resource or continue where you left off? </h2>

                        <div className="w-100 p1-2 pb-2">
                            <button type="button" className="btn btn-dark w-100" style={{maxWidth: "300px"}}>
                                Start New Integration
                            </button>
                        </div>


                        <div className="w-100 p1-2 pb-2">
                            <Link to="/organizations" className="btn btn-light w-100" style={{maxWidth: "300px"}}>
                                Go to Integration Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <h2>Frequently Asked Questions</h2>

                        <div className="w-100 pt-1 pb-2">

                            <Accordion defaultActiveKey="0">
                                {faq.map(({title, description}, faq_key) => {
                                    return <Accordion.Item eventKey={faq_key.toString()} key={faq_key}>
                                        <Accordion.Header>{title}</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                })}
                            </Accordion>
                        </div>
                    </div>


                    <div className="row mt-4">
                        <h2>Quick Links</h2>

                        <div className="w-100 pt-1 pb-2">
                            <ul>
                                {quickLinks.map(({label, href}, quickLinkKey) => {
                                    return <li key={quickLinkKey}>
                                        <a className="btn btn-link" href={href}>{label}</a>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col p-3">
                    <div className="w-100 bg-yellow p-4">
                        <h1>Im a resource provider</h1>
                        <p>
                            <i className="bi bi-quote"></i>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-100 bg-dark mb-5">
            <div className="container">
                <div className="row">
                    <div className="p-5">
                        <h1>ACCESS Resource Providers</h1>
                    </div>
                    <div className="p-5 pt-0">
                        <Carousel data-bs-theme="dark" controls={false}>
                            <Carousel.Item>
                                <div className="row pb-4">
                                    {[1, 2, 3, 4].map(key => {
                                        return <div className="col p-3" key={key}>
                                            <div className="w-100 p-5 bg-light" style={{height: 200}}>
                                                TBA {key}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="row pb-4">
                                    {[5, 6, 7, 8].map(key => {
                                        return <div className="col p-3" key={key}>
                                            <div className="w-100 p-5 bg-light" style={{height: 200}}>
                                                TBA {key}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="row pb-4">
                                    {[9, 10, 11, 12].map(key => {
                                        return <div className="col p-3" key={key}>
                                            <div className="w-100 p-5 bg-light" style={{height: 200}}>
                                                TBA {key}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>

    </div>
}