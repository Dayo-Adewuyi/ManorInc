import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { nft_abi } from "../../../constants/constants";
import { AppContext } from "../../../context/AppContext";
function VideoContent({ subscription }) {
  const { address } = useContext(AppContext);
  const [bal, setBal] = useState(0);

  const balanceOf = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        subscription?.contractAddress,
        nft_abi,
        signer
      );
      const balance = await contract.balanceOf(address);
      const bal = Number(ethers.utils.formatEther(balance));

      setBal(bal);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    balanceOf();
  }, []);

  const walletAddressFormatter = (str) => {
    const begin = str.substring(0, 7);
    const end = str.slice(-4);
    return `${begin}****${end}`;
  };
  console.log(bal);

  return (
    <>
      {bal ? (
        <div className="w-[22.5%]">
          <video
            src={`https://gateway.lighthouse.storage/ipfs/${subscription?.videoHash}`}
            type="video/mp4"
            controls
            muted
            autoPlay={"autoplay"}
            preLoad="auto"
            loop
            alt=""
            className="rounded-t-[14px] w-[full] h-auto mb-[9px]"
          />
          <h3 className="font-semibold text-[18px] leading-[23px] mb-[0]">
            {subscription?.title}
          </h3>
          <h3 className="font-semibold text-[14px] text-gray-400 mb-[0]">
            {walletAddressFormatter(subscription?.author)}
          </h3>
          <div className="flex gap-[4px] items-center">
            <h2 className="font-semibold text-gray-400 text-[14px]"></h2>
            <div className="w-[25px] h-[25px] text-gray-400 rounded-full"></div>
            <h2 className="font-semibold text-gray-400 text-[14px]">
              {subscription?.timestamp}
            </h2>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

export default VideoContent;
