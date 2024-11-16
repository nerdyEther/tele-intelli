import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import KeywordChart from './KeywordChart';
import InviteBotModal from './InviteBotModal';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupDetails, setGroupDetails] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [keywordData, setKeywordData] = useState([]);
  const [userCountData, setUserCountData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [keywordsToRemove, setKeywordsToRemove] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [totalMessages, setTotalMessages] = useState(0);
  const [isInviteBotModalOpen, setIsInviteBotModalOpen] = useState(false);

  const memoizedGroups = useMemo(() => groups, [groups]);

  useEffect(() => {
    const fetchTotalMessages = async () => {
      if (!selectedGroup || !user) return;
      try {
        const response = await axios.get('https://tele-intelli-production.up.railway.app/totalMessages', {
          params: { groupId: selectedGroup.group_id, userId: user.id }
        });
        setTotalMessages(response.data.totalMessages);
      } catch (error) {
        console.error("Error fetching total messages:", error);
      }
    };
    fetchTotalMessages();
  }, [selectedGroup, user]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user || !user.id) {
        setError('User ID is not available');
        setLoadingGroups(false);
        return;
      }
      try {
        const response = await axios.get(`https://tele-intelli-production.up.railway.app/groups?userId=${user.id}`);
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setError('Error fetching groups');
      } finally {
        setLoadingGroups(false);
      }
    };
    fetchGroups();
  }, [user]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!selectedGroup) return;
      setLoadingDetails(true);
      try {
        const response = await axios.get(`https://tele-intelli-production.up.railway.app/gdetails?id=${selectedGroup.id}`);
        setGroupDetails(response.data);
        setKeywordsToRemove(response.data.keywords || []);
        
        const keywordResponse = await axios.get(`https://tele-intelli-production.up.railway.app/keywordchart`, {
          params: { groupId: selectedGroup.group_id, userId: user.id }
        });
        setKeywordData(keywordResponse.data);
        
        const userCountResponse = await axios.get(`https://tele-intelli-production.up.railway.app/userCounts?groupId=${selectedGroup.group_id}`);
        setUserCountData(userCountResponse.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
        setError('Error fetching group details');
      } finally {
        setLoadingDetails(false);
      }
    };
    fetchGroupDetails();
  }, [selectedGroup, user.id]);

  const handleAddKeyword = async () => {
    if (!newKeyword.trim()) {
      setError("Keyword cannot be empty");
      return;
    }
    try {
      await axios.post(`https://tele-intelli-production.up.railway.app/addKeyword`, {
        groupId: selectedGroup.group_id,
        keyword: newKeyword.trim(),
      });
      const keywordResponse = await axios.get(`https://tele-intelli-production.up.railway.app/keywordchart`, {
        params: { groupId: selectedGroup.group_id, userId: user.id },
      });
      setKeywordData(keywordResponse.data);
      setNewKeyword('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding keyword:', error);
      setError('Error adding keyword');
    }
  };

  const handleRemoveKeyword = async () => {
    if (!selectedKeyword) {
      setError("No keyword selected");
      return;
    }
    try {
      await axios.post(`https://tele-intelli-production.up.railway.app/removeKeyword`, {
        groupId: selectedGroup.group_id,
        keyword: selectedKeyword,
      });
      const keywordResponse = await axios.get(`https://tele-intelli-production.up.railway.app/keywordchart`, {
        params: { groupId: selectedGroup.group_id, userId: user.id },
      });
      setKeywordData(keywordResponse.data);
      setSelectedKeyword('');
      setRemoveModalOpen(false);
    } catch (error) {
      console.error('Error removing keyword:', error);
      setError('Error removing keyword');
    }
  };

  const handleInviteBot = async (groupId) => {
    try {
      // Assuming you have an API endpoint to handle the bot invitation
      await axios.post('https://tele-intelli-production.up.railway.app/invite-bot', {
        userId: user.id,
        groupId: groupId
      });
      // Optionally, you can update the groups list or show a success message
      setIsInviteBotModalOpen(false);
    } catch (error) {
      console.error('Error inviting bot:', error);
      setError('Error inviting bot to the group');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Top Navigation Bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="space-x-4">
        <button 
            onClick={() => setIsInviteBotModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Invite Bot
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove Bot</button>
        </div>
        <div>
          Welcome, <span className="font-bold">{user?.name || 'User'}</span>
          <button onClick={logout} className="ml-4 text-red-500 hover:text-red-600">Logout</button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar with Groups List */}
        <div className="w-1/4 bg-gray-800 p-4 overflow-y-auto">
          <h3 className="text-white text-lg font-bold mb-4">Your Groups</h3>
          {loadingGroups ? (
            <p className="text-gray-300">Loading groups...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="space-y-2">
              {memoizedGroups.map((group) => (
                <li
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className={`cursor-pointer p-2 rounded-lg ${
                    selectedGroup?.id === group.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {group.group_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Main content area with scrolling */}
        <div className="flex-1 overflow-y-auto bg-white p-4">
          {/* Group-specific content */}
          {loadingDetails ? (
            <p>Loading group details...</p>
          ) : groupDetails ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">{groupDetails.group_name} - Analytics</h2>
              <KeywordChart groupId={selectedGroup.group_id} userId={user.id} />

              <div className="mt-8">
                <div className="flex space-x-6">
                  {/* Keyword and Count Table */}
                  <div className="w-1/2">
                    <h3 className="text-lg font-bold text-center mb-4">Keywords and Counts</h3>
                    <table className="table-auto w-full mb-6">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-center">Keyword</th>
                          <th className="px-4 py-2 text-center">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keywordData.map((item, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2 text-center">{item.keyword}</td>
                            <td className="border px-4 py-2 text-center">{item.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>


      {/* Invite Bot Modal */}
      {isInviteBotModalOpen && (
        <InviteBotModal
          userId={user.id}
          onInvite={handleInviteBot}
          onClose={() => setIsInviteBotModalOpen(false)}
        />
      )}

                    {/* Add/Remove Keywords Buttons */}
                    <div className="flex justify-center space-x-4 mb-6">
                      <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Add Keyword
                      </button>
                      <button 
                        onClick={() => setRemoveModalOpen(true)} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove Keyword
                      </button>
                    </div>
                  </div>

                  {/* User and Count Table */}
                  <div className="w-1/2">
                    <h3 className="text-lg font-bold text-center mb-4">Users and Message Count</h3>
                    <table className="table-auto w-full mb-6">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-center">User</th>
                          <th className="px-4 py-2 text-center">Flagged Keywords Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userCountData.map((user, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2 text-center">{user.sender_name}</td>
                            <td className="border px-4 py-2 text-center">{user.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Alert System and Sentiment Analysis buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                  <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                    Alert System
                  </button>
                  <button className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600">
                    Sentiment Analysis
                  </button>
                </div>

                {/* Group Information Section */}
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-bold">Group Information:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>Active: <span className="font-semibold">{groupDetails.is_active ? 'Yes' : 'No'}</span></div>
                    <div>Created At: <span className="font-semibold">{new Date(groupDetails.created_at).toLocaleString()}</span></div>
                    <div>Total Messages: <span className="font-semibold">{totalMessages}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Select a group to see its details.</p>
          )}
        </div>
      </div>

      {/* Add Keyword Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Add New Keyword</h3>
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter new keyword"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddKeyword}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Keyword Modal */}
      {removeModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Select Keyword to Remove</h3>
            <ul className="space-y-2">
              {keywordsToRemove.map((keyword) => (
                <li key={keyword} className="flex items-center">
                  <input
                    type="radio"
                    value={keyword}
                    checked={selectedKeyword === keyword}
                    onChange={() => setSelectedKeyword(keyword)}
                    className="mr-2"
                  />
                  <span>{keyword}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setRemoveModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveKeyword}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;