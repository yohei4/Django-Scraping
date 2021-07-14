from django import forms
from django.forms import ModelForm
from django.core.files.storage import default_storage


class SingleUploadForm(forms.Form):
    file = forms.ImageField(label='画像ファイル')

    def save(self):
        upload_file = self.cleaned_data['file']
        file_name = default_storage.save(upload_file.name, upload_file)
        return default_storage.url(file_name)

class SearchForm(forms.Form):
    search = forms.CharField(label='search', required=False)