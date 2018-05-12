
/**
 * Draw the spiral for a specific ratio in a given html canvas.
 * Change the height of the canevas if the ratio is not respected.
 * @param ratio
 * @param canvas An html canvas
 */
function drawSpiral(ratio, canvas)
{
    var directionEnum = {
        RIGHT:  0,
        DOWN:   1,
        LEFT:   2,
        UP:     3
    };

    var MAX_WIDTH = canvas.width,
        MAX_HEIGHT = canvas.height;

    canvas.height = Math.round(canvas.width/ratio);

    var ctx = canvas.getContext('2d');

    // Drawing the frame
    ctx.beginPath();
    ctx.rect(0,0, canvas.width, canvas.height);
    ctx.stroke();

    // Preparing usefull data for drawing the spiral
    var direction = directionEnum.RIGHT;
    var top = 0, left = 0, width = canvas.width, height = canvas.width/ratio;
    var seq = getContinuedFractionSequence(ratio);

    // Drawing the spirale
    for(var i = 0; i < seq.length; i++)
    {
        var numberOfSquare = seq[i];
        if(numberOfSquare == -1) break;

        var size = Math.min(width, height);

        ctx.beginPath();
        ctx.strokeStyle ="#999";
        ctx.rect(left, top, width, height);
        ctx.stroke();

        switch(direction)
        {
            case directionEnum.RIGHT:
                ctx.beginPath();
                ctx.strokeStyle ="black";
                ctx.moveTo(left,top+height);
                if(numberOfSquare >= 1)
                    ctx.arcTo(left, top, left+size, top, size);
                left += size*numberOfSquare;
                width -= size*numberOfSquare;
                ctx.lineTo(left, top);
                ctx.stroke();
                break;

            case directionEnum.DOWN:
                ctx.beginPath();
                ctx.strokeStyle ="black";
                ctx.moveTo(left,top);
                if(numberOfSquare >= 1)
                    ctx.arcTo(left+size, top, left+size, top+size, size);
                top += size*numberOfSquare;
                height -= size*numberOfSquare;
                ctx.lineTo(left+size, top);
                ctx.stroke();
                break;

            case directionEnum.LEFT:
                ctx.beginPath();
                ctx.strokeStyle ="black";
                ctx.moveTo(left+width,top);
                if(numberOfSquare >= 1)
                    ctx.arcTo(left+width, top+size, left+width-size, top+size, size);
                width -= size*numberOfSquare;
                ctx.lineTo(left+width, top+size);
                ctx.stroke();
                break;

            case directionEnum.UP:
                ctx.beginPath();
                ctx.strokeStyle ="black";
                ctx.moveTo(left+width,top+height);
                if(numberOfSquare >= 1)
                    ctx.arcTo(left, top+height, left, top+height-size, size);
                height -= size*numberOfSquare;
                ctx.lineTo(left, top+height);
                ctx.stroke();
                break;
        }
        direction = (direction+1)%4;
    }
}

/**
 * Return the sequence of integer that represente the integer part of each fraction
 * in the continued fraction representation of the number. If the sequence is longer
 * than depth (possibly infinity), a -1 is push at the end;
 * @param number
 * @param depth The maximum length of the sequence
 */
function getContinuedFractionSequence(number, depth = 10)
{
    var seq = [];
    for(var i = 0; i < depth; i++)
    {
        seq.push(Math.floor(number));
        number -= Math.floor(number);

        if(Math.abs(number) < 1e-10) return seq;

        number = 1.0/number;
    }

    if(number != 0) seq.push(-1);

    return seq;
}
