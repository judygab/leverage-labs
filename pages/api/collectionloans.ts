// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const addressToNameMap = {
  "0xbd3531da5cf5857e7cfaa92426877b022e612cf8": "Pudgy Penguins",
  "0xed5af388653567af2f388e6224dc7c4b3241c544": "Azuki",
  "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "BAYC",
  "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258": "OTHR",
  "0x5af0d9827e0c53e4799bb226655a1de152a425a5": "Milady",
  "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949": "Beanz",
  "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b": "CloneX",
  "0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab": "Test NFT",
  "0x60e4d786628fea6478f785a6d7e704777c86a7c6": "MAYC",
  "0x8821bee2ba0df28761afff119d66390d594cd280": "DeGods",
  "0xb6a37b5d14d502c3ab0ae6f3a0e058bc9517786e": "Elemental",
  "0x3af2a97414d1101e2107a70e7f33955da1346305": "MBEAN",
  "0xacf63e56fd08970b43401492a02f6f38b6635c91": "Kanpai Pandas",
  "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623": "BAKC",
};

// Function to get the name for a given address
function getNameByAddress(address) {
  return addressToNameMap[address] || "Unknown"; // Default to "Unknown" if address not found
}

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

  // Calculate the Unix timestamp of 1 week ago
  const timeFilter = currentTimestamp - 7 * 24 * 60 * 60;

  const graphqlQuery = `
  {
    liens(where: { 
      or: [
        { repayTime_not: null },
        { seizeTime_not: null }
      ]
    }) {
      id
      collection
      tokenId
      borrower
      latestLoan: loans(orderBy: startTime, first: 1, orderDirection: desc) {
        id
        lienId
        lender
        loanAmount
      }
      repayTime
      seizeTime
      timeStarted
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

  // Send the GraphQL query
  axios(graphQLRequest)
    .then((response) => {
      const queryResult = response.data.data;

      // Filter items that either have seizeTime or repayTime
      const filteredLiens = queryResult.liens.filter((lien) => {
        return lien.seizeTime !== null || lien.repayTime !== null;
      });

      // Create a new field called endTime based on the available value
      filteredLiens.forEach((lien) => {
        lien.endTime =
          lien.seizeTime !== null ? lien.seizeTime : lien.repayTime;
        delete lien.seizeTime; // Optionally, you can remove seizeTime and repayTime if needed
        delete lien.repayTime;
      });

      const loanDurationsByCollection = {};

      // Iterate through filteredLiens to calculate loan durations and group them by collection
      filteredLiens.forEach((lien) => {
        const collection = lien.collection;

        if (!loanDurationsByCollection[collection]) {
          loanDurationsByCollection[collection] = [];
        }

        if (lien.endTime) {
          // Calculate the duration in seconds
          const durationInSeconds = lien.endTime - lien.timeStarted;
          loanDurationsByCollection[collection].push(durationInSeconds);
        }
      });

      // Calculate the average duration for each collection
      const collectionArray = [];
      const averageDurations = [];

      for (const collection in loanDurationsByCollection) {
        const durations = loanDurationsByCollection[collection];
        const totalDuration = durations.reduce(
          (acc, duration) => acc + duration,
          0
        );
        const averageDuration = (
          totalDuration /
          durations.length /
          3600
        ).toFixed(1);

        collectionArray.push(getNameByAddress(collection));
        averageDurations.push(averageDuration);
      }

      // Now 'collectionArray' contains the collection names,
      // and 'averageDurations' contains the corresponding average durations

      console.log("Collection Array:", collectionArray);
      console.log("Average Durations:", averageDurations);
      res.status(200).json({ data: { collectionArray, averageDurations } });
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    });
}
