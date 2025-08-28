import math

def lowh(points):
    points = sorted(points)
    x = []

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    for p in points:
        while len(x) >= 2 and cross(x[-2], x[-1], p) <= 0:
            x.pop()
        x.append(p)
    return x  

def clen(chain):
    return sum(math.hypot(chain[i+1][0] - chain[i][0], chain[i+1][1] - chain[i][1]) for i in range(len(chain) - 1))

n = int(input())
pts = [tuple(map(int, input().split())) for _ in range(n)]

b = lowh(pts)
length = clen(b)

ans = math.floor(length + 0.5)
print(ans)
