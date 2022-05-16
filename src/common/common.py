import random, string

def random_string(n):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=n))