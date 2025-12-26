import { useCreatePodcastMutation } from "store/services/podcastApi";
import Layout from "components/Layout/layout";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { useState, FormEvent } from "react";


const PageCreatePodcast = () => {
    // STATE
    const [isShowingAlert, setIsShowingAlert] = useState(false);

    // Send the podcast data to the server
    const [createPodcast, { isLoading }] = useCreatePodcastMutation();
    const router = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted, processing podcast creation...", event);
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        try {
            console.log("Creating podcast with title:", title, "and content:", content);
            const result = await createPodcast({ title, content }).unwrap();
            // Optionally redirect or show success message
            console.log("Podcast created successfully");
            setIsShowingAlert(true);

            setTimeout(() => {
                console.log("Redirecting to edit page for podcast ID:", result.id);
                router(`/studio/podcasts/edit/${result.id}`);
            }, 1500);

        } catch (error) {
            console.error("Failed to create podcast:", error);
        }
    };

    return (
        <Layout subscriptionSection={false}>
            {
                isShowingAlert && (
                    <Alert color="success" className="mb-4">
                        Successfull! Redirecting to edit page...
                    </Alert>
                )  
            }
            <div className="flex flex-col h-auto">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                        Create Podcast
                    </h1>
                </div>
                <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
                    <form className="grid md:grid-cols-1 md:grid-rows-2 gap-6" method="post" onSubmit={handleSubmit}>
                        <div className="mb-4 md:col-span-2">
                            <Label>Title</Label>
                            <Input placeholder="Example Podcast Title" type="text" className="mt-1" name="title" />
                        </div>
                        <div className="mb-4 md:col-span-2">
                            <Label>Content</Label>
                            <Input placeholder="Example Podcast Content" type="text" className="mt-1" name="content" />

                        </div>
                        <ButtonPrimary loading={isLoading} className="md:col-span-2" type="submit">
                            Create Podcast
                        </ButtonPrimary>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default PageCreatePodcast;
