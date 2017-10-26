from django.shortcuts import render
#from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse, HttpResponseForbidden, HttpResponseRedirect
from datetime import datetime as dt
import datetime
from sample.models import Post
from sample.tables import PostTable
# Create your views here.

def index (request):
	Datenow = dt.today()#+datetime.datetime.now().strftime('%H:%M:%S')
	#Datas= Post.objects.get(id="1")
	return render(request,'sample/test.html',{'Datenow': Datenow})
	
def index2 (request):
	Datenow = dt.today()#+datetime.datetime.now().strftime('%H:%M:%S')
	#Datas= Post.objects.get(id="1")
	return render(request,'sample/login.html',{'Datenow': Datenow})
	
@csrf_exempt
def checkLogin (request):
	if request.is_ajax():
		param = request.POST.get('param', None)
		param1 = request.POST.get('param1', None)
		if (param=="admin" and param1=="admin"):
			Datenow = dt.today()#+datetime.datetime.now().strftime('%H:%M:%S')
			
			return HttpResponse('admin')
			
		
		elif (param=="user" and param1=="user"):
			Datenow = dt.today()#+datetime.datetime.now().strftime('%H:%M:%S')
			
			return HttpResponse('user')
		else:
			Datenow = dt.today()#+datetime.datetime.now().strftime('%H:%M:%S')
			return HttpResponse('none')
			
	return HttpResponseBadRequest()
	
def loadData (request):
	Datenow = dt.today()#+datetime.datetime.now().strftime('%H:%M:%S')
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
		str1=str(dt.today())
		str2=str1.split(" ")
		stringData=param2+" ("+param1+")"
		p = Post(user="Venkatesh",weekOfthemonth=stringData ,didAttend='Yes',date=str2[0],numofHours=param,logIn=param3,logOut=param4)
		p.save()
	return HttpResponseBadRequest()
