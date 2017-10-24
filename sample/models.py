from django.db import models

class Post (models.Model):
	user=models.CharField(max_length=140)
	didAttend=models.TextField()
	date=models.TextField()
	numofHours=models.TextField(null=True)
	weekOfthemonth=models.TextField(null=True)
	logIn=models.TextField(null=True)
	logOut=models.TextField(null=True)
	

	def __str__(self):
		return self.user
