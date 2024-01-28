import { useNavigate } from 'react-router-dom';


const RedirectToSetupButton = ({ baseUrl, endpoint }) => {
    const navigate = useNavigate();

    const redirectToSetup = () => {
        const fullUrl = `${baseUrl}${endpoint}`;
        navigate(fullUrl);
    };

    return (
        <button onClick={redirectToSetup} size='large' className="bg-black hover:bg-blue-400 text-white font-bold py-4 px-20 border-b-4 border-blue-700 hover:border-blue-500 rounded text-4xl translate-x-20 translate-y-60 ">
             Let's Setup!
        </button>
    );
};

export default RedirectToSetupButton;