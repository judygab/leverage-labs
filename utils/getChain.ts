import chains from "../chains/chains";

const getChain = (chainId?: string) => {
  const chain = chains.find((chain) => chain.id === chainId);

  return chain;
};

export default getChain;
