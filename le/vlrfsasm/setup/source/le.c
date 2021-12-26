#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    bool ok = false;
    for (int b = 0; b < 1 << n; b++) {
        int sum = 0;
        for (int i = 0; i < n; i++) {
            if ((b >> i) & 1) {
                sum += a[i];
            }
        }
        if (sum == k) ok = true;
    }
    if (ok) cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}