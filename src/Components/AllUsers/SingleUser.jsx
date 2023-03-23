import React from 'react';

const SingleUser = ({ user, selectedUsers, setSelectedUsers }) => {


    const handleUserSelect = (e) => {
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, user?._id]);
        }
        else {
            const restSelectedUser = selectedUsers.filter(id => id !== user?._id);
            setSelectedUsers(restSelectedUser)
        }
    }

    // console.log(selectedUsers);

    return (
        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="p-4 w-4">
                <div className="flex items-center">
                    <input onChange={handleUserSelect} id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={selectedUsers.includes(user?._id)} />
                </div>
            </td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user?.name}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user?.email}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user?.phone}</td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <span className=' capitalize'>{user?.user_type}</span>
            </td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                {user?.blocked ? <span className='text-red-500'>Blocked</span> : <span className='text-green-500'>Active</span>}
            </td>
        </tr>
    );
};

export default SingleUser;