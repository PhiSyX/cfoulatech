import React, {useMemo, useState} from 'react';
import ParagraphEditable from "./ParagraphEditable.jsx";

/**
 * @typedef {{ lastname: string; firstname: string; email: string; isVerified: boolean }} User
 * @typedef {{ action: string; submit: string; prefixName: string }} Form
 * @typedef {{ form: Form; user: User }} Props
 * @param {Props} props
 * @constructor
 */
export default function AboutDetailsForm({form, user}) {
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
                À propos de moi
                {isDirty &&
                    <button
                        form="details"
                        type="submit"
                        className="btn btn-primary small float-right"
                    >
                        {form.submit}
                    </button>
                }
            </h1>

            <form id="details" action={form.action} method="post">
                <div>
                    <p>Nom</p>
                    <p>
                        <ParagraphEditable
                            name={`${form.prefixName}[lastname]`}
                            text={dirtyUser.lastname}
                            onChange={whenLastnameChange}
                        />
                    </p>
                </div>

                <div>
                    <p>Prénom</p>
                    <p>
                        <ParagraphEditable
                            name={`${form.prefixName}[firstname]`}
                            text={dirtyUser.firstname}
                            onChange={whenFirstnameChange}
                        />
                    </p>
                </div>

                <div>
                    <p>Adresse mail</p>
                    <p>{user.email}</p>
                </div>

                <div>
                    <p>Compte Vérifié ?</p>
                    <p>
                        {user.isVerified ? 'Oui' : 'Non'}
                    </p>
                </div>
            </form>
        </>
    );
}
