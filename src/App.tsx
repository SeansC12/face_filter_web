import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ModeToggle } from "./components/theme-toggle";
import { useTheme } from "./components/theme-provider";
import moustache from "./../public/moustache.png";
import propellor_hat from "./../public/propellor_hat.png";
import cap_hat from "./../public/cap_hat.png";
import glasses from "./../public/glasses.png";
import cool_glasses from "./../public/cool_glasses.jpeg";
import graduation_glasses from "./../public/graduation_glasses.jpeg";
import { Input } from "@/components/ui/input";
import { Label } from "./components/ui/label";

const props = [
  moustache,
  propellor_hat,
  cap_hat,
  glasses,
  cool_glasses,
  graduation_glasses,
];

export default function App() {
  const { theme } = useTheme();
  const [flaskEndpoint, setFlaskEndpoint] = useState(
    "http://127.0.0.1:5000"
  );
  const [chosenPropIndex, setChosenPropIndex] = useState(1);

  const updatePropIndex = async (new_index: number) => {
    setChosenPropIndex(new_index + 1);
    await fetch(
      `${flaskEndpoint}/switch_prop?prop=${new_index}`
    );
  };

  return (
    <div className="px-10 pt-3 flex flex-col items-center gap-4 w-screen h-screen bg-white dark:bg-black">
      <ModeToggle />
      <div className="flex items-center justify-center flex-col w-full">
        <Label className="text-white">
          Flask IP Address (only change if it is different,
          by default it should be correct)
        </Label>
        <Input
          defaultValue={flaskEndpoint}
          onChange={(e) => setFlaskEndpoint(e.target.value)}
          className="dark:text-white w-max"
        />
      </div>

      <div className="h-4/5 w-4/5">
        <iframe
          src={flaskEndpoint}
          className="w-full h-full"
        />
      </div>
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {props.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3 cursor-pointer"
              onClick={() => updatePropIndex(index)}
            >
              <div className="p-1 h-[10rem]">
                <Card
                  className={`h-full ${
                    chosenPropIndex === index + 1
                      ? "dark:bg-green-800 bg-green-400"
                      : index === 0
                      ? "bg-gradient-to-r from-indigo-300 to-blue-500"
                      : ""
                  }`}
                >
                  <CardContent
                    className={`flex flex-col aspect-square items-center justify-center p-6`}
                  >
                    <span className="text-base font-semibold">
                      {index + 1}
                    </span>
                    <img src={image} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          color={theme === "light" ? "black" : "white"}
        />
        <CarouselNext
          color={theme === "light" ? "black" : "white"}
        />
      </Carousel>
    </div>
  );
}
