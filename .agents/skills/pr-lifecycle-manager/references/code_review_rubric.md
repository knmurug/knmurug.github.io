# Code Review Rubric & Evaluation Guide

Use this rubric when evaluating code changes or conducting automated code reviews.

---

## Evaluation Pillars

### 1. Functional Correctness & Logic
- [ ] Does the implementation fulfill the requirements without unintended side effects?
- [ ] Are edge cases handled (empty lists, `null`/`undefined`, invalid types, timeout/network drops)?
- [ ] Are error messages informative and properly caught/logged?

### 2. Security & Data Protection
- [ ] No hardcoded credentials, API tokens, or secrets.
- [ ] Input validation and sanitization (SQL injection, XSS, SSRF).
- [ ] Authentication and authorization checks are preserved on all protected routes/methods.

### 3. Performance & Resource Efficiency
- [ ] Avoid $O(N^2)$ loops or redundant computations inside hot code paths.
- [ ] Ensure database queries avoid N+1 query problems.
- [ ] Proper cleanup of event listeners, file descriptors, and timers (avoid memory leaks).

### 4. Maintainability & Code Quality
- [ ] Variable and function names are clear, concise, and self-documenting.
- [ ] Code adheres to existing repository conventions and idioms.
- [ ] Functions are modular with single responsibility.
- [ ] Complex business logic is accompanied by brief explanatory comments.
