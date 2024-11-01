import Image from "next/image";
import { PhygitalType } from "@/types/types";
import { useAccount } from "wagmi"; 
import { Avatar } from "@readyplayerme/visage";


const formatDate = () => {
  const now = new Date(Date.now());
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  
  return `${day} /${month}/ ${year}`;
};

const formatDateFromISO = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day} /${month}/ ${year}`;
};


export const ProvenanceAttestation = ({phygital, avatarModel, showAttestation}: {phygital: PhygitalType, avatarModel: string, showAttestation: () => void}) => {
  const { address } = useAccount()

  const removePrefix = (uri: string) => {
		return uri?.substring(7, uri.length)
	}

  return (
  <div className="py-8 px-12 bg-white shadow-md">
    <div className="flex justify-between mb-4">
      <div className="pr-4">
        <h1 className="text-2xl font-bold">Provenance Attestation</h1>
        <p className="text-sm">This certificate confirms the authenticity of the product and provides a verifiable record of its provenance on the blockchain.</p>
      </div>
     <div className="basis-2/6"> 
        <p className="text-sm">Date: {formatDate()}</p>
        <p className="text-xs">Base Network</p>
     </div>
    </div>
    <div className="flex items-center gap-4">
      <Image src={`https://nftstorage.link/ipfs/${removePrefix(phygital.image)}`} alt="phygital image" width={200} height={200} />
      <div className="text-sm grid gap-2">
        <h2 className="text-lg font-bold">{phygital.name}</h2>
        <p>Unique piece</p>
        <p>Created by: {phygital.brand_name}</p>
        <p>Owned by: {address}</p>
        <p>Date purchased: 20 / 10 / 2024</p>
        <p>0.01 ETH</p>
      </div>
    </div>
    <hr className="my-8" />
    <div className="flex gap-4">
      <div className="basis-5/6 pr-4">
        <h3 className="text-lg font-bold mb-4">Product Description</h3>
        <p className="text-base">{phygital.description}</p>
      </div>
      <div className="h-[12rem] w-[6rem]">
        <h4 className="text-center font-bold ">Avatar</h4>
        <Avatar modelSrc={avatarModel} cameraInitialDistance={3} className="bg-neutral-950" />
      </div>
    </div>
    <hr className="my-8" />
    <div className="my-4">
      <h3 className="text-lg font-bold">NFT Details</h3>
      <div className="mt-4">
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Token ID</p>
          <p className="text-right">{phygital.id}</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Token Standard</p>
          <p className="text-right">ERC-721A</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Chain</p>
          <p className="text-right">Base Network</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Date created</p>
          <p className="text-right">{formatDateFromISO(phygital.created_at)}</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Last sale</p>
          <p className="text-right">20/10/2024</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Last updated</p>
          <p className="text-right">{formatDateFromISO(phygital.updated_at)}</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Creator Earnings </p>
          <p className="text-right">5 %</p>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <p>Contract Address
          </p>
          <p className="text-right">{phygital.contract_address}</p>
        </div>
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-8">
      <button className="bg-[#30D8FF] text-black px-4 py-2 rounded-md">Print</button>
      <button className="bg-[#30D8FF] text-black px-4 py-2 rounded-md cursor-pointer" onClick={showAttestation}>Close</button>
    </div>
  </div>);
};