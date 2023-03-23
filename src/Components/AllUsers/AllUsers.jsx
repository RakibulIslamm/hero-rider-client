import React, { useEffect, useState } from 'react';
import SingleUser from './SingleUser';
import searchIcon from '../../assets/search-icon.svg'
import useAuth from '../../Hooks/useAuth';

const AllUsers = () => {
    const [selectedText, setSelectedText] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [emailSearch, setEmailSearch] = useState(false);
    const [nameSearch, setNameSearch] = useState(true);
    const [phoneSearch, setPhoneSearch] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [ageRange, setAgeRange] = useState('');

    const { user } = useAuth();

    const itemCount = 10;
    const age = ageRange === '18-25' ? '18' : ageRange === '26-30' ? '26' : '';
    let pages = [];
    for (let i = 0; i < totalCount / itemCount; i++) {
        pages.push(i);
    }

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
        setPageNum(0);
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch(`http://localhost:5000/users?${emailSearch ? 'email=' + searchText : nameSearch ? 'name=' + searchText : phoneSearch ? 'phone=' + searchText : ''}&age=${age}&offset=${pageNum}&limit=${itemCount}`);
                const data = await res.json();
                setUsers(data.users);
                setTotalCount(data.count);
            }
            catch (err) { }
            finally { }
        }
        getUsers();
    }, [searchText, pageNum, ageRange])

    const handleAllSelect = (e) => {
        if (e.target.checked) {
            const ids = users.map(user => user?._id);
            setSelectedUsers(ids);
        }
        else {
            setSelectedUsers([]);
        }
    }


    const handleUpdateChange = (e) => {
        setSelectedText(e.target.value)
    }

    const handleUpdateUser = async () => {
        if (!selectedText) {
            return
        }

        if (selectedText === 'Block') {
            try {
                const res = await fetch('http://localhost:5000/block-users', {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(selectedUsers)
                })
                const data = await res.json();
                const updatedUsers = users.map(user => {
                    if (selectedUsers.includes(user._id)) {
                        user.blocked = true;
                    }
                    return user;
                });
                setUsers(updatedUsers);
                setSelectedUsers([]);
                setSearchText('')
            }
            catch (err) {
                console.log(err)
            }
        }
        else if (selectedText === 'Unblock') {
            try {
                const res = await fetch('http://localhost:5000/unblock-users', {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(selectedUsers)
                })
                const data = await res.json();
                const updatedUsers = users.map(user => {
                    if (selectedUsers.includes(user._id)) {
                        user.blocked = false;
                    }
                    return user;
                });
                setUsers(updatedUsers);
                setSelectedUsers([]);
                setSearchText('')
            }
            catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className="max-w-2xl mx-auto min-h-screen flex justify-center items-center flex-col relative w-full gap-1 py-10">
            {user.user_type === 'admin' && <div className="">
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 mb-2'>
                            <span className='font-semibold leading-5'>Search By: </span>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-1'>
                                    <input onChange={() => {
                                        setEmailSearch(false);
                                        setPhoneSearch(false);
                                        setNameSearch(!nameSearch);
                                    }} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={nameSearch} />
                                    <label className='text-sm'>Name</label>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input onChange={() => {
                                        setNameSearch(false);
                                        setPhoneSearch(false);
                                        setEmailSearch(!emailSearch);
                                    }} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={emailSearch} />
                                    <label className='text-sm'>Email</label>
                                </div>
                                {<div className='flex items-center gap-1'>
                                    <input onChange={() => {
                                        setPhoneSearch(!phoneSearch);
                                        setEmailSearch(false);
                                        setNameSearch(false);
                                    }} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={phoneSearch} />
                                    <label className='text-sm'>Phone</label>
                                </div>}
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className="">
                                Filter By Age:
                            </label>
                            <div className="inline-block relative">
                                <select className="block appearance-none bg-white shadow hover:border-gray-500 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm" onChange={(e) => setAgeRange(e.target.value)}>
                                    <option>All</option>
                                    <option>18-25</option>
                                    <option>26-30</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full relative'>
                        <input className='w-full pl-5 pr-20 py-4 rounded' type="text" onChange={handleSearchText} placeholder='Search.....' disabled={!emailSearch && !nameSearch && !phoneSearch} />
                        <button><img src={searchIcon} className="w-[30px] absolute right-4 top-1/2 transform -translate-y-1/2" alt="" /></button>
                    </div>
                </div>
                {selectedUsers?.length ? <div className='py-3 space-x-2'>
                    <div onChange={handleUpdateChange} className="inline-block relative">
                        <select className="block appearance-none bg-white shadow hover:border-gray-500 px-4 py-[4px] pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
                            <option value=''>Chose</option>
                            <option>Block</option>
                            <option>Unblock</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <button onClick={handleUpdateUser} className='px-4 py-[1px] bg-sky-500 text-white rounded'>Update</button>
                </div> : ''}
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700 w-full">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input onChange={handleAllSelect} id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={users?.length === selectedUsers.length} />
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Phone
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-right text-gray-700 uppercase dark:text-gray-400">
                                Type
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-right text-gray-700 uppercase dark:text-gray-400">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {
                            users?.map(user => <SingleUser key={user._id} user={user} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />)
                        }
                        {
                            !users.length && <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">User not found</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className={`py-3 w-full flex items-center ${selectedUsers.length ? 'justify-between' : 'justify-end'}`}>
                    {selectedUsers?.length ? <div className='space-x-2'>
                        <div className="inline-block relative">
                            <select onChange={handleUpdateChange} className="block appearance-none bg-white shadow hover:border-gray-500 px-4 py-[4px] pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-sm">
                                <option value=''>Chose</option>
                                <option>Block</option>
                                <option>Unblock</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        <button onClick={handleUpdateUser} className='px-4 py-[1px] bg-sky-500 text-white rounded'>Update</button>
                    </div> : ''}
                    <div className='flex items-center justify-end flex-wrap gap-2 w-1/2'>
                        {
                            pages.map(el => <button onClick={() => setPageNum(el)} key={el} className={`px-4 py-1 border border-gray-600 hover:bg-sky-500 hover:text-white ${pageNum === el && 'bg-sky-500 text-white'}`}>{el + 1}</button>)
                        }
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default AllUsers;