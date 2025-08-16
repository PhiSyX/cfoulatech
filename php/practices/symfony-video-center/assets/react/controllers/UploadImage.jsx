import React, {useMemo, useRef, useState} from 'react';

/**
 * @param {{src: string; title: {avatar: string; delete: string; upload: string}}} props
 */
export default function UploadImage({src, title}) {
    const [source, setSource] = useState(src);
    const isDefaultSrc = useMemo(() => source.indexOf("default-avatar.png") >= 0, [source]);
    const isDownloadable = useMemo(() => source.indexOf("blob:") >= 0, [source])
    const uploadRef = useRef(null);

    const onClickHandler = (evt) => uploadRef.current.click();

    const onUploadHandler = (evt) => {
        let target = evt.currentTarget;

        if (!target.validity.valid) {
            return;
        }

        let file = target.files?.item(0);
        if (!file || !file.type.match("image/*")) {
            return;
        }

        setSource(URL.createObjectURL(file));
    }

    return (
        <>
            <div className="upload-image">
                {!isDefaultSrc &&
                    <form method="post" className="left">
                        <input
                            type="hidden"
                            name="change_user_avatar[imageFile][delete]"
                            value="1"
                        />

                        <button type="submit" title={title.delete}>
                            <svg width="16" height="16" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g fill="none">
                                    <path
                                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                                    <path fill="currentColor"
                                          d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07L4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"/>
                                </g>
                            </svg>
                        </button>
                    </form>
                }

                <img
                    src={source}
                    alt="Image"
                    title={title.avatar}
                    onClick={onClickHandler}
                />

                <form method="post" className="right"
                      encType="multipart/form-data">
                    {isDownloadable &&
                        <button type="submit" title={title.upload}>
                            <svg width="15" height="15" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                    <path
                                        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                                    <path fill="currentColor"
                                          d="M11.5 4C8.851 4 6.739 6.38 7.027 9a1.01 1.01 0 0 1-.758 1.09A3.002 3.002 0 0 0 7 16h1a1 1 0 1 1 0 2H7a5 5 0 0 1-2-9.584a6.5 6.5 0 0 1 12.586-2.204A6.002 6.002 0 0 1 16 18a1 1 0 1 1 0-2a4 4 0 0 0 .655-7.947a1.01 1.01 0 0 1-.81-.732A4.5 4.5 0 0 0 11.5 4m1.5 8.416l1.293 1.292a1 1 0 0 0 1.414-1.416l-2.824-2.819a1.25 1.25 0 0 0-1.766 0l-2.824 2.82a1 1 0 0 0 1.414 1.415L11 12.416V21a1 1 0 1 0 2 0z"/>
                                </g>
                            </svg>
                        </button>
                    }

                    <div className="vich-image">
                        <input
                            ref={uploadRef}
                            type="file"
                            name="change_user_avatar[imageFile][file]"
                            accept="image/*"
                            onChange={onUploadHandler}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
