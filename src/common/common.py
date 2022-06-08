import random, string

class resJson:
    def __init__(self):
        self.obj = dict(result=0, message='', values=list())

    def update(self, result: int = 0, message: str = '', values: list = list()):
        self.obj.update(result=result, message=message, values=values)

    def output(self):
        return self.obj

def random_string(n):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=n))