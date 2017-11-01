/*

    NOTE: This is a project which I am re-writing. It's already essentially finished,
    but the original code is pretty embarrassing.

*/
// "Namespace"
var MusicVisualizer = {

    // Some variables
    PRIMARY: 0,
    SECONDARY: 1,
    //////////////////////////////
    //                          //
    //  Main object             //
    //                          //
    //////////////////////////////
    Visualizer: function(canvas, audio){
        this.canvas = canvas;
        this.audio = audio;
        this.renderer;
        var dataArray;
        this.renderer;
        this.audioFilters = [];
        this.paints = [];

        // Interact with the audio API.
        var analyzerNode;
        var audioContext;
        var audioSource;
        if(audio != null){
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioSource = audioContext.createMediaElementSource(audio);
            analyzerNode = audioContext.createAnalyser();
            audioSource.connect(analyzerNode);
            audioSource.connect(audioContext.destination);
            dataArray = new Uint8Array(analyzerNode.frequencyBinCount);
        }
        // Make the local variables public
        this.analyzerNode = analyzerNode;
        this.audioContext = audioContext;
        this.audioSource = audioSource;
        this.dataArray = dataArray;

        function render(){
            this.analyzerNode.getByteFrequencyData(this.dataArray);
            for(var i = 0; i < this.audioFilters.length; i++){
                this.audioFilters[i].apply(this.dataArray);
            }
            if(this.canvas != null && this.renderer != null){
                this.renderer.render(this);
            }
        }
        this.render = render;
    },
    //////////////////////////////
    //                          //
    //  Graphics / Renderers    //
    //                          //
    //////////////////////////////
    SimpleBarRenderer: function(){
        this.render = function(visualizer){
            var canvas = visualizer.canvas;
            var data = visualizer.dataArray;
            var ctx = canvas.getContext("2d");

            var width = canvas.width;
            var height = canvas.height;
            var barWidth = width / visualizer.analyzerNode.frequencyBinCount;
            barWidth = Math.round(barWidth);

            // Draw the background
            if(visualizer.paints[MusicVisualizer.SECONDARY] == null){
                ctx.clearRect(0, 0, width, height);
            }
            else{
                ctx.fillStyle = visualizer.paints[MusicVisualizer.SECONDARY].toString();
                ctx.fillRect(0, 0, width, height)
            }

            for(var i = 0; i < visualizer.analyzerNode.frequencyBinCount; i++){
                var barHeight = (visualizer.dataArray[i] / 255) * height;
                var x = barWidth * i;
                var y = height - barHeight;
                // Get the paint color
                ctx.fillStyle = visualizer.paints[MusicVisualizer.PRIMARY].toString();
                ctx.fillRect(x, y, barWidth, barHeight);
            }
        }
    },
    //////////////////////////////
    //                          //
    //  Paint                   //
    //                          //
    //////////////////////////////
    SimplePaint: function(r, g, b, a){
        if(r == null) r = 0;
        if(g == null) g = 0;
        if(b == null) b = 0;
        if(a == null) a = 1;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.toString = function(){
            return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
        }
    },
    HighPerformancePaint: function(str){
        this.paint = str;
        this.toString = function(){
            return this.paint;
        }
    },
    //////////////////////////////
    //                          //
    //  Audio filters           //
    //                          //
    //////////////////////////////
    simpleDampenFilter: function(){
        this.apply = function(data){
            for(var i = 0; i < data.length; i++){
                var newData = data[i];
                newData -= 255 - newData;
                if(newData < 0){
                    newData = 0;
                }
                data[i] = newData;
            }
        }
    }
}