from django.shortcuts import render
#from django.http import HttpResponse
from django.http import JsonResponse
from django.http import HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse, HttpResponseForbidden
import datetime
from sample.models import Post
# Create your views here.

def index (request):
	Datenow = datetime.datetime.now().strftime('%H:%M:%S')
	return render(request,'sample/test.html',{'Datenow': Datenow})
	

def saveData(request):
	if request.is_ajax():
		# extract your params (also, remember to validate them)
	
		param = request.POST.get('param', None)
		param1 = request.POST.get('param1', None)
		param2 = request.POST.get('param2', None)
		param3 = request.POST.get('param3', None)
		param4 = request.POST.get('param4', None)
		stringData=datetime.datetime.now().strftime('%H:%M:%S')+" ("+param1+")"
		#another_param = request.POST.get('another param', None)
		#return HttpResponse(param, mimetype)
		p = Post(user="Venkatesh",weekOfthemonth=param2 ,didAttend='Yes',date=stringData,numofHours=param,logIn=param3,logOut=param4)
		p.save()
	return HttpResponseBadRequest()
