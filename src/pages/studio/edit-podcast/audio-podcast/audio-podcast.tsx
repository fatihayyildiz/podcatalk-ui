import { useState } from "react";
import { Button } from 'flowbite-react';
import { useGetPodcastByIdQuery } from 'store/services/podcastApi';
import MusicPlayer from "components/MusicPlayer/MusicPlayer";
import { useGenerateAudioMutation } from "store/services/audioApi";

type AudioPodcastProps = {
    podcastId: string;
};

const PageAudioPodcast = ({ podcastId }: AudioPodcastProps) => {

    // STATE
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    // Fetch podcast data by ID
    const {
        data: podcastData = {},
        isError: isGetPodcastByIdError,
    } = useGetPodcastByIdQuery(podcastId);

    // Mutation to generate audio
    const [generateAudio, { isLoading: isGeneratingAudio }] = useGenerateAudioMutation();

    if (isGetPodcastByIdError) {
        return <p className="text-red-500">Error loading podcast data</p>;
    }

    const handleGenerateAudio = async () => {
        // Call the onSavePodcast function passed as a prop
        // onSavePodcast(podcastId, podcastContent);
        const { data } = await generateAudio({
            topic: podcastData.title,
            vibe: 'Voice Affect: Professional and engaging. Tone: Conversational and informative. Pacing: Moderate with appropriate pauses for emphasis.',
            script_text: podcastData.content,
            voice_personas: JSON.stringify({
                "Steve": {
                    persona: "Steve is a podcast host who is very friendly and helpful. He is always ready to assist you with your podcasting needs.",
                    voice: "alloy",
                },
                "Eve": {
                    persona: "Eve is a podcast participant who is very knowledgeable and insightful. She provides valuable insights and information to the podcast.",
                    voice: "nova",
                },
            }),
        });

        if (data.audio_url) {
            console.log('Audio URL:', data.audio_url);
            setAudioUrl(data.audio_url);
        }

        console.log('Audio generated:', data);
    };



    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-4 text-black">{podcastData.title}</h2>
            <div className="mb-4">
                <span className="text-black">
                    {podcastData.content}
                </span>
            </div>

            <div className="flex flex-col space-y-4 mb-8">
                <Button disabled={isGeneratingAudio} onClick={handleGenerateAudio}>{isGeneratingAudio ? 'Generating audio...' : 'Generate Audio'}</Button>
            </div>
            <div className="flex flex-col flex-grow h-full">

                {
                    isGeneratingAudio
                        ?
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Audio generating can take some time, depending on the length of the podcast and the complexity of the content.</p>
                        </div>
                        :
                        audioUrl ?
                            <MusicPlayer post={{
                                ...podcastData,
                                ...{
                                    audioUrl: `http://localhost:3000${audioUrl}`,
                                }
                            }} />
                            : ''
                }



            </div>
        </div>
    );
};

export default PageAudioPodcast;