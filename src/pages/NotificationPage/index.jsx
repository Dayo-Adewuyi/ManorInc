import React, { useState, useEffect } from "react";
import BaseLayout from "../../Components/BaseLayout";
import Notifications from "./components/Notifications";
import { ethers } from "ethers";
import { contract_abi, contract_address } from "../../constants/constants";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [likeNotifications, setLikeNotifications] = useState([]);

  const getNotifications = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.hyperspace.node.glif.io/rpc/v1"
    );
    const contract = new ethers.Contract(
      contract_address,
      contract_abi,
      provider
    );

    const endBlock = await provider.getBlockNumber();
    const startBlock = endBlock - 1000;

    const filter = contract.filters.CommentCreated(
      null,
      null,
      null,
      null,
      null
    );
    const logs = await provider.getLogs({
      fromBlock: startBlock,
      toBlock: endBlock,
      address: contract_address,
      topics: filter.topics,
    });

    const parsedLogs = logs.map((log) => {
      return contract.interface.parseLog(log);
    });

    setNotifications(parsedLogs);
  };

  const getLikeNotifications = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.hyperspace.node.glif.io/rpc/v1"
    );
    const contract = new ethers.Contract(
      contract_address,
      contract_abi,
      provider
    );

    const endBlock = await provider.getBlockNumber();
    const startBlock = endBlock - 1000;

    const filter = contract.filters.PostLiked(null, null, null);
    const logs = await provider.getLogs({
      fromBlock: startBlock,
      toBlock: endBlock,
      address: contract_address,
      topics: filter.topics,
    });

    const parsedLogs = logs.map((log) => {
      return contract.interface.parseLog(log);
    });

    setLikeNotifications(parsedLogs);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    getLikeNotifications();
  }, []);

  console.log(notifications);

  return (
    <>
      <BaseLayout
        mainComponent={notifications?.map((notification) => {
          return (
            <>
              <Notifications
                postAuthor={notification.args.author}
                postText={notification.args.content}
                // postContractAddress={notification.args[2]}
                // postTimestamp={notification.args[3]}
              />
            </>
          );
        })}
        activePage="Notifications"
      />
    </>
  );
}

export default NotificationsPage;
