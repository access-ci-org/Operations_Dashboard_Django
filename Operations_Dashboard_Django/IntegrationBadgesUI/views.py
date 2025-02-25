from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render


def index(request, rest_of_path=None):
    return render(request, 'IntegrationBadgesUI/index.html', {})

    # template = loader.get_template("/IntegrationBadgesUI/index")
    # context = {}
    # return HttpResponse(template.render(context, request))

