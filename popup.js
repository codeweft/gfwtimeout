//var items = {
//  "foo": 123456,
//  "bar": 789012,
//  "baz": 345678,
//  "bat": 901234
//};

//
//for(var index in items) {
//  document.write( index + " : " + items[index] + "<br />");
//}

function checkUrl(url) {
  return url.match(/.*google.*/);
//  return true
//
}

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      return {cancel: checkUrl(details.url) != null};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]);