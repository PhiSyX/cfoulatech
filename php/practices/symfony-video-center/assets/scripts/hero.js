export class HeroVideo {
    #videoPlayState = false;

    // ------- //
    // Méthode // -> Publique
    // ------- //

    start() {
        let $btn = document.querySelector(".js-launch-video-btn");
        $btn?.addEventListener("click", this.#launchVideoPlayer);
    }

    // ------- //
    // Méthode // -> Privée
    // ------- //

    #launchVideoPlayer = () => {
        /**
         * @type {HTMLDivElement|null}
         */
        let $hero = document.querySelector(".js-hero");

        if ($hero) {
            $hero.style.display = "none";
        }

        /**
         * @type {HTMLIFrameElement|null}
         */
        let $iframe = document.querySelector(".js-yt-player");
        if (!$iframe) {
            return;
        }

        $iframe.contentWindow?.postMessage(
            JSON.stringify({
                event: "command",
                func: "playVideo",
                args: "",
            }),
            "*"
        );

        $iframe.removeAttribute("hidden");
        document.querySelector(".js-launch-video-btn")?.setAttribute("hidden", "");
    };
}
