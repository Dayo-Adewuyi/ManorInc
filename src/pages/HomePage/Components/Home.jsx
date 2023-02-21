import React, { useState } from "react";
import Input from "./Input";
import Posts from "./Posts";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
function Home() {
  const { isConnected } = useAccount();
  return (
    <>
      {isConnected ? (
        <div className="w-full">
          <Input />
          <Posts />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img ">
          {/* Overlay */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black z-[2]" />
          <div className="p-5 text-white z-[2] mt-[-10rem]">
            <h2 className="text-5xl font-bold">Manor</h2>
            <p className="py-5 text-xl">Connect, Share and Earn</p>

            <ConnectKitButton label="Sign in" />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
