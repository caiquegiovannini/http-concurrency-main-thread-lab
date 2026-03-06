# HTTP Concurrency & Main Thread Lab

Experimental study of HTTP concurrency patterns and their impact on main thread performance and UI responsiveness in the browser.

## Project steps description
First of all we understand that browsers are, by default, single threaded so all tasks run in the main thread. That said, the project have some tasks running in loop and events listeners registereds. We have a button that executes some heavy calculations and freezes the screen, because these calculations occupied the main thread that only releases itself when the tasks finish.

Knowing the problem, we create a web worker and make it executes the heavy calculation instead. It will do it in a secondary thread, allowing the main thread contiue working fluid and non blocking it.

> The problem is not the heavy calculations.
> The problem is where they run.