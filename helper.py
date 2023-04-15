import re

def strict_sanitize(s, include_nonalpha=True):
    regstr = r'[a-zA-Z0-9_]' if include_nonalpha else r'[a-zA-Z]'
    return "".join(re.findall(regstr, s))

def stl(*a, c={list, tuple,  set}):
    return not a or (type(a[0]) in c and stl(*a[1:]))

#def maxzip(k, v):
#    if not stl(k):
#        return {k: v}
#    else:
#        print("BAPP BAPP BAPP", k, v)
#        while len(k) < len(v):
#            k.append(k[0])
#        if not stl(k[0]):
#            for i in range(0, len(v)):
#                if not stl(k[i]):
#                    DICT[k[i]] = [v[i]
#            DICT = {}
#                if k[i] in DICT:
#                    if stl(DICT[k[i]]):
#                        DICT[k[i]].append(v[i])
#                    else:
#                        DICT[k[i]] = [DICT[k[i]], v[i]]
#                else:
#                    DICT[k[i]] = [v[i]]
#            return DICT
#        else:
#            return [maxzip(k[i], v[i]) for i in range(0, min(len(k), len(v)))]
