require.config({
    baseUrl: 'src/'
});
require(['Game'], function(Game) {
    var canvas = document.getElementById('canvas');
    if('getContext' in canvas) {
        var context = canvas.getContext('2d');
        var game = new Game();
        game.setup({
            context: context,
            width: canvas.width,
            height: canvas.height
        });
    }
});