import { useState, useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { useLanguage } from '@/contexts/LanguageContext';

interface Story {
  id: number;
  thumbnail: string;
  title: string;
  videos: string[];
  isNew: boolean;
}

export const StoriesSection = () => {
  const { t } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const storiesRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const [viewportNode, setViewportNode] = useState<HTMLElement | null>(null);
  const emblaViewportRef = useCallback((node: HTMLElement | null) => {
    setViewportNode(node);
    emblaRef(node);
  }, [emblaRef]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleScroll = () => {
      if (storiesRef.current) {
        const { top } = storiesRef.current.getBoundingClientRect();
        // The sticky position is top-16, which is 4rem or 64px.
        // We check if the top of the element is at or above this position.
        setIsFixed(top <= 64);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    if (viewportNode) {
      const wheelListener = (event: WheelEvent) => {
        if (event.deltaY === 0) return;
        event.preventDefault();
        if (emblaApi) {
          if (event.deltaY > 0) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollPrev();
          }
        }
      };
      viewportNode.addEventListener('wheel', wheelListener);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        viewportNode.removeEventListener('wheel', wheelListener);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [emblaApi, viewportNode]);

  const stories: Story[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    thumbnail: `https://picsum.photos/seed/${i + 1}/400/400`,
    title: t("stories.title", { number: i + 1 }),
    videos: [`https://picsum.photos/seed/${i + 1}/1080/1920`],
    isNew: i < 3, // First 3 are new
  }));

  const openStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentVideoIndex(0);
  };

  const closeStory = () => {
    setSelectedStory(null);
    setCurrentVideoIndex(0);
  };

  const nextVideo = () => {
    if (selectedStory && currentVideoIndex < selectedStory.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <>
      {/* Stories Bar */}
      <div
        ref={storiesRef}
        className={`bg-background border-b border-border sticky top-16 z-40 backdrop-blur-sm bg-background/95 transition-all duration-300`}
        style={{ padding: '10px 0' }}
      >
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaViewportRef}>
              <div className={`flex items-center justify-center gap-6 -ml-4 transition-all duration-300 ${isFixed ? 'h-24' : 'h-32'}`}>
                {stories.map((story, index) => (
                  <div key={story.id} className="pl-4" style={{ flex: '0 0 auto', marginTop: '2px' }}>
                    <button
                      onClick={() => openStory(story)}
                      className="flex-shrink-0 text-center animate-scale-in group"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative">
                        <div
                          className={`rounded-full p-1 transition-all duration-300 ${
                            isFixed ? 'w-20 h-20' : 'w-24 h-24'
                          } ${
                            story.isNew ? 'bg-gradient-to-tr from-primary via-primary-light to-accent' : 'bg-border'
                          }`}
                        >
                          <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
                            <img
                              src={story.thumbnail}
                              alt={story.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>
                      <p className={`text-sm mt-2 truncate text-muted-foreground group-hover:text-foreground transition-all duration-300 ${isFixed ? 'hidden' : 'block'}`}>
                        {story.title}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Fading effects and navigation buttons */}
            <div
              className={`absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none transition-opacity ${
                canScrollPrev ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div
              className={`absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity ${
                canScrollNext ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {canScrollPrev && (
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-background/80 border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {canScrollNext && (
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 rounded-full bg-background/80 border shadow-md flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeStory}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors z-50"
          >
            <X size={24} />
          </button>

          {/* Progress Bars */}
          <div className="absolute top-4 left-4 right-16 flex gap-1 z-50">
            {selectedStory.videos.map((_, index) => (
              <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    index === currentVideoIndex ? 'w-full' : index < currentVideoIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Story Info */}
          <div className="absolute top-16 left-4 z-50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <img src={selectedStory.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-semibold">{selectedStory.title}</p>
              <p className="text-white/70 text-sm">
                {t("stories.now")}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          {currentVideoIndex > 0 && (
            <button
              onClick={prevVideo}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3 transition-colors z-50"
            >
              <ChevronLeft size={32} />
            </button>
          )}
          {currentVideoIndex < selectedStory.videos.length - 1 && (
            <button
              onClick={nextVideo}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-3 transition-colors z-50"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Video/Image Content */}
          <div className="max-w-md w-full mx-4 aspect-[9/16] rounded-2xl overflow-hidden">
            <img
              src={selectedStory.videos[currentVideoIndex]}
              alt={selectedStory.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tap Areas for Navigation */}
          <div className="absolute inset-0 flex">
            <div className="flex-1" onClick={prevVideo} />
            <div className="flex-1" onClick={nextVideo} />
          </div>
        </div>
      )}
    </>
  );
};
