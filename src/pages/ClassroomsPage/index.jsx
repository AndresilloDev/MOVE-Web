import { useState, useEffect } from "react";
import CardsTable from "../../components/layout/CardsTable";
import axios from "axios";

const ClassroomsPage = ({ buildingId }) => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await axios.get(`/api/buildings/${buildingId}/classrooms`);
                setClassrooms(response.data);
            } catch (error) {
                console.error("Error fetching classrooms:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClassrooms();
    }, [buildingId]);

    const handleAdd = async (newClassroom) => {
        try {
            const response = await axios.post(`/api/classrooms`, newClassroom);
            setClassrooms([...classrooms, response.data]);
        } catch (error) {
            console.error("Error adding classroom:", error);
        }
    };

    const handleEdit = async (id, updatedClassroom) => {
        try {
            await axios.put(`/api/classrooms/${id}`, updatedClassroom);
            setClassrooms(classrooms.map(cls => cls.id === id ? updatedClassroom : cls));
        } catch (error) {
            console.error("Error updating classroom:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/classrooms/${id}`);
            setClassrooms(classrooms.filter(cls => cls.id !== id));
        } catch (error) {
            console.error("Error deleting classroom:", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Aulas en el edificio</h2>
            {loading ? (
                <p>Cargando aulas...</p>
            ) : (
                <CardsTable 
                    items={classrooms} 
                    onAdd={handleAdd} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            )}
        </div>
    );
};

export default ClassroomsPage;