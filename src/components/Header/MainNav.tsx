import Logo from "components/Logo/Logo";
import MenuBar from "components/MenuBar/MenuBar";
import Navigation from "components/Navigation/Navigation";
import SearchModal from "./SearchModal";
import SwitchDarkMode from "components/SwitchDarkMode/SwitchDarkMode";
import Button from "components/Button/Button";
import { useGetCurrentUserQuery, useLogoutMutation } from "store/services/authApi";

const MainNav = () => {

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isSuccess: isSuccessCurrentUser,
  } = useGetCurrentUserQuery();
  const [logout] = useLogoutMutation();

  const isAuthenticated = !isLoadingCurrentUser && isSuccessCurrentUser && !!currentUser;
  const isLoading = isLoadingCurrentUser;

  const handleLogout = async () => {
    await logout(undefined);
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  
  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center flex-4">
          <Logo />
        </div>

        <div className="flex-18 hidden lg:flex justify-center mx-4">
          <Navigation />
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          <SwitchDarkMode />
          <Button
            sizeClass="py-3 px-4 sm:px-6"
            href={isAuthenticated ? "/profile" : "/login"}
            pattern={"primary"}
            loading={isLoading}
            disabled={isLoading}
          >
            {isAuthenticated ? "Profile" : "Login"}
          </Button>
          {
            isAuthenticated && (
              <Button
                sizeClass="py-3 px-4 sm:px-6 ml-3"
                onClick={handleLogout}
                pattern="default"
                loading={isLoading}
                disabled={isLoading}
              >
            Logout
          </Button>
            )
          }
          
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav;
