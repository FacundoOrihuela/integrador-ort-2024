import React from 'react';
import { Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ParticipantModal = ({
  open,
  handleClose,
  selectedParticipant,
  group,
  user,
  handleRemoveParticipant
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
          {selectedParticipant && (
            <>
              <div className="flex flex-col gap-4">
                <h2>Opciones para {selectedParticipant.name}</h2>
                {group.userId !== selectedParticipant.id && user.id === group.userId && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleRemoveParticipant}
                  >
                    Eliminar usuario del grupo
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  href={`/profile/${selectedParticipant.id}`}
                >
                  Ir al perfil
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ParticipantModal;