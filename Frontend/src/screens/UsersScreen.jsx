import React, { useState } from "react";
import { FaHome, FaChevronRight, FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const UsersScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedUserId, setExpandedUserId] = useState(null);

    const users = [
        { id: 129340, username: "20233tn097@utez", name: "Sebastian", surname: "Jimenez" },
        { id: 129341, username: "20233tn098@utez", name: "Carlos", surname: "Hernandez" },
        { id: 129342, username: "20233tn099@utez", name: "Maria", surname: "Lopez" },
        { id: 129343, username: "20233tn098@utez", name: "Ronal", surname: "Dinho" },
        { id: 129344, username: "20233tn098@utez", name: "Cesar", surname: "Rin" },
        { id: 129345, username: "20233tn098@utez", name: "Erikiti", surname: "Rijillo" },
    ];

    const toggleExpand = (id) => {
        setExpandedUserId(expandedUserId === id ? null : id);
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
            <div className="m-4 ml-6 flex items-center">
                <FaHome className="mr-2" size={25} />
                <FaChevronRight className="mr-2" size={25} />
                <span className="text-xl">Administradores</span>
            </div>

            <div className="flex justify-center mt-2 py-2 px-1">
                <div className="flex items-center w-11/12 h-10 border border-black rounded-xl bg-white">
                    <input
                        type="text"
                        className="flex-1 h-full pl-3 outline-none"
                        placeholder="Buscar usuario..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-yellow-300 w-10 h-full flex items-center justify-center rounded-r-xl">
                        <FaSearch size={20} color="black" />
                    </button>
                </div>
            </div>

            <div className="flex justify-start px-4 mb-2 mt-2">
                <span className="font-bold text-lg w-2/5 text-left">ID</span>
                <span className="font-bold text-lg w-2/5 text-left">Usuario</span>
            </div>

            <ul className="mt-4">
                {users.map((user) => (
                    <li key={user.id} className="p-2 border-b border-gray-300">
                        <div className="flex justify-between items-center">
                            <span className="text-xl w-1/5 text-center">{user.id}</span>
                            <span className="text-xl w-3/5 text-center">{user.username}</span>
                            <button onClick={() => toggleExpand(user.id)}>
                                <span className="text-xl ml-2">{expandedUserId === user.id ? "▲" : "▼"}</span>
                            </button>
                        </div>
                        {expandedUserId === user.id && (
                            <div className="pt-2">
                                <p>{user.name} {user.surname}</p>
                                <div className="flex justify-end mt-2">
                                    <button className="ml-2 text-green-500">
                                        <FaEdit size={24} />
                                    </button>
                                    <button className="ml-2 text-red-500">
                                        <FaTrash size={24} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <button className="absolute bottom-5 right-5 bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                <FaPlus size={30} color="#000" />
            </button>
        </div>
    );
};

export default UsersScreen;
