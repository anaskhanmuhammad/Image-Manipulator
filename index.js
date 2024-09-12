const file = document.getElementById("imagefile");
const canva = document.getElementById("canvas");
const canvasctx = canva.getContext("2d");

const brightness = document.getElementById('brightness');
const saturation = document.getElementById("saturation");
const blurr = document.getElementById("blur");
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById("grayscale");
const Hue = document.getElementById("Hue");
const invert = document.getElementById('invert');
const opacity = document.getElementById("opacity");
const sepia = document.getElementById("sepia");


const cropx = document.getElementById("crop-x");
const cropy = document.getElementById("crop-y");
const flip = document.getElementById("flip-right");


const img = document.getElementById("img");



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
var bd = 0;




function reset() 
{
    isflip = 0;
    w = 0;
    h = 0;
    data.bright = "100";
    data.sat = "100";
    data.blr = "0"; 

    data.cnt = "100";
    data.grs = "0";
    data.hue = "0"; 

    data.invt= "0";
    data.opct= "100";
    data.sp = "0"; 



    
    brightness.value = data.bright;
    saturation.value = data.sat;
    blurr.value = data.blr;

    contrast.value = data.cnt;
    grayscale.value = data.grs;
    Hue.value = data.hue;

    invert.value = data.invt;
    opacity.value = data.opct;
    sepia.value = data.sp;



    render();
}




function update(a, b) 
{
    data[a] = b;
    render();
}


function filtergenerate() 
{
    const {bright, sat, blr, cnt, grs, hue, invt, opct, sp} = data;
    console.log("ssssssssssssssssss")
    return `brightness(${bright}%) saturate(${sat}%) blur(${blr}px) contrast(${cnt}%) grayscale(${grs}%) hue-rotate(${hue}deg) invert(${invt}%) opacity(${opct}%) sepia(${sp}%)`
}

function crop() 
{

    // i.width = cropx.value;
    // i.height = cropy.value;
    // render();
}



function rotat() 
{
    angle = angle+90;
    
    isflip = 1;
    if (angle == 360) 
    {
        angle = 0;
        // isflip = 0;
    }
    r = angle * Math.PI / 180;
    render();
}



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



function set_bd() 
{
    bd = cropx.value;
    render();
}




function render() 
{
    // img.width = canva.width
    // img.height = canva.height
    // i.width = "500";
    // i.height  = "500";

    img.width = i.width;
    img.height  = i.height;
    console.log(img);



    canva.width = i.width;
    canva.height  = i.height;

    canvasctx.filter = filtergenerate();


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
            canvasctx.font = ffont;
            canvasctx.fillStyle = fcolour;
            canvasctx.fillText(t, tx, ty);
            canvasctx.lineWidth = bd;
            canvasctx.rect(0, 0, i.width, i.height);
            canvasctx.stroke();
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
            canvasctx.font = ffont;
            canvasctx.fillStyle = fcolour;
            canvasctx.fillText(t, tx, ty);
            canvasctx.lineWidth = bd;
            canvasctx.rect(0, 0, i.width, i.height);
            canvasctx.stroke();
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
            canvasctx.fillStyle = fcolour;
            canvasctx.font = ffont;
            canvasctx.fillText(t, tx, ty);
            canvasctx.lineWidth = bd;
            canvasctx.rect(0, 0, i.width, i.height);
            canvasctx.stroke();
            isflip = 0;
        }
        // if (angle == 0) 
        // {
        //     canva.width = i.width;
        //     canva.height  = i.height;
        //     w = 0;
        //     h = 0;
    
    
        //     canvasctx.filter = filtergenerate();
    
    
        //     canvasctx.font = ffont;
        //     canvasctx.fillStyle = fcolour;
    
    
    
        //     canvasctx.translate(w, h);
        //     canvasctx.rotate(r);
        //     canvasctx.drawImage(i, 0, 0);
        //     canvasctx.fillText(t, tx, ty);
        // }
        // canvasctx.translate(300, 0)


    }
    if (angle == 0) 
    {
        canva.width = i.width;
        canva.height  = i.height;
        w = 0;
        h = 0;
        console.log(canva)

        canvasctx.filter = filtergenerate();


        canvasctx.fillStyle = fcolour;
        
        canva.style.border = "solid black 0px";
        
        canvasctx.translate(w, h);
        canvasctx.rotate(r);
        canvasctx.drawImage(i, 0, 0);
        canvasctx.lineWidth = bd;
        // canvasctx.lineCo = bd;
        canvasctx.rect(0, 0, i.width, i.height);
        canvasctx.stroke();
        canvasctx.font = ffont;
        canvasctx.fillText(t, tx, ty);

    }



}


