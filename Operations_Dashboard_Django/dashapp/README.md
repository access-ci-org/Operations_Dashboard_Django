# ACCESS Operations Dashboard - Django model based Dashboard application definition

This Django application "/dashapp" enables defining and configuring dynamic Dashboard Applications in Django models.

The primary use case is to make it possible to define multiple Dashboard WebApp URLs that invoke different versions and configurations of the same WebApp without having to update and deploy new versions of the Dashboard.

## Constraints
- This feature is most useful when the WebApp is hosted and loaded from an external server, such as a CDN
- The Django template that invokes the WebApp must already exist in the Dashboard application
- The Dashboard Application must be defined and configured through the Django Admin interface

## Description

Each Dashboard Application has the following configuration attributes:

- path: Relative path for invoking the Applications, by default /dashapp/app/<name>
- name: Application display name (both path and name must be unique)
- template: Django template file that invokes the application
- description: More detail application description
- tags: Application tags (none currently implemented)
- graphic: The graphic associated with the Dashboard Application
- disabled: Disables the Application without having to delete it

Each Dashboard Application can be associated with or more named code elements that are passed to the Django template file that configure and customize the application. Multiple applications can reference the same code element. Each code element has the following configuration attributes:

- name: The name of the code element that can be referenced in the template
- code: The actual code, which will typically be html

Code elements have these substrings substituted:
- %APP_BASENAME% - the path the application was invoked at
- %OPERATIONS_API_BASE_URL% - the Django dashboard configured Operations API base url

Dashboard Applications can be restricted to members of configurable Django groups. The Django model has been defined to support this feature, but it has not been implemented in code yet.

## Example

### Appplicaton Definition

```
{
    app_id:      1,
    path:        "/dashapp/app/badges1.0.0",
    name:        "Integration Dashboard v1.0.0",
    template:    "dashapp/badges_ui_cdn.html",
    description: "Resource Provider Integration Badges UI v1.0.0",
    tags:        null,
    graphic:     "/dbfile/files/e57a6e19-78ab-4ab6-8fcc-a3ea4bc0a946",
    disabled:    false
}
```

### Code Definition associated with the above Application

```
{
    name:        "IntegrationBadgesUI_header_1_0_0"
    code:        "\
<script>
    window.SETTINGS = {
        APP_BASENAME: "%APP_BASENAME%",
        OPERATIONS_API_BASE_URL: "%OPERATIONS_API_BASE_URL%",
        DASHBOARD_BASE_URL: window.location.origin,
        };
</script>
<link href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_Django_IntegrationBadges@1.0.0/IntegrationBadgesUI/static/integration-badges-ui-react/.vite/manifest.json" rel="manifest"/>
<script defer="defer" src="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_Django_IntegrationBadges@1.0.0/IntegrationBadgesUI/static/integration-badges-ui-react/assets/index-CM5fbA61.js"></script>
<link href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_Django_IntegrationBadges@1.0.0/IntegrationBadgesUI/static/integration-badges-ui-react/assets/index-D_mywFP1.css" rel="stylesheet"/>"
}
```
