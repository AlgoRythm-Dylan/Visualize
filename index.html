<!DOCTYPE html>
<head>
    <title>Visualize.js test</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet"> 
    <style>
        #canvas{
            position:absolute;
            top:0;
            left:0;
            height:100%;
            width:100%;
            background:rgba(0, 0, 0, .4);
        }
        #audioPlayer{
            position:absolute;
            bottom:10px;
            left:10px;
            width:calc(100% - 20px);
            opacity:0;
        }
        #audioPlayer:hover{
            opacity:1;
        }
        #instructions{
            font-size:5em;
            color:rgb(120, 120, 120);
            position:absolute;
            top:10px;
            right:10px;
            margin:0;
            padding:0;
            font-family:roboto;
            font-weight:100;
            pointer-events:none;
            user-select:none;
            -ms-user-select:none;
            -moz-user-select:none;
            -webkit-user-select:none;
        }
        body{
            background-image:url("moon.JPG"); 
            background-repeat:none;
            background-attachment:fixed;
            background-size:cover;
            background-position:center center;
        }
    </style>
</head>
<body>

    <canvas id="canvas" height=300 width=500></canvas>
    <p id="instructions">Drop an audio file onto this page</p>
    <audio controls=true id="audioPlayer"></audio>

</body>
<script src="visualize.js"></script>
<script src="zen-renderer.js"></script>
<script>

var audio  = document.getElementById("audioPlayer");
var canvas = document.getElementById("canvas");

/*var primaryPaint = new MusicVisualizer.SimplePaint();
primaryPaint.g = 150;
primaryPaint.b = 50;
visualizer.paints[MusicVisualizer.PRIMARY] = primaryPaint;
visualizer.paints[MusicVisualizer.SECONDARY] = new MusicVisualizer.HighPerformancePaint("rgb(40, 40, 40)");
visualizer.renderer = new MusicVisualizer.SimpleBarRenderer();*/

var visualizer = new MusicVisualizer.Visualizer(canvas, audio);
var zenRenderer = new ZenRenderer(150);
visualizer.renderer = zenRenderer;
visualizer.analyzerNode.fftSize = 512;
visualizer.audioFilters.push(new MusicVisualizer.simpleDampenFilter());

function fullSize(canvas){
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
}

function updateVis(){
    fullSize(canvas);
    visualizer.render();
    requestAnimationFrame(updateVis);
}

updateVis();

document.body.ondragover = function(e){
    e.preventDefault();
    e.stopPropagation();
}

document.body.ondrop = function(e){
    e.preventDefault();
    e.stopPropagation();
    audio.src = URL.createObjectURL(e.dataTransfer.files[0]);
    audio.play();
    document.getElementById("instructions").style.display = "none";
}

// A couple keys cus why not
const keys = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    RETURN: 13,
    SHIFT: 16,
    CTRL: 17,
    CONTROL: 17,
    ALT: 18,
    CAPS: 20,
    CAPSLOCK: 20,
    ESCAPE: 27,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34
}

// Key controls
document.body.onkeydown = function(e){
    if(e.keyCode == keys.SPACE){
        if(!audio.paused){
            audio.pause();
        }
        else{
            audio.play();
        }
    }
}
</script>