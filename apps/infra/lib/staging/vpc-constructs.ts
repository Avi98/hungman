import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export const egressVPC = (parent: Construct) =>
  new Vpc(parent, "Staging_hangman_VPC", {
    cidr: "10.0.1.0/26",
    enableDnsHostnames: false,
    subnetConfiguration: [
      {
        cidrMask: 28,
        name: "Public - EgressVPC SubNet",
        subnetType: SubnetType.PUBLIC,
      },
      {
        cidrMask: 28,
        name: "Private - EgressVPC SubNet",
        subnetType: SubnetType.PRIVATE_ISOLATED,
      },
    ],
  });
