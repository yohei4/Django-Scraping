import random, string

class resJson:
    def __init__(self):
        self.obj = dict(reslut=0, message='', values=list())

    def update(self, reslut: int = 0, message: str = 0, values: list = list()):
        self.obj.update(reslut=reslut, message=message, values=values)

    def output(self):
        return self.obj

def random_string(n):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=n))