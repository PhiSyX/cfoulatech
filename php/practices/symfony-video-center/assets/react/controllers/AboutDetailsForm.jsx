import React, {useMemo, useState} from 'react';
import ParagraphEditable from "./ParagraphEditable.jsx";

/**
 * @typedef {{ lastname: string; firstname: string; email: string; isVerified: string }} Label
 * @typedef {{ lastname: string; firstname: string; email: string; isVerified: boolean }} User
 * @typedef {{ action: string; submit: string; prefixName: string }} Form
 * @typedef {{ title: string; label: Label, form: Form; user: User; dblclick_title?: string; }} Props
 * @param {Props} props
 * @constructor
 */
export default function AboutDetailsForm({title, label, form, user, dblclick_title}) {
    const [dirtyUser, setDirtyUser] = useState(user);

    const whenLastnameChange = (lastname) => setDirtyUser(u => ({
        ...u,
        lastname
    }));
    const whenFirstnameChange = (firstname) => setDirtyUser(u => ({
        ...u,
        firstname
    }));

    const isDirty = useMemo(() =>
            user.lastname !== dirtyUser.lastname ||
            user.firstname !== dirtyUser.firstname ||
            user.email !== dirtyUser.email,
        [user, dirtyUser]
    );

    return (
        <>
            <h1>
                {title}

                {isDirty &&
                    <button
                        form="details"
                        type="submit"
                        className="btn btn-primary small float-right"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M16 4.99998L19 7.99998M20.385 6.58499C20.7788 6.19114 21.0001 5.65697 21.0001 5.09998C21.0001 4.543 20.7788 4.00883 20.385 3.61498C19.9912 3.22114 19.457 2.99988 18.9 2.99988C18.343 2.99988 17.8088 3.22114 17.415 3.61498L9 12V15H12L20.385 6.58499Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        {form.submit}
                    </button>
                }
            </h1>

            <form id="details" action={form.action} method="post">
                <div>
                    <p>{label.lastname}</p>
                    <p>
                        <ParagraphEditable
                            name={`${form.prefixName}[lastname]`}
                            text={dirtyUser.lastname}
                            onChange={whenLastnameChange}
                            title={dblclick_title}
                        />
                    </p>
                </div>

                <div>
                    <p>{label.firstname}</p>
                    <p>
                        <ParagraphEditable
                            name={`${form.prefixName}[firstname]`}
                            text={dirtyUser.firstname}
                            onChange={whenFirstnameChange}
                            title={dblclick_title}
                        />
                    </p>
                </div>

                <div>
                    <p>{label.email}</p>
                    <p>{user.email}</p>
                </div>

                <div>
                    <p>{label.isVerified}</p>
                    <p>
                        {user.isVerified ? 'Oui' : 'Non'}
                    </p>
                </div>
            </form>
        </>
    );
}
