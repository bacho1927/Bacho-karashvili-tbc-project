import { useEffect, useState } from "react";
import { SliderData } from "./SliderData"
import { PiCaretRightThin, PiCaretLeftThin } from "react-icons/pi";


function PartnerSlider() {

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0

        const newIndex = isFirstSlide ? SliderData.length - 1 : currentIndex - 3;
        setCurrentIndex(newIndex)

    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === SliderData.length - 1

        const newIndex = isLastSlide ? 0 : currentIndex + 3;
        setCurrentIndex(newIndex)

    }

    useEffect(() => {
        let intervalId;

        const sliderContainer = document.getElementById('sliderContainer');

        const handleMouseEnter = () => clearInterval(intervalId);
        const handleMouseLeave = () => (intervalId = startInterval());

        const startInterval = () =>
            setInterval(() => setCurrentIndex((prevIndex) => (prevIndex + 3 < SliderData.length ? prevIndex + 3 : 0)), 5000);

        intervalId = startInterval();

        sliderContainer.addEventListener('mouseenter', handleMouseEnter);
        sliderContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(intervalId);
            sliderContainer.removeEventListener('mouseenter', handleMouseEnter);
            sliderContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);


    return (
        <div className=" bg-[#2B2B2B] relative h-[380px]">

            <div className="lg:max-w-[1000px] sm:max-w-[800px] m-auto  pt-8">
                <h1 className="text-2xl font-arial text-[#F4F4F4] ">პროექტის პარტნიორები</h1>
                <div className="flex overflow-hidden gap-32 items-center py-28 justify-center" id="sliderContainer">

                    {SliderData.slice(currentIndex, currentIndex + 3).map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index + 1}`} />
                    ))}
                    <PiCaretLeftThin onClick={prevSlide} className="absolute top-48 left-24 text-5xl text-[#F4F4F4] hover:cursor-pointer hover:text-gray-400" id="sliderContainer" />

                    <PiCaretRightThin onClick={nextSlide} className="absolute top-48 right-24 text-5xl text-[#F4F4F4] hover:cursor-pointer hover:text-gray-400" id="sliderContainer" />
                </div>



            </div>
        </div>
    )
}

export default PartnerSlider