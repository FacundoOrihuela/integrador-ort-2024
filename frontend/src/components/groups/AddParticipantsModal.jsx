import React from 'react';
import { Modal, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const AddParticipantsModal = ({
  open,
  handleClose,
  allUsers,
  participants,
  selectedUsers,
  handleSelectChange,
  handleRemoveUser,
  handleAddParticipants
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

          <h3 className="text-xl font-semibold mb-4">Selecciona los participantes</h3>
          <FormControl fullWidth>
            <InputLabel id="select-participants-label">
              {allUsers.filter(user => !participants.some(p => p.id === user.id)).length > 0
                ? "Participantes"
                : "No hay usuarios para seleccionar"}
            </InputLabel>
            <Select
              labelId="select-participants-label"
              multiple
              value={selectedUsers?.map(user => user.id)}
              onChange={handleSelectChange}
              disabled={false}
            >
              {allUsers.filter(user => !participants.some(participant => participant.id === user.id)).length > 0 ? (
                allUsers
                  .filter(user => !participants.some(participant => participant.id === user.id))
                  .map(user => (
                    <MenuItem
                      key={user.id}
                      value={user.id}
                      disabled={selectedUsers.some(u => u.id === user.id)}
                    >
                      {user.name}
                    </MenuItem>
                  ))
              ) : (
                <MenuItem disabled>No hay usuarios para seleccionar</MenuItem>
              )}
            </Select>
          </FormControl>
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Usuarios seleccionados</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {selectedUsers?.map(user => (
                <li key={user.id} className="flex justify-between items-center">
                  <span>{user.name}</span>
                  <DeleteIcon className="cursor-pointer text-red-500" onClick={() => handleRemoveUser(user.id)} />
                </li>
              ))}
            </ul>
            <Button variant="contained" color="primary" onClick={handleAddParticipants} className="mt-4">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddParticipantsModal;