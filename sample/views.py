from django.shortcuts import render
#from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse, HttpResponseForbidden, HttpResponseRedirect
import datetime
from sample.models import Post
from sample.tables import PostTable
# Create your views here.

def index (request):
	Datenow = datetime.datetime.now().strftime('%H:%M:%S')
	Datas= Post.objects.get(id="1")
	return render(request,'sample/test.html',{'Datenow': Datenow,'Datas':Datas})
	
def index2 (request):
	Datenow = datetime.datetime.now().strftime('%H:%M:%S')
	Datas= Post.objects.get(id="1")
	return render(request,'sample/login.html',{'Datenow': Datenow,'Datas':Datas})
	
@csrf_exempt
def checkLogin (request):
	if request.is_ajax():
		param = request.POST.get('param', None)
		param1 = request.POST.get('param1', None)
		if (param=="admin" and param1=="admin"):
			Datenow = datetime.datetime.now().strftime('%H:%M:%S')
			#return HttpResponse(param)
			#return HttpResponseRedirect('sample/')
			return render(request,'sample/test.html',{'Datenow': Datenow})
		else:
			Datenow = datetime.datetime.now().strftime('%H:%M:%S')
			return render(request,'sample/login.html',{'Datenow': Datenow})
	return HttpResponseBadRequest()
	
def loadData (request):
	Datenow = datetime.datetime.now().strftime('%H:%M:%S')
	table = PostTable(Post.objects.all())
	return render(request,'sample/getdata.html',{'Datenow': Datenow,'table':table})
	
@csrf_exempt
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
