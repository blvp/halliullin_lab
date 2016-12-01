var Solution = function (B_0, S_0, K, N, a, b, r) {
    this.bs = [B_0];
    this.ss = [S_0];
    this.strike = K;
    this.a = a;
    this.b = b;
    this.r = r;
    this.steps = N;
    validate(a, b, r);
    this.p_star = (r - a) / (b - a);
    this.calculateBS();
    this._C_N = this._F(S_0, this.p_star, N);
    this.first_gamma = this.calculateGamma(1, S_0);
    this.first_beta = this.calculateBeta(1, S_0);
};

Solution.prototype._F = function (x, p, n) {
    return _F(eurStock, x, p, this.a, this.b, n, this.strike)
};
Solution.prototype.nextS = function (S_cur, state) {
    if (state == 'up') {
        return S_cur + this.b * S_cur;
    } else if (state == 'down') {
        return S_cur + this.a * S_cur;
    }
};

Solution.prototype.calculateGamma = function (n, S_prev) {
    return Math.pow((1 + this.r), -(this.steps - 1)) * (
            this._F(S_prev * (1 + this.b), this.p_star, this.steps - n) -
            this._F(S_prev * (1 + this.a), this.p_star, this.steps - n)
        ) / (S_prev * (this.b - this.a))
};
Solution.prototype.calculateBeta = function (n, S_prev) {
    return this._F(S_prev, this.p_star, this.steps - n + 1) / this.bs[n] -
        Math.pow((1 + this.r), -(this.steps - n)) *
        (
            this._F(S_prev * (1 + this.b), this.p_star, this.steps - n) -
            this._F(S_prev * (1 + this.a), this.p_star, this.steps - n)
        ) /
        (
            this.bs[n - 1] * (this.b - this.a)
        )
};

Solution.prototype.calculateBS = function () {
    for (var step = 1; step <= this.steps; step++) {
        this.bs.push((1 + this.r) * this.bs[step - 1]);
    }
};

Solution.prototype.validateIter = function (n) {
    return n < this.steps;
};

function validate(a, b, r) {
    if (!(a < r && r < b)) {
        throw Error('Неверные значения для a < r < b: ' + a + ' < ' + r + ' < ' + b);
    }
}
