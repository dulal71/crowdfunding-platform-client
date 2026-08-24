"use client";
import { authClient } from "@/app/lib/auth-client";
import createDonation from "@/app/lib/service/createDonation";
import { ICampaign } from "@/types/campaign";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaHandHoldingHeart } from "react-icons/fa";
import { TbCurrencyYen } from "react-icons/tb";

interface Props {
  campaign: ICampaign;
}
const ContributeButton = ({campaign}: Props) => {
  console.log(campaign);
  const {minimum_Contribution: minimumAmount}=campaign
      const[error,setError]=useState<string>("")
      const [donationCredit,setDonationCredit]=useState<number>(0)
  const { data: session } = authClient.useSession();
      const user=session?.user
   

      const handleAmountChange = (value: string) => {
    const amount = Number(value);

    setDonationCredit(amount);

    if (!value) {
      setError("");
      return;
    }

    setError(validateDonation(amount));
  };

 const validateDonation = (amount: number) => {
    if (amount <= 0) {
      return "Please enter a valid donation amount";
    }

    if (amount < minimumAmount) {
      return `Minimum donation amount is $${minimumAmount}`;
    }

    if (!user) {
      return "Please login to make a donation";
    }

    if (user.credits < amount) {
      return "Insufficient credits";
    }

    return "";
  };




   const handleDonate = async () => {
    const validationError = validateDonation(donationCredit);

    if (validationError) {
      setError(validationError);
      return;
    }
    if (!user) {
    setError("Please login to make a donation");
    return;
  }

     const payload={
      supporterName:user.name,
      supporterEmail:user.email,
    campaignId:campaign._id  ,
    creatorId:campaign.user_id,
    supporterId:user.id,
    amount:donationCredit,
    status: "PENDING",
}

try{
const res =  await createDonation(payload)
if(res.data.insertedId){
  toast.success("Donation submitted and is pending approval");
}
}catch(error){
toast.error("Failed to submit donation");
}

    
  };
    return (
          <Modal>
      <Button variant="ghost" className={"w-full text-center text-primary-light border border-primary-light hover:bg-primary-light hover:text-white text-md"}>Donate Now</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
               <Modal.Header>
  <Modal.Icon className="bg-primary text-white hover:bg-primary-light">
    < FaHandHoldingHeart className="size-5" />
  </Modal.Icon>

  <Modal.Heading className="text-primary-light">Make a Contribution</Modal.Heading>

  <p className="mt-1.5 text-sm leading-5 text-muted">
  Support this campaign by entering your contribution amount below.
  Minimum contribution:{" "}
  <span className="text-primary-light font-semibold ">
    ${minimumAmount}.
  </span>
</p>
</Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label className="text-primary-light">Name</Label>
                    <Input placeholder="Enter your name" value={user?.name || ""} />
                  </TextField>
                  <TextField className="w-full" name="email" value={user?.email || ""} type="email" variant="secondary">
                    <Label className="text-primary-light">Email</Label>
                    <Input placeholder="Enter your email" />
                  </TextField>
                  
                  
                 <TextField
                    className="w-full"
                    name="donationCredit"
                    variant="secondary"
                  >
                    <Label className="text-primary-light">Amount</Label>

                    <Input
                      type="number"
                      value={donationCredit || ""}
                      onChange={(e) =>
                        handleAmountChange(e.target.value)
                      }
                      min={minimumAmount}
                      placeholder={`Enter amount (minimum ${minimumAmount})`}
                    />

                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        {error}
                      </p>
                    )}
                  </TextField>
                 
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" className={"text-primary-light"} variant="secondary">
                Cancel
              </Button>
              <Button onClick={()=>handleDonate()} slot="close"  className={"bg-primary hover:bg-primary-light"}>Confirm</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    );
};

export default ContributeButton;