import React from 'react';
import { Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConfigGroupModal = ({
  open,
  handleClose,
  setOpenModal,
  setEditGroupModalOpen
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex justify-center items-center h-full bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96 relative">
          <CloseIcon
            onClick={handleClose}
            className="absolute top-2 right-2 cursor-pointer text-black"
            style={{ fontSize: 30 }}
          />
          <h3 className="text-xl font-semibold mb-4">Configurar grupo</h3>
          <div className="flex flex-col gap-4">
            <Button variant="outlined" color="primary" onClick={() => setOpenModal(true)}>
              Añadir participantes
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setEditGroupModalOpen(true)}>
              Editar grupo
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfigGroupModal;