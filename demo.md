# Theorem Formatter Demo

## English Version
- #Theorem Let $f$ be a continuous function on $[a,b]$ . Then $f$ is Riemann integrable on $[a,b]$ .
- #Lemma If $f$ is differentiable at $x_0$ , then $f$ is continuous at $x_0$ .
- #Corollary If $f$ is differentiable on $[a,b]$ , then $f$ is continuous on $[a,b]$ .
- #Proposition The set of rational numbers is countable.
- #Definition A function $f$ is said to be uniformly continuous on $A$ if for every $\epsilon > 0$ there exists $\delta > 0$ such that $|f(x) - f(y)| < \epsilon$ whenever $|x - y| < \delta$ and $x,y \in A$ .
- #Example The function $f(x) = x^2$ is continuous but not uniformly continuous on $\mathbb{R}$ .
- #Remark The converse of the above theorem is not true in general.
- #Note This result is fundamental in real analysis.
- #Proof Let $\epsilon > 0$ be given. Choose $\delta = \sqrt{\epsilon}$ . Then for all $x,y \in \mathbb{R}$ with $|x - y| < \delta$ , we have $|f(x) - f(y)| = |x^2 - y^2| = |x - y||x + y| < \delta|x + y|$ .

## 中文版本
- #定理 设 $f$ 是 $[a,b]$ 上的连续函数，则 $f$ 在 $[a,b]$ 上黎曼可积。
- #引理 如果 $f$ 在 $x_0$ 处可导，则 $f$ 在 $x_0$ 处连续。
- #推论 如果 $f$ 在 $[a,b]$ 上可导，则 $f$ 在 $[a,b]$ 上连续。
- #命题 有理数集是可数的。
- #定义 如果对于任意 $\epsilon > 0$，存在 $\delta > 0$，使得当 $|x - y| < \delta$ 且 $x,y \in A$ 时，有 $|f(x) - f(y)| < \epsilon$，则称函数 $f$ 在 $A$ 上一致连续。
- #例子 函数 $f(x) = x^2$ 在 $\mathbb{R}$ 上连续但不是一致连续。
- #注记 上述定理的逆命题一般不成立。
- #注释 这个结果在实分析中具有基础性意义。
- #证明 给定 $\epsilon > 0$，取 $\delta = \sqrt{\epsilon}$。则对于所有满足 $|x - y| < \delta$ 的 $x,y \in \mathbb{R}$，我们有 $|f(x) - f(y)| = |x^2 - y^2| = |x - y||x + y| < \delta|x + y|$。
