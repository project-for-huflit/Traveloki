import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function callbackPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchServerAPI = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v2/auth/partner/continue-with-pointer`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ code, }),
            }
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("Phản hồi từ server tạo yêu cầu từ sso-pointer: ", data.metadata);

          if (data.metadata.tokens) {
            localStorage.setItem('token', data.metadata.tokens);
            localStorage.setItem('email', data.metadata.partnerEmail);
            localStorage.setItem('userId', data.metadata.partnerId);

            const userId = data.metadata.partnerId;
            console.log("userId: ", userId);

            navigate('', { state: { userId } });
          } else {
            console.error('No token found in response: ', data);
          }
        } catch (error) {
          console.error('Error during sso callback: ', error);
        }
      }
    };
    fetchServerAPI();
  }, [navigate]);
  return <div className="">...loading</div>;
}

export default callbackPage;
