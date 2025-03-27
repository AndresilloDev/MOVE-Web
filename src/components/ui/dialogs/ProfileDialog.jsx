import { useContext, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { updateUser } from '../../../api/users.api';

export const ProfileDialog = ({ setOpenProfileDialog }) => {
    const { user } = useContext(AuthContext);
    
    const [name, setName] = useState(user?.name || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    
    const { updateProfile } = useContext(AuthContext);

    const nameRef = useRef();
    const lastNameRef = useRef();

    useEffect(() => {
        setName(user?.name || "");
        setLastName(user?.lastName || "");
    }, [user]);

    const handleEdit = async () => {
        try {
            const updatedUser = await updateUser({ name, lastName });
            await updateProfile(updatedUser);
            setOpenProfileDialog(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                    <h2 className="text-2xl font-bold mb-4">Detalles del perfil</h2>

                    <div className="mb-4">
                        <p className="text-md text-gray-500 mb-3">Correo electrónico: {user.user}</p>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            ref={nameRef}
                            className="w-full p-2 border border-gray-200 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="lastName">Apellido</label>
                        <input
                            type="text"
                            id="lastName"
                            ref={lastNameRef}
                            className="w-full p-2 border border-gray-200 rounded"
                            value={lastName}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-full mt-4 cursor-pointer bg-action-primary rounded-lg p-1"
                            onClick={handleEdit}
                        >
                            Editar perfil
                        </button>
                    </div>

                    <button
                        onClick={() => setOpenProfileDialog(false)}
                        className="absolute top-2 right-2 cursor-pointer"
                    >
                        <X />
                    </button>
                </div>
            </div>
        </div>
    );
};
