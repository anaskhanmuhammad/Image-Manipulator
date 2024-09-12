const file = document.getElementById("imagefile");
const canva = document.getElementById("canvas");
const canvasctx = canva.getContext("2d");
const brightness = document.getElementById('brightness');
const saturation = document.getElementById("saturation");
const blurr = document.getElementById("blur");
const cropx = document.getElementById("crop-x");
const cropy = document.getElementById("crop-y");
const flip = document.getElementById("flip-right");
const nname = document.getElementById("name");
const position_text_x = document.getElementById("position_text_x");
const position_text_y = document.getElementById("position_text_y");
const fontsize = document.getElementById("font");
const fontfamily = document.getElementById("ffamily");
const fontcolor = document.getElementById("color");



// console.log(brightness.value)
const data = {};
let image = null;
var w = 0;
var h = 0;
var r = 0;
var isflip = 0;
var angle = 0;
var ftype = "";
var fsize = 0;
var ffont = "";
var t = "";
var tx = 10;
var ty = 10;
var i = null;
var fcolour = "red";

function reset() 
{
    isflip = 0;
    w = 0;
    h = 0;
    data.bright = "100";
    data.sat = "100";
    data.blr = "0"; 

    brightness.value = data.bright;

    saturation.value = data.sat;
    blurr.value = data.blr;
}




function update(a, b) 
{
    data[a] = b;
    render();
}


function filtergenerate() 
{
    const {bright, sat, blr} = data;
    console.log("ssssssssssssssssss")
    return `brightness(${bright}%) saturate(${sat}%) blur(${blr}px) contrast(100%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) sepia(0%)`
}

function crop() 
{
    w = cropx.value;
    h = cropy.value;
    render();
}

function rotat() 
{
    angle = angle+90;
    
    isflip = 1;
    if (angle == 360) 
    {
        angle = 0;
        isflip = 0;
    }
    r = angle * Math.PI / 180;
    render();
}


// function cleartext()
// {
//     t = "";
//     text();
//     // render()
// }


function text()
{ 

    console.log("here")

    // cleartext();
    fcolour = fontcolor.value ;

    ftype = fontfamily.value;
    fsize =  fontsize.value;
    ffont = `${fsize}px ${ftype}`;
    t = nname.value;
    tx = position_text_x.value;
    ty = position_text_y.value;
    // canvasctx.font = ffont;
    position_text_x.max = i.width; 
    position_text_y.max = i.height; 

    




    // canvasctx.fillText(t,position_text_x.value, position_text_y.value);

   

    
    render();
}


function render() 
{

    // canva.width = i.width;
    // canva.height  = i.height;
    // canvasctx.filter = filtergenerate();


    if (isflip!=0) 
    {
        if (angle == 90  ) 
        {
            w = i.height
            canva.width = i.height;
            canva.height  = i.width;
            canvasctx.translate(w, 0)
            canvasctx.rotate(r);
            canvasctx.filter = filtergenerate();
            canvasctx.drawImage(i, 0, 0);
            isflip = 0;

        }
        if (angle == 180 ) 
        {
            w = i.width;
            h = i.height;
            canva.width = i.width;
            canva.height  = i.height;
            canvasctx.translate(w, h)
            canvasctx.rotate(r);
            canvasctx.filter = filtergenerate();
            canvasctx.drawImage(i, 0, 0);
            isflip = 0;
        }
        if (angle == 270 ) 
        {
            h = i.width
            canva.width = i.height;
            canva.height  = i.width;
            canvasctx.translate(0, h)
            canvasctx.rotate(r);
            canvasctx.filter = filtergenerate();
            canvasctx.drawImage(i, 0, 0);
            isflip = 0;
        }

        // canvasctx.translate(300, 0)

    }
    if (angle == 0) 
    {
        canva.width = i.width;
        canva.height  = i.height;
        w = 0;
        h = 0;


        canvasctx.filter = filtergenerate();


        canvasctx.font = ffont;
        canvasctx.fillStyle = fcolour;


        canvasctx.translate(w, h);
        canvasctx.rotate(r);
        canvasctx.drawImage(i, 0, 0);
        canvasctx.lineWidth = 5;
        canvasctx.rect(0, 0, 100, 80);
        canvasctx.stroke();
        canvasctx.fillText(t, tx, ty);

    }


}


brightness.addEventListener("change", ()=>update("bright", brightness.value));
saturation.addEventListener("change", ()=>update("sat", saturation.value));
blurr.addEventListener("change", ()=>update("blr", blurr.value));
cropx.addEventListener("change", ()=>crop())
cropy.addEventListener("change", ()=>crop())
flip.addEventListener("change", ()=>rotat())
position_text_x.addEventListener("change",() => text() )
position_text_y.addEventListener("change",() => text() )
fontsize.addEventListener("change",() => text())



file.addEventListener("change", ()=>
{
    i = new Image();

    i.addEventListener("load", ()=>{
        reset();
        render();
    })
    // text();
    i.src = URL.createObjectURL(file.files[0]);
    console.log(URL.createObjectURL(file.files[0]))
})





