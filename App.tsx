
import React, { useState, useCallback } from 'react';
import { UserData, StoryChapter } from './types';
import { STORY_CHAPTER_TEXTS, getImagesByGender } from './constants';
import { StoryForm } from './components/StoryForm';
import { StoryDisplay } from './components/StoryDisplay';

const App: React.FC = () => {
    const [story, setStory] = useState<StoryChapter[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const generateStory = useCallback((data: UserData) => {
        const images = getImagesByGender(data.gender);
        const chapters: StoryChapter[] = STORY_CHAPTER_TEXTS.map((textFn, index) => ({
            text: textFn(data),
            image: images[index] || images[0], // fallback to first image
        }));
        return chapters;
    }, []);

    const handleFormSubmit = useCallback((data: UserData) => {
        setIsLoading(true);
        // Simulate generation time for a better UX
        setTimeout(() => {
            const newStory = generateStory(data);
            setStory(newStory);
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 1500);
    }, [generateStory]);

    const handleReset = () => {
        setStory(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 selection:bg-blue-200">
            <header className="mb-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
                    FaLeap
                </h1>
                <p className="text-lg text-gray-600">Your Story, Your Journey</p>
            </header>
            <main className="w-full flex items-center justify-center">
                {!story ? (
                    <StoryForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                ) : (
                    <StoryDisplay story={story} onReset={handleReset} />
                )}
            </main>
            <footer className="mt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} FaLeap Story Generator. Inspired by journeys of growth.</p>
            </footer>
        </div>
    );
};

export default App;
