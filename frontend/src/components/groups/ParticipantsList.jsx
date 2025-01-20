import React from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ParticipantsList = ({ participants, handleOpenParticipantModal }) => {
  return (
    <div className="flex flex-col gap-4">
      {participants?.map((participant) => (
        <div key={participant.id} className="flex flex-col items-center">
          <motion.div
            className="relative rounded-full overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleOpenParticipantModal(participant)}
          >
            {participant.photo ? (
              <Avatar
                src={participant.photo}
                alt="Profile Photo"
                className="h-full w-full"
                sx={{ width: 20, height: 20 }}
              />
            ) : (
              <AccountCircleIcon className="w-full h-full" />
            )}
          </motion.div>
          <p className="text-xs font-bold text-gray-700">{participant.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ParticipantsList;