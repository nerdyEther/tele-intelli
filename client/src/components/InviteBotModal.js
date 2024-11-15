import React, { useState } from 'react';

const InviteBotModal = ({ userId, onInvite, onClose }) => {
  const [groupId, setGroupId] = useState('');

  const handleInvite = () => {
    onInvite(groupId);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-lg font-bold mb-4">Invite Bot to Group</h2>
        <input
          type="text"
          placeholder="Enter Group Telegram ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteBotModal;