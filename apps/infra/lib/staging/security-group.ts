import { SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export const ecsSG = (scope: Construct, vpc: Vpc) => {
  const sg = new SecurityGroup(scope, "allow-all-outbound-sg", {
    vpc,
    allowAllOutbound: true,
    allowAllIpv6Outbound: true,
  });

  return sg;
};
