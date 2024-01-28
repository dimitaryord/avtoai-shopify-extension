import { useNavigate } from 'react-router-dom';


const RedirectButton = ({ baseUrl, endpoint, text, className }) => {
    const navigate = useNavigate();

    const redirectTo = () => {
        const fullUrl = `${baseUrl}${endpoint}`;
        navigate(fullUrl);
    };

    return (
        <button onClick={redirectTo} size='large' className={className}>
            {text}
        </button>
    );
};

export default RedirectButton;