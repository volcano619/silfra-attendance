import django_tables2 as tables
from sample.models import Post

class PostTable(tables.Table):
	class Meta:
		attrs={'class':'table'}
		model = Post
		#attrs = {'class': 'mytable'}