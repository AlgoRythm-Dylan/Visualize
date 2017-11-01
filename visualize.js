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
        var renderers;
        var audioFilters;

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
            new Uint8Array(analyzerNode.frequencyBinCount);
        }
        // Make the local variables public
        this.analyzerNode = analyzerNode;
        this.audioContext = audioContext;
        this.audioSource = audioSource;

        function render(){
            // Do stuff!
        }
        this.render = render;
    },
    //////////////////////////////
    //                          //
    //  Graphics / Renderers    //
    //                          //
    //////////////////////////////
    SimpleBar: function(){
        
    }

}