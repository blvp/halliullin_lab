function eurStock(S, K) {
    return Math.max(0, (S - K));
}

function _F(f, x, p, a, b, n, strike) {
    var result = 0.0;
    for (var k = 0; k <= n; k++) {
        result += f(x * Math.pow((1 + b), k) * Math.pow((1 + a), n - k), strike)
            * math.combinations(n, k)
            * Math.pow(p, k)
            * Math.pow((1 - p), n - k)
    }
    return result;
}

