// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "POST") {
  //   throw new ReferenceError("Method not allowed");
  // }

  // const notificationPayload = req.body;
  // if (!notificationPayload) {
  //   return res.status(400).json({ success: false });
  // }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Calculate the Unix timestamp of X minutes ago
  const timeFilter = currentTimestamp - 600 * 60;

  const graphqlQuery = `
{
  liens(
    orderBy: auctionStarted
    orderDirection: desc
    where: {auctionStarted_gt: "${timeFilter}"}
  ) {
    auctionStarted
    id
    collection
    borrower
    tokenId
  }
}
`;

  const graphQLRequest = {
    method: "post",
    url: "https://api.studio.thegraph.com/query/53192/blend/0.0.26",
    data: {
      query: graphqlQuery,
    },
  };

  try {
    const result = await axios(graphQLRequest);
    const data = result.data.data;

    res.status(200).json({ data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message ?? "Internal server error",
    });
  }
}
