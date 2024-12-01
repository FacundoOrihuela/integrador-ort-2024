import Membership from '../models/Membership.js';

const getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.findAll();
        res.json({ message: 'Lista de membresías', data: memberships });
    } catch (error) {
        console.error('Error al obtener las membresías:', error);
        res.status(500).json({ message: 'Error al obtener las membresías', error: error.message });
    }
};

const getMembershipById = async (req, res) => {
    const { id } = req.params;
    try {
        const membership = await Membership.findByPk(id);
        if (!membership) {
            return res.status(404).json({ message: `Membresía con ID ${id} no encontrada` });
        }
        res.json({ message: 'Membresía encontrada', data: membership });
    } catch (error) {
        console.error('Error al obtener la membresía:', error);
        res.status(500).json({ message: 'Error al obtener la membresía', error: error.message });
    }
};

const createMembership = async (req, res) => {
    const { name, description, price, duration } = req.body;
    try {
        const membership = await Membership.create({ name, description, price, duration });
        res.json({ message: 'Membresía creada con éxito', data: membership });
    } catch (error) {
        console.error('Error al crear la membresía:', error);
        res.status(500).json({ message: 'Error al crear la membresía', error: error.message });
    }
};

const updateMembership = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;
    try {
        const [updated] = await Membership.update({ name, description, price, duration }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ message: `Membresía con ID ${id} no encontrada` });
        }
        res.json({ message: 'Membresía actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la membresía:', error);
        res.status(500).json({ message: 'Error al actualizar la membresía', error: error.message });
    }
};

const deleteMembership = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Membership.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: `Membresía con ID ${id} no encontrada` });
        }
        res.json({ message: 'Membresía eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la membresía:', error);
        res.status(500).json({ message: 'Error al eliminar la membresía', error: error.message });
    }
};

export { getMemberships, getMembershipById, createMembership, updateMembership, deleteMembership };