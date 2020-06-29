window.onload = function() {
  //Fetch the poll id from the url params
  const url_str = location.href;
  var url = new URL(url_str);
  let pollId = url.searchParams.get("pollId");
  let pollLayout = url.searchParams.get("pollLayout");

  //If no poll id passed redirect to view polls page
  !pollId || !pollLayout
    ? (window.location.href = "/viewpolls.html?error=error")
    : "";

  if (pollLayout == 0) {
    window.location.href = `/showpoll.html?pollId=${pollId}`;
  } else if (pollLayout == 1) {
    window.location.href = `/option-text-poll.html?pollId=${pollId}`;
  } else {
    window.location.href = `/img_poll.html?pollId=${pollId}`;
  }
};
