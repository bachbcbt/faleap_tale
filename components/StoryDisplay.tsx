
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { StoryChapter } from '../types';
import { DownloadIcon, ResetIcon } from './icons';

interface StoryDisplayProps {
    story: StoryChapter[];
    onReset: () => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
    const storyRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        const storyElement = storyRef.current;
        if (!storyElement) return;

        setIsDownloading(true);
        const captureContainer = document.createElement('div');
        
        try {
            const storyClone = storyElement.cloneNode(true) as HTMLElement;

            const chapterElements = Array.from(storyClone.children).filter(
                (child) => (child as HTMLElement).classList.contains('flex')
            );

            // Force two-column layout AND fix image aspect ratio for the capture.
            chapterElements.forEach((chapterDiv, index) => {
                const element = chapterDiv as HTMLElement;
                
                // 1. Force the layout to be two-column, staggered.
                element.classList.remove('flex-col');
                element.classList.add(index % 2 === 0 ? 'flex-row' : 'flex-row-reverse');
                element.classList.add('items-center'); // Ensure vertical alignment

                // 2. Fix image aspect ratio by using a CSS background image.
                // This is more reliable in html2canvas than `object-contain`.
                const imgTag = element.querySelector('img');
                const imageContainer = imgTag?.parentElement as HTMLElement;

                if (imgTag && imageContainer) {
                    // Hide the original <img> tag in the clone.
                    imgTag.style.display = 'none';

                    // Apply the image as a background to its container div.
                    imageContainer.style.backgroundImage = `url(${imgTag.src})`;
                    imageContainer.style.backgroundSize = 'contain';
                    imageContainer.style.backgroundPosition = 'center';
                    imageContainer.style.backgroundRepeat = 'no-repeat';
                    
                    // Set an explicit minimum height on the container. This ensures it doesn't 
                    // collapse and provides a bounding box that mimics the original `max-h-80`.
                    imageContainer.style.minHeight = '320px';
                }
            });

            // Style the container that will be captured.
            captureContainer.style.position = 'absolute';
            captureContainer.style.left = '-9999px'; // Position off-screen
            captureContainer.style.top = '0';
            captureContainer.style.backgroundColor = '#f0f4f8'; // Match the app's body background
            captureContainer.style.padding = '40px'; // Generous padding
            captureContainer.style.width = '1200px'; // Standard wide format
            captureContainer.style.boxSizing = 'border-box';

            captureContainer.appendChild(storyClone);
            document.body.appendChild(captureContainer);
            
            await new Promise(resolve => setTimeout(resolve, 100)); // Allow render

            // Use html2canvas to capture the styled container.
            const canvas = await html2canvas(captureContainer, {
                useCORS: true,
                scale: 2, // Render at 2x resolution for a crisp image
            });

            // Trigger the download.
            const link = document.createElement('a');
            link.download = 'hanh-trinh-faleap-cua-toi.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

        } catch (err) {
            console.error("Download failed:", err);
            alert("Đã có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.");
        } finally {
            // Clean up: remove the temporary container.
            if (captureContainer.parentNode) {
                captureContainer.parentNode.removeChild(captureContainer);
            }
            setIsDownloading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div ref={storyRef} className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg space-y-12">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Hành Trình Trưởng Thành Cùng FaLeap</h1>
                    <p className="mt-3 text-lg text-gray-600">Đây là câu chuyện của bạn!</p>
                </div>
                {story.map((chapter, index) => (
                    <div key={index} className={`flex flex-col gap-6 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <div className="md:w-1/2 flex-shrink-0 w-full">
                            <img 
                                src={chapter.image} 
                                alt={`Minh họa chương ${index + 1}`} 
                                className="w-full h-auto object-contain rounded-lg max-h-80"
                                crossOrigin="anonymous" // Required for html2canvas with external images
                            />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-lg leading-relaxed text-gray-700">
                                {chapter.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                 <button 
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300"
                >
                    <ResetIcon className="w-5 h-5"/>
                    Tạo lại câu chuyện
                </button>
                <button 
                    onClick={handleDownload} 
                    disabled={isDownloading}
                    className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-all duration-300"
                >
                    {isDownloading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang chuẩn bị ảnh...
                        </>
                    ) : (
                        <>
                            <DownloadIcon className="w-5 h-5"/>
                            Tải về dưới dạng ảnh
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
