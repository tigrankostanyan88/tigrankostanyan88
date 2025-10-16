import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogOverlay,
  AlertDialogPortal,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const stories = [
  { id: 1, title: "Today's Menu", thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { id: 2, title: 'Grilled Salmon', thumbnail: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
  { id: 3, title: 'Ribeye Steak', thumbnail: 'https://images.unsplash.com/photo-1551028150-64b9f398f67b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
  { id: 4, title: 'Caesar Salad', thumbnail: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
  { id: 5, title: 'Chocolate Lava Cake', thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
  { id: 6, title: 'Old Fashioned', thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc7dca41a1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
  { id: 7, title: 'Behind the Grill', thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
  { id: 8, title: 'Meet the Chef', thumbnail: 'https://images.unsplash.com/photo-1581349432123-0214b2f2c31d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
  { id: 9, title: 'Wine Pairing', thumbnail: 'https://images.unsplash.com/photo-1510812431410-11e9c33b02b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
  { id: 10, title: 'Weekend Brunch', thumbnail: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
];

const GlowingAlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogOverlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogOverlay>
>(({ className, ...props }, ref) => (
  <AlertDialogOverlay
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
GlowingAlertDialogOverlay.displayName = 'GlowingAlertDialogOverlay';

const Stories: React.FC = () => {
  const [selectedStory, setSelectedStory] = React.useState<(typeof stories)[0] | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        container.scrollLeft += e.deltaY + e.deltaX;
      };

      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
        container.classList.remove('active');
      };

      const handleMouseUp = () => {
        isDown = false;
        container.classList.remove('active');
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        container.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener('wheel', handleWheel);
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section className="py-12 bg-background" style={{ marginTop: '15px' }}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 font-display">Our Moments</h2>
        <div className="relative">
          <div ref={scrollContainerRef} className="flex items-center overflow-x-auto pb-4 hide-scrollbar fade-sides" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}>
            <div className="flex mx-auto">
              {stories.map((story, index) => (
                <AlertDialog key={story.id}>
                  <AlertDialogTrigger asChild>
                    <div
                      className="flex-shrink-0 text-center cursor-pointer group select-none"
                      style={{ marginLeft: index > 0 ? '24px' : '0', scrollSnapAlign: 'center' }}
                      onClick={() => setSelectedStory(story)}
                    >
                      <div className="w-24 mt-5 h-24 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-1 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-pink-500/50">
                        <div className="bg-background rounded-full h-full w-full p-1">
                          <img src={story.thumbnail} alt={story.title} className="w-full h-full object-cover rounded-full" />
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="mt-2 text-sm font-medium text-muted-foreground truncate w-24">
                              {story.title}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>{story.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </AlertDialogTrigger>
                  {selectedStory && selectedStory.id === story.id && (
                    <AlertDialogPortal>
                      <GlowingAlertDialogOverlay />
                      <AlertDialogContent className="max-w-sm p-0 border-0 bg-transparent">
                        <div className="relative aspect-[9/16] w-full animated-video-border" style={{ borderRadius: '15px' }}>
                          <video src={selectedStory.video} controls autoPlay className="absolute top-0 left-0 w-full h-full object-cover" style={{ borderRadius: '15px' }} />
                          <AlertDialogCancel onClick={() => setSelectedStory(null)} className="absolute top-2 right-2 z-10 bg-black/50 text-white rounded-full h-8 w-8 p-0 flex items-center justify-center border-0">
                            X
                          </AlertDialogCancel>
                        </div>
                      </AlertDialogContent>
                    </AlertDialogPortal>
                  )}
                </AlertDialog>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;