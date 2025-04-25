"use client";
import Flex from "@/components/Flex";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button"
import { If, Then, Else } from "react-if";
import Image from "next/image";
import { Fragment, useState, useEffect, useRef, ReactNode } from "react";
import { CornerDownLeft } from "lucide-react";

// ai sk
import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";
// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface messageAreaProps {
  messages: UIMessage[]
}
const MessagesArea = ({ messages }: messageAreaProps) => {
  return (<>
    <Flex col gap={2}>
      {messages.map((message, index) => {
        return <Fragment key={index}>
          <Flex col>
            <p className="opacity-50">{message.role == "assistant" ? "Answer" : "Question"}</p>
            <p>{message.content}</p>
          </Flex>
        </Fragment>
      })}
    </Flex>
  </>)
}

const getRandomElement = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export default function Home() {
  const initialMessages: UIMessage[] = [
    { id: "1", role: "user", content: "What kind of projects do you work on?", parts: [] },
    { id: "2", role: "assistant", content: "I specialize in building AI-powered applications using modern web technologies like React, TypeScript, and Next.js. Currently, I'm focused on creating intuitive user interfaces that integrate seamlessly with AI capabilities.", parts: [] },
    { id: "3", role: "user", content: "What programming languages are you most comfortable with?", parts: [] },
    { id: "4", role: "assistant", content: "I'm most proficient in TypeScript/JavaScript, Python, and Rust. I particularly enjoy TypeScript for its strong typing system and ecosystem.", parts: [] },
    { id: "5", role: "user", content: "Can you tell me about your latest project?", parts: [] },
    { id: "6", role: "assistant", content: "I recently built an AI-powered chat application that uses natural language processing to help developers debug their code and learn new programming concepts.", parts: [] },
    { id: "7", role: "user", content: "What frameworks do you use?", parts: [] },
    { id: "8", role: "assistant", content: "I mainly work with Next.js, React, and Tailwind CSS for frontend development. For backend services, I use Node.js with Express or FastAPI with Python.", parts: [] },
    { id: "9", role: "user", content: "How do you approach learning new technologies?", parts: [] },
    { id: "10", role: "assistant", content: "I believe in learning by doing. I start with official documentation, build small proof-of-concept projects, and gradually tackle more complex challenges.", parts: [] },
    { id: "11", role: "user", content: "What interests you about AI development?", parts: [] },
    { id: "12", role: "assistant", content: "I'm fascinated by AI's potential to enhance human capabilities. I love creating tools that make complex tasks feel magical and intuitive for users.", parts: [] },
    { id: "13", role: "user", content: "Do you have experience with cloud platforms?", parts: [] },
    { id: "14", role: "assistant", content: "Yes, I work extensively with AWS and Vercel. I have experience with cloud deployment, serverless functions, and managing cloud infrastructure.", parts: [] },
    { id: "15", role: "user", content: "What's your development environment like?", parts: [] },
    { id: "16", role: "assistant", content: "I use VS Code with various productivity extensions, work in Linux, and rely heavily on Docker for development consistency.", parts: [] },
  ];

  const presetQuestions = ["what is the most impressive project you have built", "what is your github", "do you have social media", "where did you study"];
  const colors = [
    "#FFB3BA", // pastel pink
    "#BAFFC9", // pastel green
    "#BAE1FF", // pastel blue
    "#FFFFBA", // pastel yellow
    "#FFD1DC", // light pink
    "#E0FFFF", // light cyan
    "#FFDAB9", // peach
    "#D8BFD8", // thistle
    "#DCD0FF", // pastel purple
    "#F0FFF0", // honeydew
  ];

  const { messages, input, handleInputChange, handleSubmit, status, error, stop } = useChat({
    initialMessages: []
  });

  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContainerClick = () => {
      const inputElement = inputContainerRef.current?.querySelector('input');
      inputElement?.focus();
    };

    const container = inputContainerRef.current;
    container?.addEventListener('click', handleContainerClick);

    return () => {
      container?.removeEventListener('click', handleContainerClick);
    };
  }, []);

  const RenderMessages = () => <Flex col gap={2}>
    {messages.map((message, index) => {
      return <Flex col key={index}>
        <p className="opacity-50">{message.role == "assistant" ? "Answer" : "Question"}</p>
        <p>{message.content}</p>
      </Flex>
    })}
  </Flex>

  const RenderPresetQuestions = () => <Flex className="max-w-md flex-wrap" gap={2}>{presetQuestions.map((question, index) => {
    return (
      <Button key={index} variant={"outline"} className="!bg-transparent !rounded-full !shadow-none hover:!bg-accent">
        <div className={`h-2 w-2 rounded-full bg-[${colors[0]}]`}></div>
        {question}
      </Button>
    );
  })}</Flex>

  const introduction = <Flex col>
    <h1 className="font-inter font-bold text-4xl mb-4">Hello 👋, I am Eclipse.</h1>
    <p className="whitespace-pre-wrap max-w-[40ch]">{`I am a software engineer based in Paris, my current focus is to create AI apps that looks like magic to the user. Ask me any question below (it's powered by AI ✨)`}</p>
  </Flex>
  return (
    <main className="w-full flex-col">
      <Flex justify="between" className="h-12 position-sticky">
        <div className="w-full"></div>
        <Flex gap={2}>
          <ModeToggle />
          <Button variant="ghost">{"Talk to a human"}</Button>
        </Flex>
      </Flex>
      <Flex col className="w-2/3 mx-auto max-h-[calc(100vh-4rem)]">
        <Flex col gap={4} className="flex-1 overflow-hidden">
          <div className="flex flex-1 overflow-y-auto flex-col gap-4">
            <div>
              {introduction}
            </div>
            <If condition={messages.length == 0}><RenderPresetQuestions /></If>
            <RenderMessages />
          </div>
        </Flex>
        <form onSubmit={handleSubmit} className="w-full flex mb-4">
          <Flex
            ref={inputContainerRef}
            className={`w-full min-h-10 bg-accent rounded-full transition-all box-border ${inputFocus
              ? 'bg-background ring-2 ring-[#90E0EF]'
              : 'hover:bg-background hover:ring-2 hover:ring-[#90E0EF]'
              }`}
          >
            <input
              placeholder="type anything, or click on a preset above"
              name="prompt"
              value={input}
              onChange={handleInputChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              className={`w-full min-h-10 focus:outline-none bg-transparent ${inputFocus ? '' : 'cursor-pointer'}`}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="submit" className="p-2" disabled={input.length == 0}>
                    <CornerDownLeft />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{input.length == 0 ? 'Type something first' : 'Send message'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Flex>
        </form>
      </Flex>
    </main>
  );
}
