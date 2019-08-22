### Closing window opened by user is impossible with modern browsers.

Here is demonstration video of this project.
https://drive.google.com/open?id=1_khezzK91MEWsVWJQSLlVVdiW_TvJ0dB

This is working because the window was opened by script.
If you refresh your browser, it will not work.

From MDN:
```
In the past, when you called the window object's close() method directly, rather than calling close() on a window instance, the browser closed the frontmost window, whether your script created that window or not. This is no longer the case; for security reasons, scripts are no longer allowed to close windows they didn't open.
```