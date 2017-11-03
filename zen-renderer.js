// The main visualizer object
function ZenRenderer(size){
    // Data
    this.rotation = 0;
    this.rotationSpeed = .1;
    // Is the circle broken apart?
    this.broken = false;
    this.growing = false;
    this.shrinking = false;
    this.growth = 0;
    this.growthRate = .002;
    this.segments = [];

    // 60fps * 10 seconds
    this.timeUntilNextState = 60 * 10;

    if(size == null) size = 250;
    this.size = size;
    this.render = function(visualizer){
        var canvas = visualizer.canvas;
        var ctx = canvas.getContext("2d");
        var dataArray = visualizer.dataArray;

        var width = canvas.width;
        var height = canvas.height;

        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        this.rotation += this.rotationSpeed;
        if(!this.broken){
            if(this.timeUntilNextState <= 0){
                this.broken = true;
                this.growing = true;
                this.growth = 0;
                this.timeUntilNextState = (60 * 10) + (60 * (Math.random() * 10));
                // Generate a broken circle
                var angleRemaining = 360;
                while(angleRemaining > 0){
                    var newSegment = new Segment(angleRemaining, this.size);
                    angleRemaining -= newSegment.angleSize;
                    this.segments.push(newSegment);
                }
            }
            else{
                this.timeUntilNextState--;
            }
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, this.size, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            for(var i = 0; i < visualizer.analyzerNode.frequencyBinCount; i++){
                ctx.lineWidth = 2;
                var x1, x2, y1, y2;
                var currentAngle = 180 * (i / visualizer.analyzerNode.frequencyBinCount);
                x1 = (width / 2) + this.size * Math.cos(rad(currentAngle - 90 + this.rotation));
                x2 = (width / 2) + (this.size + dataArray[i]) * Math.cos(rad(currentAngle - 90 + this.rotation));
                y1 = (height / 2) + this.size * Math.sin(rad(currentAngle - 90 + this.rotation));
                y2 = (height / 2) + (this.size + dataArray[i]) * Math.sin(rad(currentAngle - 90 + this.rotation));
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.closePath();
                // Mirror it
                var currentAngle = 180 * (i / visualizer.analyzerNode.frequencyBinCount) + 180;
                x1 = (width / 2) + this.size * Math.cos(rad(currentAngle - 90 + this.rotation));
                x2 = (width / 2) + (this.size + dataArray[i]) * Math.cos(rad(currentAngle - 90 + this.rotation));
                y1 = (height / 2) + this.size * Math.sin(rad(currentAngle - 90 + this.rotation));
                y2 = (height / 2) + (this.size + dataArray[i]) * Math.sin(rad(currentAngle - 90 + this.rotation));
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.closePath();
            }
        }
        else{
            if(this.growing){
                this.growth += this.growthRate;
                if(this.growth >= 1){
                    this.growing = false;
                }
            }
            else if(this.shrinking){
                this.growth -= this.growthRate;
                if(this.growth <= 0){
                    this.shrinking = false;
                    this.broken = false;
                    this.timeUntilNextState = (60 * 10) + (60 * (Math.random() * 10));
                    this.segments = [];
                }
            }
            else{
                if(this.timeUntilNextState <= 0){
                    this.shrinking = true;
                }
            }
            var angle = -90;
            for(var i = 0; i < this.segments.length; i++){
                ctx.strokeStyle = "white";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, this.size + (this.segments[i].r * this.growth), rad(angle + this.rotation), 
                    rad(angle + this.segments[i].angleSize + this.rotation));
                    angle += this.segments[i].angleSize;
                ctx.stroke();
                ctx.closePath();
            }
            var dataArrayIndex = 0;
            var startAngle = 0;
            for(var i = 0; i < this.segments.length; i++){
                var segment = this.segments[i];
                var angleIsCurrent = true;
                while(angleIsCurrent){
                    var currentAngle = 180 * (dataArrayIndex / visualizer.analyzerNode.frequencyBinCount);

                    angleIsCurrent = currentAngle < startAngle + segment.angleSize;
                    if(!angleIsCurrent){
                        continue;
                    }

                    var x1, x2, y1, y2;
                    var r = this.size + (segment.r * this.growth);
                    var data = dataArray[Math.round(visualizer.analyzerNode.frequencyBinCount * ((currentAngle % 180) / 180))];
                    x1 = (width / 2) + r * Math.cos(rad(currentAngle - 90 + this.rotation));
                    x2 = (width / 2) + (r + data) * Math.cos(rad(currentAngle - 90 + this.rotation));
                    y1 = (height / 2) + r * Math.sin(rad(currentAngle - 90 + this.rotation));
                    y2 = (height / 2) + (r + data) * Math.sin(rad(currentAngle - 90 + this.rotation));
                    
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "white";
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                    ctx.closePath();

                    dataArrayIndex++;
                }
                startAngle += segment.angleSize;
            }
            this.timeUntilNextState--;
        }
    }
}

function rad(deg){
    return (Math.PI / 180) * deg;
}

function Segment(angleRemaining, size){
    if(angleRemaining <= 30){
        this.angleSize = angleRemaining;
    }
    else{
        this.angleSize = 40 + (Math.random() * 40);
        if(this.angleSize >= angleRemaining){
            this.angleSize -= (this.angleSize - angleRemaining);
        }
    }
    this.r = Math.random() * size;
}