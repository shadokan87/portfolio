"use client";
import Flex from "@/components/Flex";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { useTheme } from "next-themes";

export default function Home() {
  const { setTheme, theme } = useTheme();
  // useEffect(() => {
  //   setTheme("light");
  // }, []);
  const { messages, input, handleInputChange, handleSubmit, status, error, stop } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.log("_ERR", err.cause);
    }
  });
  return (
    <>
      <Flex row={false}>
        <Flex justify="end">
          <p role="button">Talk to a human</p>
          <p>{theme || ""}</p>
        </Flex>
        <Flex>
          <h1 className="font-inter font-bold text-4xl">Hello 👋, I am Eclipse.</h1>
        </Flex>
        <></>
      </Flex>
      {/* <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
}

// export default function Home() {
//   const [message, setMessage] = useState<string>("");
//   const [response, setResponse] = useState("(no response yet)");
//   const [isLoading, setIsLoading] = useState(false);
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const result = await completion(message);
//       setResponse(result.content || "");
//     } catch (error) {
//       console.error('Error:', error);
//       setResponse('Failed to get response');
//     } finally {
//       setIsLoading(false);
//       setMessage("");
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           className="bg-gray-800 text-white focus:bg-gray-700 disabled:bg-gray-600"
//           value={message} 
//           onChange={(e) => setMessage(e.target.value)}
//           disabled={isLoading}
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Sending...' : 'Send'}
//         </button>
//       </form>
//       <h1>{response}</h1>
//     </>
//   );
// }
