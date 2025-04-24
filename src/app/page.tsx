"use client";
import Flex from "@/components/Flex";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button"
import { If, Then, Else } from "react-if";
import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";

interface messageAreaProps {
  messages: UIMessage[]
}
const MessagesArea = ({ messages }: messageAreaProps) => {
  return (<>
    <If condition={messages.length == 0}>
      <Then>
        <div className="flex flex-col">
          <h1 className="font-inter font-bold text-4xl mb-4">Hello 👋, I am Eclipse.</h1>
          <p className="whitespace-pre-wrap max-w-[40ch]">{`I am a software engineer based in Paris, my current focus is to create AI apps that looks like magic to the user. Ask me any question below (it's powered by AI ✨)`}</p>
        </div>
      </Then>
    </If></>)
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, status, error, stop } = useChat({
  });
  return (
    <main className="w-full flex-col">
      <Flex justify="between">
        <div className="w-full"></div>
        <Flex gap={2}>
          <ModeToggle />
          <Button variant="ghost">{"Talk to a human"}</Button>
        </Flex>
      </Flex>
      <Flex row={false} className="w-2/3 mx-auto flex-1">
        <MessagesArea messages={messages} />
      </Flex>
    </main>
  );
}
