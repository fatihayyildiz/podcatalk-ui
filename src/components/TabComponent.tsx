import React, { useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabComponentProps = {
  tabs: Tab[];
};

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-center border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 -mb-px border-b-2 transition-all duration-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              activeTab === index
                ? "border-blue-500 text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
                : "border-transparent text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-blue-300 dark:hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="p-4 bg-white border border-gray-300 rounded-b-lg h-screen dark:bg-gray-900 dark:border-gray-700"
        style={{ minHeight: '400px', maxHeight: 'calc(100vh - 120px)' }}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabComponent;
