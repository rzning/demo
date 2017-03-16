window.addEventListener('load', function() {
    var myIframe = document.createElement('iframe');
    myIframe.id = 'myIframe';
    myIframe.src = "inner.html";
    var container = document.getElementById('iframe-container');
    container.appendChild(myIframe);
},false);