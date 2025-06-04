import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut, checkLogin } from "../../apis/api";
import lion from "../../assets/images/lion.jpeg";

const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // 로그인 여부 상태, 우선 false로 초기화

  useEffect(() => {
    const setLoginStatus = async () => {
      const result = await checkLogin();
      setIsUserLoggedIn(result);
    };
    setLoginStatus();
  }, []);

  // 로그아웃 시 cookie에서 access_token, refresh_token 제거
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/"; // 새로고침 - 로그아웃 되었다는 것을 인지시켜주기 위해
  };

  return (
    <div className="flex items-center justify-between w-full gap-5 bg-black px-5 py-2.5 h-20">
      <Link to="/" className="flex flex-row items-center gap-5">
        <img src={lion} alt="lion" className="max-h-16 rounded-full" />
        <div className="text-white text-xl">SNULION BLOG</div>
      </Link>
      <div className="flex">
        {isUserLoggedIn ? (
          <Link
            to="/"
            className="mr-10 p-3 uppercase text-lg"
            onClick={handleSignOut}
          >
            sign out
          </Link>
        ) : (
          <>
            <Link to="/signin" className="mr-10 p-3 uppercase text-lg">
              sign in
            </Link>
            <Link to="/signup" className="mr-10 p-3 uppercase text-lg">
              sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
