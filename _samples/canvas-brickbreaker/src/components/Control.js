define(function() {
    return function() {
        var bLift = false;
        var bRight = false;

        function onkeydown(event) {
            console.log(event.code);
            switch(event.code) {
                case 'ArrowLeft':
                    bLift = true;
                    break;
                case 'ArrowRight':
                    bRight = true;
                    break;
            }
        }

        function onkeyup(event) {
            switch(event.code) {
                case 'ArrowLeft':
                    bLift = false;
                    break;
                case 'ArrowRight':
                    bRight = false;
                    break;
            }
        }

        return {
            init: function(opts) {
                window.addEventListener('keydown', onkeydown, false);
                window.addEventListener('keyup', onkeyup, false);
            },
            get bLift() {
                return bLift;
            },
            get bRight() {
                return bRight;
            }
        };
    };
});