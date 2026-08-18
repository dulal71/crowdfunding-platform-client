"use client";
import { authClient } from "@/app/lib/auth-client";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { FaHandHoldingHeart } from "react-icons/fa";

type Props = {
  minimumAmount: number;
};
const ContributeButton = ({minimumAmount}: Props) => {
      const { data: session } = authClient.useSession();
      const user=session?.user
      console.log(user);
    return (
          <Modal>
      <Button variant="secondary" className={"w-full text-center bg-primary hover:bg-primary-light text-white text-md"}>Contribute Now</Button>
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
                  
                  
                  <TextField className="w-full" name="message" variant="secondary">
                    <Label className="text-primary-light">Amount</Label>
                    <Input 
                    type="number"
                    min={minimumAmount}
                     placeholder={`Enter your Amount Minimum ${minimumAmount}`}/>
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" className={"text-primary-light"} variant="secondary">
                Cancel
              </Button>
              <Button slot="close" className={"bg-primary hover:bg-primary-light"}>Confirm</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    );
};

export default ContributeButton;