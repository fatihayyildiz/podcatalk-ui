import React from "react";
import Layout from "components/Layout/layout";
import Pagination from "components/Pagination/Pagination";
import { useGetPodcastsQuery } from "store/services/podcastApi";
import { useNavigate } from "react-router-dom";
import Button from "components/Button/Button";
import { CustomLink } from "data/types";

const PAGE_LIMIT = 10;

const StudioAuthenticatedPage: React.FC = () => {

  // STATE
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: podcasts, isLoading, isSuccess } = useGetPodcastsQuery({
    page: currentPage,
    limit: PAGE_LIMIT,
    total: 0
  });
  const router = useNavigate();

  const totalPodcasts = podcasts?.total || 0;

  const pages: CustomLink[] = [];
  for (let i = 0; i < Math.ceil(totalPodcasts / PAGE_LIMIT); i++) {
    pages.push({
      label: String(i + 1),
      href: `/studio/podcasts?page=${i + 1}`,
    });
  }

  const prepareStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
            Published
          </span>
        );
      case "DRAFT":
        return (
          <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
            Draft
          </span>
        );
      case "INACTIVE":
        return (
          <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
            Inactive
          </span>
        );
      default:
        return null;
    }
  }

  const handlerEditPodcast = (id: string) => {
    // Navigate to the edit page
    router(`/studio/podcasts/edit/${id}`);
  };
  const handlerDeletePodcast = (id: string) => {
    console.log('Delete podcast:', id);
  };

  return (
    <Layout subscriptionSection={false}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Podcasts</h1>
        <Button
            sizeClass="py-3 px-4 sm:px-6 text-sm lg:text-base"
            href={"/studio/podcasts/create"}
            pattern="primary"
            className="rounded-lg"
          >
            Create Podcast
          </Button>
      </div>
      
      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
                <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                      <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Content
                        </th>

                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {podcasts?.data.map((podcast: any) => (
                        <tr key={podcast.id}>
                          <td className="py-4">

                            <div className="ml-4 flex-grow">
                              <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                                {podcast.title}
                              </h2>
                            </div>

                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {prepareStatusBadge(podcast.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                            <span> {(podcast.content && podcast.content.length > 0) ? `${podcast.content.substring(0, (podcast.content.length > 30 ? 30 : podcast.content.length) || 5)}        ...` : ''}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                            <a
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                handlerEditPodcast(podcast.id);
                              }}
                              className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                            >
                              Edit
                            </a>
                            {` | `}
                            <a
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                console.log('Delete podcast:', podcast.id);
                                handlerDeletePodcast(podcast.id);
                              }}
                              className="text-rose-600 hover:text-rose-900"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {
              totalPodcasts > PAGE_LIMIT && (
                <Pagination
                  className="justify-center"
                  pages={pages}
                  currentPage={currentPage}
                  totalPages={podcasts?.total || 0}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                />
              )
            }

          </div>
        )}
    </Layout>
  );
};

export default StudioAuthenticatedPage; 