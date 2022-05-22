from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView, ListView
from .scraping import ScarpingImage, scraping_images
from .forms import SearchForm
from album.models import UserImage
from django.views.decorators.http import require_POST

#テスト用
def index(request):
    for_range = [i for i in range(10)]
    context = {
        'for_range': for_range,
    }
    return render(request, "app/home.html", context)

class HomeInView(LoginRequiredMixin, TemplateView):
    template_name = "app/home.html"

    def __init__(self):
        self.params = {
            'form': SearchForm()
        }

    def get(self, request):
        return render(request, 'app/home.html', self.params)

    def post(self, request, *args, **kwargs):
        """
            *args: 複数の引数をタプルとして受け取る
            **kwargs: 複数のキーワード引数を辞書として受け取る
        """ 

        if(bool( len(request.POST['keyword']) != 0)):
            self.params['word'], self.params['link_list'] = scraping_images(request.POST['keyword'], request.user.id)
            self.params['form'] = SearchForm(request.POST)
        return render(request, 'app/home.html', self.params)

    def saved_image(self, mylink_list, link_list):
        pass


    def parse_search_params(self, words: str):
        search_words = words.replace('　', ' ').split()
        return search_words


class ImagesList(ListView):
    template_name = "app/chart.html"
    models = UserImage
    context_object_name = 'images'

    def get_queryset(self):
        id = self.request.user.id
        return self.models.objects.filter(user = id)

# @require_POST
# def scraping_images(request):
#     if request.method == 'POST':  # POSTの処理
#         # 変数定義
#         params = {}
#         scraping = ScarpingImage()

#         # スクレイピング実行
#         scraping.exec(params, request.POST['search'], request.user.id)
#         params['form'] = SearchForm(request.POST)

#     return render(request, 'app/home.html', params)