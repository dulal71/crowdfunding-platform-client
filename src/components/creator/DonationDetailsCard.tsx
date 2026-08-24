"use client";

import { ICampaign } from "@/types/campaign";
import { Button, Card, CardHeader } from "@heroui/react";
import { FaCheckCircle, FaUser, FaEnvelope, FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";

interface Donation {
  _id: string;
  amount: number;
  campaignId: string;
  creatorId: string;
  supporterId: string;
  supporterName: string;
  supporterEmail: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
}

interface Props {
  donation: Donation;
  campaign:ICampaign
 
}

export default function DonationDetailsCard({
  donation,
  campaign
  
}: Props) {

     const {
    campaign_title,
    
    createdAt,
    deadline,
    funded_amount,
    funding_goal,
    minimum_Contribution,
    reward_info,
    status,
    user_name,
    user_email,
  } = campaign;  
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Card className="w-full bg-white shadow-md">
        <CardHeader className="flex flex-col items-start gap-1">
          <h2 className="text-xl text-primary font-bold">
            Donation Details
          </h2>

          
        </CardHeader>

       

        <Card.Content className="gap-5">

          {/* Amount */}
          <div className="flex items-center justify-between rounded-xl bg-default-100 p-4">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-xl text-accent" />

              <div>
                <p className="text-sm text-primary">
                  Donation Amount
                </p>

                <p className="text-2xl text-accent font-bold">
                  ${donation.amount}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                donation.status === "PENDING"
                  ? "bg-yellow-500 text-warning-700"
                  : donation.status === "ACCEPTED"
                  ? "bg-green-500 text-success-700"
                  : "bg-accent text-danger-700"
              }`}
            >
              {donation.status}
            </span>
          </div>

          {/* Supporter */}
          <div>
            <p className="mb-2 text-sm font-semibold text-primary">
              Supporter Information
            </p>

            <div className="space-y-3 rounded-xl border border-text-muted p-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-accent" />

                <div>
                  <p className="text-sm text-primary">
                    Name
                  </p>

                  <p className="font-medium text-text">
                    {donation.supporterName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-accent"/>

                <div>
                  <p className="text-sm text-primary">
                    Email
                  </p>

                  <p className="font-medium text-text">
                    {donation.supporterEmail}
                  </p>
                  
                </div>
                
              </div>
              <div className="flex items-center gap-3">
                <IoIosTime className="text-accent"/>

                <div>
                 <p className="text-sm text-primary">
              Donation Date
            </p>

                  <p className="font-medium text-text">
              {new Date(donation.createdAt).toLocaleString()}
            </p>
                  
                </div>
                
              </div>

              
            </div>
          </div>

          {/* Campaign */}
          <div>
            <p className="mb-2 text-sm font-semibold text-primary">
              Campaign Information
            </p>

            <div className="space-y-3 rounded-xl border border-text-muted p-4">
              <div className="flex items-center gap-3">
                
                <div>
                  <p className="text-sm text-primary">
                    Campaign Title
                  </p>

                  <p className="font-medium text-text">
                    {campaign_title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                

                <div>
                  <p className="text-sm text-primary">
                    Funding Goal
                  </p>

                  <p className="font-medium text-text">
                    ${funding_goal}
                  </p>
                  
                </div>
                
                
              </div>
              <div>
                  <p className="text-sm text-primary">
                    Funding Amount
                  </p>

                  <p className="font-medium text-text">
                   ${funded_amount}
                  </p>
                  
                </div>
              <div>
                  <p className="text-sm text-primary">
                    Minimum Contribution
                  </p>

                  <p className="font-medium text-text">
                   ${minimum_Contribution}
                  </p>
                  
                </div>
              
               <div className="flex items-center gap-3">
                

                <div>
                 <p className="text-sm text-primary">
              Donation Deadline
            </p>

                  <p className="font-medium text-text">
              {new Date(deadline).toLocaleString()}
            </p>
                  
                </div>
                
              </div>
              
            </div>
          </div>

          {/* Date */}
          

          {/* Accept */}
          {donation.status === "PENDING" && (
            <Button
            
              size="lg"
              className="w-full font-semibold bg-primary hover:bg-primary-light"
              
             
            >
              Accept Donation
            </Button>
          )}

        </Card.Content>
      </Card>
    </div>
  );
}