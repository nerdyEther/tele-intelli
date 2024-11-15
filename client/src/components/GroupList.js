import React from 'react';

const GroupList = ({ groups, onSelectGroup }) => {
  return (
    <div className="p-4 space-y-2">
      {groups.length === 0 ? (
        <p className="text-gray-400">Please invite a bot to continue.</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
              onClick={() => onSelectGroup(group.id)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
