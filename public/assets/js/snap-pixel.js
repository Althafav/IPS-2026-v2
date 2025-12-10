(function (e, t, n) {
  if (e.snaptr) return;
  var a = (e.snaptr = function () {
    a.handleRequest
      ? a.handleRequest.apply(a, arguments)
      : a.queue.push(arguments);
  });
  a.queue = [];
  var s = "script";
  r = t.createElement(s);
  r.async = !0;
  r.src = n;
  var u = t.getElementsByTagName(s)[0];
  u.parentNode.insertBefore(r, u);
})(window, document, "https://sc-static.net/scevent.min.js");
snaptr("init", "0d8fb3ba-55fe-4944-93bb-142b67fa96ec", {
  user_email: "__INSERT_USER_EMAIL__",
});
snaptr("track", "PAGE_VIEW");
