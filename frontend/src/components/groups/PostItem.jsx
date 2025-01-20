import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const PostItem = ({ post, user, group, handleEditPost, deletePost }) => {
  return (
    <div className="post-item bg-white rounded-md shadow-md border border-gray-200">
      <p className="bg-gray-100 mx-3 text-gray-800 my-5 rounded-md">
        {post.content}
      </p>

      <div className="flex bg-gray-200 justify-between gap-2 mt-2 p-2">
        <div className="flex flex-col ">
          <div className="flex items-center mt-2">
            <motion.div
              className="relative rounded-full overflow-hidden shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              {post.User.photo ? (
                <Avatar
                  src={post.User.photo}
                  alt="Profile Photo"
                  sx={{ width: 20, height: 20 }}
                />
              ) : (
                <AccountCircleIcon className="w-10 h-10" />
              )}
            </motion.div>
            <p className="ml-2 flex justify-end text-sm font-bold text-gray-700">
              {post.User.name}
            </p>
          </div>
          <div className="text-xs text-gray-500 pt-1">
            <span>
              {post.createdAt !== post.updatedAt ? (
                <>
                  {new Date(post.updatedAt).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                  <span className="ml-1 text-xs text-gray-400">(editado)</span>
                </>
              ) : (
                new Date(post.createdAt).toLocaleString("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              )}
            </span>
          </div>
        </div>

        <div className="flex items-end mt-4">
          {user && (post.userId === user.id || group.userId === user.id) && (
            <>
              <Button onClick={() => handleEditPost(post)} color="inherit">
                Editar
              </Button>
              <Button onClick={() => deletePost(post.id)} color="inherit">
                Eliminar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItem;