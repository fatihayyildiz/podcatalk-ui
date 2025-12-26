import Layout from "components/Layout/layout";
import Heading2 from "components/Heading/Heading2";

const PageAbout = () => {
  return (
    <Layout subscriptionSection={false}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>About</Heading2>
      </header>

      <div className="max-w-3xl mx-auto space-y-4 text-neutral-700 dark:text-neutral-200">
        <p>
          Podcatalk is an AI-powered platform that helps podcast creators turn ideas into
          professional podcast scripts and audio in minutes.
        </p>

        <p>
          With Podcatalk, you can generate structured podcast scripts, convert them into
          natural-sounding audio, and focus on what truly matters: your message and your
          audience. No complex tools, no production stress. Just create, refine, and
          publish.
        </p>

        <p>
          Podcatalk is built for creators who want speed, quality, and creative freedom.
        </p>

        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Why Podcatalk?
        </h3>
        <p>
          Podcast creation should not be limited by technical barriers or production costs.
          Podcatalk removes those obstacles by combining script generation and audio
          creation into one AI-powered platform.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Generate podcast scripts from simple ideas</li>
          <li>Convert scripts into natural-sounding podcast audio</li>
          <li>Save time on writing, recording, and editing</li>
          <li>Create consistently high-quality content</li>
        </ul>

        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Our Mission
        </h3>
        <p>
          Our mission is to empower podcast creators at every level. From first-time
          podcasters to experienced professionals, Podcatalk exists to make podcast
          creation faster, easier, and more accessible.
        </p>
        <p>
          We believe AI should support creativity, not replace it. Podcatalk is designed
          to enhance your voice, your style, and your story.
        </p>
      </div>
    </Layout>
  );
};

export default PageAbout;
