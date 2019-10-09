/* Play the selected music track */
var i, audioEl, sourceMp3, sourceOgg,
    musicAnchor = document.getElementsByClassName("music-anchor");

for (i = 0; i < musicAnchor.length; i++) {musicAnchor[i].addEventListener("click", 
    function(event) { 
        audioEl = event.target.parentElement.parentElement.previousElementSibling;
        sourceMp3 = audioEl.getElementsByClassName("mp3-src")[0];
        sourceOgg = audioEl.getElementsByClassName("ogg-src")[0];
        sourceMp3.src = "audio//" + event.target.id + ".mp3";  
        sourceOgg.src = "audio//" + event.target.id + ".ogg";  
        audioEl.load(); audioEl.play(); 
    });
}
