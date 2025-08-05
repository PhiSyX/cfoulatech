import React, {useEffect, useMemo, useState} from 'react';

/**
 * @param {{video?: string}} props
 */
export default function VideoTube(props) {
    const {video} = props;

    const [videoYT, setVideoYT] = useState(video);

    const thumbnail = useMemo(
        () => `https://i.ytimg.com/vi_webp/${videoYT}/maxresdefault.webp`,
        [videoYT],
    );

    useEffect(() => {
        if (!videoYT) return;
        document.body.style.setProperty('--hero-figure', `url(${thumbnail})`);
    }, [videoYT]);

    const handleChange = (evt) => {
        const value = evt.target.value
            .replace('https://www.youtube.com/watch?v=', '')
            .replace('https://www.youtube.com/embed/', '');
        console.log({value});
        setVideoYT(value);
    };

    return (
        <>
            <label htmlFor="video_videoYTID" className="required">
                Vidéo YouTube
            </label>
            <input type="text" id="video_videoYTID"
                   name="video[videoYTID]"
                   required
                   defaultValue={videoYT}
                   onChange={handleChange}
            />
        </>
    );
}
