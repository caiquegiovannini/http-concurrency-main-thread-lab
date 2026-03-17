<a name="readme-top"></a>

# HTTP Concurrency & Main Thread Lab

Experimental project exploring how browser runtimes handle CPU-bound tasks, HTTP concurrency, and main thread responsiveness.

The goal is to demonstrate how heavy computations and concurrent network requests impact UI responsiveness and how modern browser APIs can mitigate these issues.

---

## Concepts Explored

- Browser Main Thread
- Event Loop
- CPU-bound vs I/O-bound tasks
- Web Workers
- HTTP concurrency
- AbortController
- Connection reuse (Keep-Alive)
- Performance measurement

---

## Experiments

### 1. Main Thread Blocking

A heavy CPU-bound loop runs directly on the main thread.

Result:
- UI freezes
- Scroll stops
- requestAnimationFrame pauses
- DevTools shows a long task occupying the main thread

This demonstrates how JavaScript execution can block rendering and user interaction.

---

### 2. Offloading Work with Web Workers

The same heavy computation is executed inside a Web Worker.

Result:
- Main thread remains responsive
- UI updates continue
- The worker performs the calculation in parallel

This demonstrates how Web Workers prevent CPU-heavy tasks from blocking the UI.

<p align="right"><a href="#readme-top">back to top ↑</a></p>

---

### 3. HTTP Concurrency Stress Test (soon)

The application fires multiple HTTP requests simultaneously to observe:

- request scheduling
- connection reuse
- network parallelism

Different execution strategies are tested:

- fully parallel
- sequential
- concurrency-limited

---

### 4. Concurrency Control (soon)

A custom concurrency limiter is implemented to restrict the number of simultaneous requests.

This helps analyze the trade-offs between:

- throughput
- latency
- resource usage

---

### 5. Request Cancellation (soon)

Requests can be cancelled using AbortController to prevent unnecessary network usage and avoid race conditions.

---

### 6. Performance Measurement (soon)

The project uses the Performance API to measure:

- total execution time
- request latency
- differences between execution strategies

Results are visualized in the browser console.

---

## What This Project Demonstrates

- How the browser schedules JavaScript execution
- Why CPU-bound tasks block the main thread
- How Web Workers enable parallel computation
- How concurrent HTTP requests behave in the browser
- How to measure runtime performance using browser APIs