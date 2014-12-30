// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
//chrome.extension.onMessage.addListener(
//  function(request, sender, sendResponse) {
//  	chrome.pageAction.show(sender.tab.id);
//    sendResponse();
//  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if(message.method == "getStorage"){
    if(message.extensionSettings === "storage") {
      sendResponse({extdata:JSON.parse(localStorage.getItem("extdata") || '{}')});
    }
  }
  else if(message.method == "setStorage"){
    localStorage.setItem("extdata", JSON.stringify(message.newData));
  }
});

var todos = [
    {text:'use.typekit.net', done:true},
    {text:'googleapis.com', done:false}
];

localStorage.setItem("extdata", JSON.stringify(todos));