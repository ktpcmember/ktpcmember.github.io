CD = "/".join(__file__.split("\\")[:-1])
def run(path_i:str, path_o:str, name:str):
    def get_bytes1(i:int):
        p = (b[i]<<0x18)+(b[i+1]<<0x10)+(b[i+2]<<0x8)+b[i+3]
        s = (b[i+8]<<0x18)+(b[i+9]<<0x10)+(b[i+10]<<0x8)+b[i+11]
        return {"p": p, "s": s}
    def get_bytes2(i:int):
        v = (b[i]<<0x18)+(b[i+1]<<0x10)+(b[i+2]<<0x8)+b[i+3]
        return v
    def compress():
        r = {}
        for _ in temp1:
            p, s = _["p"], _["s"]
            if s < l:
                d = temp2[s]
                r["{:x}".format(p)] = "*0x{:x}*".format(d) if i > 9 else str(d)
        return r
    with open(path_i, mode="rb") as _:
        b = _.read()
    ads = [0x8604, 0x32D4]
    l1, l2 = 12, 4
    ra1 = [ads[0] + i * l1 for i in range((len(b) - ads[0]) // l1)]
    ra2 = [i for i in range((ads[0] - ads[1]) // l2)]
    l = ra2.__len__()
    temp1, temp2 = [], []
    for i in ra1:
        d = get_bytes1(i)
        temp1.append(d)
    for i in ra2:
        j = get_bytes2(ads[1] + i*4)
        temp2.append(j)
    export = compress()
    with open(path_o, mode="w") as export:
        export.write(
            f"NAME,HASH='{name}',"+compress().__str__().replace(", ",",").replace(": ",":").replace("*'","").replace("'*","")
        )
    return None
def gen():
    from tkinter import filedialog as fd
    i = fd.askopenfilename(filetypes=[("","*")], initialdir=CD)
    n = i.split("/")[-1]
    o = CD + "/hash.py"
    run(i, o, n)
    return None