import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../Hooks/useFirebase';

const LogIn = () => {

    const { login, loginLoading, error, setError } = useFirebase();

    useEffect(() => {
        setError('');
    }, [])

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (!email || !password) return;

        login(email, password);

    }


    return (
        <div className="w-full max-w-[1440px] min-h-[500px] mx-auto px-8 flex justify-center items-center">
            <form onSubmit={handleLogIn} className="px-8 w-1/3">
                <h1 className="my-4 text-3xl text-gray-700 font-semibold">Welcome Back!</h1>
                <div className='space-y-3'>
                    <input
                        className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="email"
                        type="email"
                        placeholder="email@gmail.com"
                        required
                    />
                    <input
                        className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    {error && <p className='text-xs italic text-red-500'>{error}</p>}
                    <div className="mb-6 text-center">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loginLoading}
                        >
                            {loginLoading ? 'Loading...' : 'Log In'}
                        </button>
                    </div>
                </div>

                <hr className="mb-6 border-t" />
                <div className="text-center">
                    <Link
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        to="/signup"
                    >
                        Do not have an account? Sign in!
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LogIn;