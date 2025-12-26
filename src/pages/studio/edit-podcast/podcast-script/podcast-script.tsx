import { Button } from 'flowbite-react';
// import { FlowbiteWYSIWYGEditor } from 'components/FlowbiteWYSIWYGEditor/FlowbiteWYSIWYGEditor';
import Textarea from "components/Textarea/Textarea";
import { useGetPodcastByIdQuery } from 'store/services/podcastApi';
import { useState, useEffect } from 'react';

type PodcastScriptProps = {
  podcastId: string;
  onSavePodcast: (podcastId: string, content: string) => void;
  onConversationSentPodcast: (podcastId: string, content: string) => void;
};

const PagePodcastScript = ({ podcastId, onSavePodcast, onConversationSentPodcast }: PodcastScriptProps) => {
  // Fetch podcast data by ID
  const {
    data = {},
    isLoading,
    isError,
  } = useGetPodcastByIdQuery(podcastId);

  const [podcastContent, setPodcastContent] = useState(data.content || '');

  const handleSave = () => {
    // Call the onSavePodcast function passed as a prop
    onSavePodcast(podcastId, podcastContent);
  };

  useEffect(() => {
    setPodcastContent(data.content);
  }, [onConversationSentPodcast]);


  if (isError) {
    return <p className="text-red-500">Error loading podcast data</p>;
  }

  /*

  {
        isLoading 
        ? <p className="text-gray-500">Loading...</p> 
        : <FlowbiteWYSIWYGEditor value={data.content} onChange={(html) => {
          
          setPodcastContent(html);
          console.log('Updated content:', html)
        }} />
      }

  */

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4 text-black">{data.title}</h2>
      <Button className="mb-4 w-24 self-end" onClick={handleSave}>
        Save
      </Button>
      {
        isLoading 
        ? <p className="text-gray-500">Loading...</p> 
        : <Textarea
            className="mt-1 bg-white text-black dark:bg-gray-800 dark:text-white"
            rows={16}
            value={podcastContent}
            onChange={(e) => setPodcastContent(e.target.value)}
          />
      }
    </div>
  );
};

export default PagePodcastScript;