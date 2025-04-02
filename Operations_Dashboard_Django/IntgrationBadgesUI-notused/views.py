from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.conf import settings
import os
import json


def index(request, rest_of_path=None):
    django_app_name = "IntegrationBadgesUI"
    react_app_name = "integration-badges-ui-react"

    with open(os.path.join(settings.BASE_DIR,
                           f"{django_app_name}/static/{react_app_name}/.vite/manifest.json"), 'r') as f:

        manifest_json = json.load(f)

        main_js = manifest_json["index.html"]["file"]
        main_css = manifest_json["index.html"]["css"][0]

    return render(request, 'IntegrationBadgesUI/index.html', {
        "main_js": f"{react_app_name}/{main_js}",
        "main_css": f"{react_app_name}/{main_css}"
    })