brightness.addEventListener("change", ()=>update("bright", brightness.value));
saturation.addEventListener("change", ()=>update("sat", saturation.value));
blurr.addEventListener("change", ()=>update("blr", blurr.value));

contrast.addEventListener("change", ()=>update("cnt", contrast.value));
grayscale.addEventListener("change", ()=>update("grs", grayscale.value));
Hue.addEventListener("change", ()=>update("hue", Hue.value));

invert.addEventListener("change", ()=>update("invt", invert.value));
opacity.addEventListener("change", ()=>update("opct", opacity.value));
sepia.addEventListener("change", ()=>update("sp",sepia.value));






cropx.addEventListener("change", ()=>set_bd())
// cropy.addEventListener("change", ()=>crop())
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

    i.src = URL.createObjectURL(file.files[0]);
    console.log(URL.createObjectURL(file.files[0]))
})


function show1() 
{
    document.getElementById("toolbar1").style.display = "flex";    
    document.getElementById("toolbar1").style.width = "25%";    
    document.getElementById("inputfile").style.display = "flex";
    document.getElementById("resetbutton").style.display = "flex";
    document.getElementById("resetit").style.display = "flex"; 
    document.getElementById("downloadbutton").style.display = "flex";


    document.getElementById("toolbar").style.display = "none";    
    document.getElementById("tools1").style.display = "none"; 
    document.getElementById("tools2").style.display = "none";    
    document.getElementById("tools3").style.display = "none";  
    document.getElementById("textdiv").style.display = "none";    



    document.getElementById("cropdiv").style.display = "none";    

}


function show2() 
{
    document.getElementById("toolbar1").style.display = "none";    
    document.getElementById("inputfile").style.display = "none"; 
    document.getElementById("resetbutton").style.display = "none";
    document.getElementById("resetit").style.display = "none";



    document.getElementById("toolbar").style.display = "flex";       
    document.getElementById("toolbar").style.width = "25%";       
    document.getElementById("tools1").style.display = "inline";    
    document.getElementById("tools2").style.display = "inline";    
    document.getElementById("tools3").style.display = "inline";    
    document.getElementById("tools4").style.display = "inline";    
    document.getElementById("tools5").style.display = "inline";    
    document.getElementById("tools6").style.display = "inline";    
    document.getElementById("tools7").style.display = "inline";    
    document.getElementById("tools8").style.display = "inline";    
    document.getElementById("tools9").style.display = "inline";    


    document.getElementById("textdiv").style.display = "none";    

    document.getElementById("cropdiv").style.display = "none";    



}



function show3(params) 
{
    document.getElementById("toolbar1").style.display = "none";    
    document.getElementById("inputfile").style.display = "none";
    document.getElementById("resetbutton").style.display = "none";


    document.getElementById("toolbar").style.display = "none";    
    document.getElementById("tools1").style.display = "none"; 
    document.getElementById("tools2").style.display = "none";    
    document.getElementById("tools3").style.display = "none"; 


    document.getElementById("cropdiv").style.display = "none";    
 





    document.getElementById("textdiv").style.display = "flex";    
    document.getElementById("textdiv").style.width = "25%";   
    document.getElementById("div1").style.display = "inline";    
    document.getElementById("div2").style.display = "inline";    
    document.getElementById("div3").style.display = "inline";    
    document.getElementById("div4").style.display = "inline";    
    document.getElementById("div5").style.display = "inline";    
    document.getElementById("div6").style.display = "inline";    
    document.getElementById("div7").style.display = "inline";    
    // document.getElementById("div8").style.display = "inline";    
    // document.getElementById("div9").style.display = "inline";   
}



function show4(params) 
{
    document.getElementById("toolbar1").style.display = "none";    
    document.getElementById("inputfile").style.display = "none";
    document.getElementById("resetbutton").style.display = "none";


    document.getElementById("toolbar").style.display = "none";    
    document.getElementById("tools1").style.display = "none"; 
    document.getElementById("tools2").style.display = "none";    
    document.getElementById("tools3").style.display = "none"; 


    document.getElementById("textdiv").style.display = "none";    
    document.getElementById("textdiv").style.width = "none";    



    document.getElementById("cropdiv").style.display = "flex";    
    document.getElementById("cropdiv").style.width = "25%";  


    document.getElementById("crop").style.display = "inline";    
    document.getElementById("flip").style.display = "inline";  
}







