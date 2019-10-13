/* Play the selected music track. */
(function() {
    var i, j, musicAnchor = document.getElementsByClassName("music-anchor");

    for (i = 0; i < musicAnchor.length; i++) {musicAnchor[i].addEventListener("click", 
        function(event) { 
            var sourceMp3, sourceOgg, 
                audioEl = event.target.parentElement.parentElement.previousElementSibling,
                audios = document.getElementsByTagName("audio");

            for (j = 0; audios.length; j++) {
                if (audios[j] != audioEl) {
                    audios[j].pause();
                } else {
                    sourceMp3 = audios[j].getElementsByClassName("mp3-src")[0];
                    sourceOgg = audios[j].getElementsByClassName("ogg-src")[0];
                    sourceMp3.src = "audio//" + event.target.id + ".mp3";  
                    sourceOgg.src = "audio//" + event.target.id + ".ogg";  
                    audios[j].load(); audios[j].play(); 
                }
            }
        });
    }
})();
