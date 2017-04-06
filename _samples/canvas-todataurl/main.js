window.addEventListener('load', ()=>{
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', 300);
    canvas.setAttribute('height', 300);
    
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,300,300);

    var url = canvas.toDataURL();

    var img = document.createElement('img');
    img.setAttribute('src', url);
    document.getElementById('container').appendChild(img);

}, false);