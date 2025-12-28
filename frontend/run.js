const runcrack = document.getElementById("iconclick");

runcrack.addEventListener("click",()=>{
    const tracker = document.getElementById("track");
    const trackervalue = tracker.value.trim();
    console.log(trackervalue);
    tracker.value="";
})