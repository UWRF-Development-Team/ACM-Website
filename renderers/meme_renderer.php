<h1 id="title"></h1>
<video hidden id="meme-video" autoplay loop muted>
    <source src="" type="video/mp4">
</video>
<img hidden id="meme-image" src="" alt="Epic Meme">
<script>
    String.prototype.replaceAt = function (index, char) {
        return this.substr(0, index) + char + this.substr(index + char.length);
    }
    let restrictedWords;
    $.getJSON("config/swears.json", data => {
        restrictedWords = data;
    });

    function censorSwears(string) {
        let i = 0;
        while (i < restrictedWords.length) {
            const word = restrictedWords[i];
            let index = ((string.toLowerCase()).indexOf(word));
            if (index > -1) {
                string = string.replaceAt(index, Array(word.length + 1).join('*'));
            } else i++;
        }
        return string;
    }

    $.getJSON("https://www.reddit.com/r/programmerhumor/top.json?limit=10&t=day", data => {
        let i = 0;
        while (JSON.stringify(data.data.children[i]).toLowerCase().includes("nsfw")) i++;
        // while(!data.data.children[i].data.is_video) i++;

        document.getElementById("title").innerHTML = censorSwears(data.data.children[i].data.title);
        const img = document.getElementById("meme-image");
        const video = document.getElementById("meme-video")

        if (data.data.children[i].data.is_video) {
            video.pause();
            video.hidden = false;
            img.hidden = true;
            video.firstElementChild.src = data.data.children[i].data.secure_media.reddit_video.fallback_url;
            video.load();
            video.play();
        } else {
            video.pause();
            img.hidden = false;
            video.hidden = true;
            img.src = data.data.children[i].data.url;
        }
    });
</script>