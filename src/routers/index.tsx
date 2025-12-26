import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "./types";
import Footer from "components/Footer/Footer";
import PageHome from "pages/home";
import PageLogin from "pages/authentication/login";
import PageSignUp from "pages/authentication/signup";
import PageForgotPassword from "pages/authentication/forget-password";
import PageCheckEmail from "pages/authentication/check-email";
import PageConfirmEmail from "pages/authentication/confirm-email";
import PageAbout from "pages/about";
import PageProfile from "pages/profile";
import PageStudioList from "pages/studio/list";
import StudioGuestPage from "pages/studio/guest/page";
import Page404 from "pages/404";
import SiteHeader from "app/SiteHeader";
import { useGetCurrentUserQuery } from "store/services/authApi";
import PageEditPodcast from "pages/studio/edit-podcast/edit-podcast";
import { useParams } from "react-router-dom";
import PagePricing from "pages/pricing/pricing";
import PageCreatePodcast from "pages/studio/create-podcast/create-podcast";
import PageConfirmEmailNew from "pages/authentication/confirm-email-new";
import PagePasswordChange from "pages/authentication/password-change";

export const publicPages: Page[] = [
  { path: "/", component: PageHome },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/signup/check-email", component: PageCheckEmail },
  { path: "/confirm-email", component: PageConfirmEmail },
  { path: "/confirm-new-email", component: PageConfirmEmailNew },
  { path: "/about", component: PageAbout },
  { path: "/forgot-password", component: PageForgotPassword },
  { path: "/password-change", component: PagePasswordChange },
  { path: "/studio/guest", component: StudioGuestPage },
  { path: "/pricing", component: PagePricing },
];

const PageEditPodcastWrapper = () => {
  const { id: podcastId } = useParams();
  return <PageEditPodcast podcastId={podcastId || ''} />;
};

const MyRoutes = () => {
  const { data: currentUser, isLoading, isSuccess } = useGetCurrentUserQuery();
  const isAuthenticated = !isLoading && isSuccess && !!currentUser;

  const authenticatedPages: Page[] = [
    { path: "/studio/podcasts", component: PageStudioList },
    { path: "/studio/podcasts/create", component: PageCreatePodcast },
    { path: "/studio/podcasts/edit/:id", component: PageEditPodcastWrapper },
    { path: "/profile", component: PageProfile },
  ];

  const pages = isAuthenticated ? [
    ...publicPages,
    ...authenticatedPages,
  ] : publicPages;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 dark:border-gray-100 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <SiteHeader />

      <Routes>
        {pages.map(({ component: Component, path }, index) => {
          return <Route key={index} element={<Component />} path={path} />;
        })}
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
      
    </BrowserRouter>
  );
};

export default MyRoutes;
