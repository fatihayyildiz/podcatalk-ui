import TabComponent from "../../../components/TabComponent";
import PageAudioPodcastScript from "./audio-podcast/audio-podcast";
import {PromptInputWithActions} from "./conversation/conversation-v3";
import PagePodcastScript from "./podcast-script/podcast-script";
import { useUpdatePodcastMutation } from "store/services/podcastApi";
import PageAudioPodcast from "./audio-podcast/audio-podcast";
import { useGetPodcastByIdQuery } from "store/services/podcastApi";
import {FullChatApp} from "./conversation/conversation-v4";

type EditPodcastProps = {
  podcastId: string;
};

const PageEditPodcast = ({ podcastId }: EditPodcastProps) => {

  console.log('Podcast ID:', podcastId);
  // Fetch podcast data by ID
  const {
    data: podcastData = {},
    isLoading: podcastLoading,
    isError: podcastIsError,
  } = useGetPodcastByIdQuery(podcastId);

  // Mutation to update podcast
  const [updatePodcast] = useUpdatePodcastMutation();
  const handleSavePodcast = (podcastId: string, content: string) => {
    // Handle save logic here
    console.log('Save button clicked', podcastId, content);
    updatePodcast({
      id: podcastId,
      content: content,
    });
  };
  const handleConversationSentPodcast = (podcastId: string, content: string) => {
    // Handle conversation sent logic here
    console.log('Conversation sent button clicked', podcastId, 
      `${podcastData.content} \n \n `);
    updatePodcast({
      id: podcastId,
      content: `${podcastData.content} \n \n ${content}`,
    });
  };



  const tabs = [
    {
      label: "Conversation",
      content: (
        <div className="h-full">

        <FullChatApp />
        </div>
      ),
    },
    {
      label: "Script",
      content: (
        <PagePodcastScript podcastId={podcastId} onSavePodcast={handleSavePodcast} onConversationSentPodcast={handleConversationSentPodcast} />
      ),
    },
    {
      label: "Audio",
      content: <PageAudioPodcast podcastId={podcastId} />,
    },
  ];

  return (
    <div className="">
      <TabComponent tabs={tabs} />
    </div>
  );
};

export default PageEditPodcast;
