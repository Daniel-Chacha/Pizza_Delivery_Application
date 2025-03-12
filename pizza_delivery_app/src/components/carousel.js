import React, {useEffect, useState, useRef} from "react";
import styles from "./styles/carousel.module.css";
// import { type } from "@testing-library/user-event/dist/type";



export const Carousel = ({slideItems, handleSignClick}) =>{
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailBorderRef = useRef(null);
  const runTimeOutRef = useRef(null);
  const runNextAutoRef = useRef(null);
  const [thumbnailPosition, setThumbnailPosition] = useState({ left: 0, bottom: 0 });
  const [lastAction, setLastAction] = useState(null);

  // Update thumbnail positions and set CSS variables
  const updateThumbnailPosition = () => {
      if (thumbnailBorderRef.current && thumbnailBorderRef.current.children.length > 0) {
          const firstThumb = thumbnailBorderRef.current.children[0];
          const rect = firstThumb.getBoundingClientRect();
          const carouselRect = carouselRef.current?.getBoundingClientRect();

          if (carouselRect) {
              const left = rect.left - carouselRect.left;
              const bottom = carouselRect.bottom - rect.bottom;
              const width = rect.width;
              const height = rect.height;

              document.documentElement.style.setProperty('--thumbnail-left', `${left}px`);
              document.documentElement.style.setProperty('--thumbnail-bottom', `${bottom}px`);
              document.documentElement.style.setProperty('--thumbnail-width', `${width}px`);
              document.documentElement.style.setProperty('--thumbnail-height', `${height}px`);

              setThumbnailPosition({ left, bottom });
          }
      }
  };

  useEffect(() => {
      if (thumbnailBorderRef.current && thumbnailBorderRef.current.children.length > 0) {
          const firstThumb = thumbnailBorderRef.current.children[0];
          thumbnailBorderRef.current.appendChild(firstThumb);
      }

      runNextAutoRef.current = setTimeout(() => {
          handleNext();
      }, 7000);

      updateThumbnailPosition();
      window.addEventListener('resize', updateThumbnailPosition);

      return () => {
          if (runTimeOutRef.current) clearTimeout(runTimeOutRef.current);
          if (runNextAutoRef.current) clearTimeout(runNextAutoRef.current);
          window.removeEventListener('resize', updateThumbnailPosition);
      };
  }, []);

  useEffect(() => {
      if (carouselRef.current) {
          carouselRef.current.style.setProperty('--thumbnail-left', `${thumbnailPosition.left}px`);
          carouselRef.current.style.setProperty('--thumbnail-bottom', `${thumbnailPosition.bottom}px`);
      }
  }, [thumbnailPosition]);

  const showSlider = (type) => {
      if (!carouselRef.current || !sliderRef.current || !thumbnailBorderRef.current) return;

      setLastAction(type);
      updateThumbnailPosition();

      const sliderItems = sliderRef.current.querySelectorAll(`.${styles.item}`);
      const thumbnailItems = thumbnailBorderRef.current.querySelectorAll(`.${styles.item}`);

      if (type === 'next') {
          if (sliderItems.length > 1) {
              const secondItem = sliderItems[1];
              secondItem.classList.add(styles.incoming);
          }

          if (sliderItems.length > 0) {
              sliderRef.current.appendChild(sliderItems[0]);
          }

          if (thumbnailItems.length > 0) {
              thumbnailBorderRef.current.appendChild(thumbnailItems[0]);
          }

          carouselRef.current.classList.add(styles.next);
      } else {
          if (sliderItems.length > 0) {
              const currentItem = sliderItems[0];
              currentItem.classList.add(styles.outgoing);
          }

          if (sliderItems.length > 0) {
              const lastItem = sliderItems[sliderItems.length - 1];
              sliderRef.current.prepend(lastItem);
              lastItem.classList.remove(styles.incoming);
          }

          if (thumbnailItems.length > 0) {
              thumbnailBorderRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
          }

          carouselRef.current.classList.add(styles.prev);
      }

      if (runTimeOutRef.current) clearTimeout(runTimeOutRef.current);
      runTimeOutRef.current = setTimeout(() => {
          if (carouselRef.current) {
              carouselRef.current.classList.remove(styles.next);
              carouselRef.current.classList.remove(styles.prev);

              sliderRef.current?.querySelectorAll(`.${styles.item}`).forEach((item) => {
                  item.classList.remove(styles.incoming);
                  item.classList.remove(styles.outgoing);
              });
          }
      }, 3000);

      if (runNextAutoRef.current) clearTimeout(runNextAutoRef.current);
      runNextAutoRef.current = setTimeout(() => {
          handleNext();
      }, 7000);
  };

  const handleNext = () => showSlider('next');
  const handlePrev = () => showSlider('prev');

    return(
      <div className="h-[100vh] ">    
            <style jsx global>{`
                :root {
                    --thumbnail-left: ${thumbnailPosition.left}px;
                    --thumbnail-bottom: ${thumbnailPosition.bottom}px;
                    --animation-direction: ${lastAction === 'prev' ? 'reverse' : 'normal'};
                }
            `}</style>
        

        {/* Carousel */}
        <div ref={carouselRef} className={`${styles.carousel} h-screen  w-screen overflow-hidden relative` }>
                {/* List items */}
              <div ref={sliderRef} className={`${styles.list} relative w-full h-full`}>
                {slideItems.map((item, index) =>(
                  <div key={item.id} className={`${styles.item} w-full h-full absolute inset-0 `}>
                    <div className={`${styles.imageContainer} relative w-full h-full`}>
                      <img src={item.imageSrc} alt={`Slide ${index + 1}`}  className={`${styles.slideImage} brightness-75 w-full h-full object-cover`} ></img>
                    </div>

                    <div  className={`${styles.content} content absolute top-[15%] sm:top-[20%] lg:top-[15%] max-w-[80%] w-[1140px] text-left left-1/2 text-[#fff] box-border transform -translate-x-1/2 `} >
                          <p  className={`${styles.welcome} font-bold tracking-[10px] sm:text-[2em] lg:text-[16px] `}>{item.welcome}</p>
                          <p  className={`${styles.topic} text-[30px] sm:text-[38px] lg:text-[3em] leading-[1.65rem] text-white pt-10 font-bold`} >{item.topic}</p>
                          <p  className={`${styles.des} text-[1em] sm:text-[2em] lg:text-[1.2em] mt-10 font-bold`}>{item.des}</p>
                          
                          <button                    
                          className={`${styles.buttons} mt-5 sm:mt-20 poppins-medium  border-none tracking-[3px]  bg-[#eee] p-2 font-bold text-blue-900 text-3xl shadow-[0_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-1 transition-all duration-200 ease-in-out transform active:translate-y-2 active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 hover:bg-blue-900 hover:text-white`}
                          type="button"
                          onClick={(event) => handleSignClick(event, "/dashboard")}
                          >
                          ORDER PIZZA                          
                          </button>
                    </div>

                  </div>
                ))}
              </div>
            

            {/* thumbnail */}
            <div ref={thumbnailBorderRef} className={`${styles.thumbnail} absolute bottom-[50px] left-[50%] w-max z-10 flex gap-2`}>
              {slideItems.map((item, index) =>(
                <div key={`thumb-${item.id}`} className={`${styles.item} w-[150px] h-[220px] flex-shrink-0 relative`}>
                  <div className="relative w-full h-full">
                    <img src={item.imageSrc} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-[20px]"></img>

                    <div className={`${styles.content} text-white absolute bottom-[10px] left-[10px] right-[10px]`}>
                      <div className={`${styles.welcome} font-medium`}>Welcome To:</div>
                      <div className={`${styles.des} font-light`}>Pizza Inn</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Prev */}
            <div className={`${styles.arrows} absolute top-[80%] right-[52%] z-10 w-[300px] max-w-[30%] flex gap-[10px] items-center`}>
              <button id="prev" onClick={handlePrev} className="w-[40px] h-[40px] rounded-full bg-[#eee4] border-none text-white font-bold transition-all duration-500 hover:bg-white hover:text-black">&lt;</button>
              <button id="next" onClick={handleNext} className="w-[40px] h-[40px] rounded-full bg-[#eee4] border-none text-white font-bold transition-all duration-500 hover:bg-white hover:text-black">&gt;</button>
            </div>

            {/* Time running */}
            <div className={`${styles.time} absolute z-[1000] w-0 h-[3px] bg-[#f1683a] left-0 top-0`}></div>
        </div>
      </div>
    )
}