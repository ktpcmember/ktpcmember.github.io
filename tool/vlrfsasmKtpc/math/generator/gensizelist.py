CD = "/".join(__file__.split("\\")[:-1])
def i2l(i:int):
    return [(i>>0x18)&0xFF,(i>>0x10)&0xFF,(i>>0x8)&0xFF,i&0xFF]
def getyn(name:str):
    return input(f"We are going to analyze the ttf file called '{name}'.\nAre you OK with this one?\nPlease respond with 'yes' or 'no' [y/n].\n") in "yes"
def gen(p1:list):
    try:
        from hash import HASH,NAME
        if getyn(NAME) == False:
            import genhash
            genhash.gen()
            from hash import HASH
    except:
        import genhash
        genhash.gen()
        from hash import HASH
    q,r = [],[]
    for _ in p1:
        if type(_) == int:
            q.append(_)
            continue
        else:
            try:
                q.extend(range(_[0], _[1]+1))
            finally:
                pass
    if q == []: return
    for i in q:
        r.extend(i2l(i))
        r.extend(i2l(HASH["{:x}".format(i)]))
    with open(CD+"/sizeList.bin", mode="wb") as __:
        __.write(bytes(r))
    return None