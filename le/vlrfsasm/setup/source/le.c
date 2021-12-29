#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    bool ok = false;
    //@r;rRed;ビット全探索のループ;ビット全探索開始
    for (int b = 0; b < 1 << n; b++) {
        int sum = 0;
        for (int i = 0; i < n; i++) {
            //@r;rBlue;対応するビットが1のとき;ビットによる分岐
            if ((b >> i) & 1) {
                sum += a[i];
            /*@e*/}
        }
        if (sum == k) ok = true;
    }
    //@e;ビット全探索終了
    if (ok) cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}