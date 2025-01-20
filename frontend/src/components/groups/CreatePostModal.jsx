import React from 'react';
import { Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreatePostModal = ({
  open,
  handleClose,
  newPostContent,
  setNewPostContent,
  handleCreateOrUpdatePost,
  selectedPost
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
          <h3 className="text-xl font-semibold mb-4">{selectedPost ? "Editar post" : "Crear nuevo post"}</h3>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            rows="4"
            placeholder="Escribe aquí el contenido del post..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreateOrUpdatePost}>
              {selectedPost ? "Confirmar" : "Publicar"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;