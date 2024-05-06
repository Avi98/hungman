import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Repository } from "aws-cdk-lib/aws-ecr";
import {
  Cluster,
  Compatibility,
  ContainerImage,
  FargateService,
  LogDriver,
  NetworkMode,
  TaskDefinition,
} from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";
import { ecsSG } from "./security-group";

const cluster = (scope: Construct, vpc: Vpc) =>
  new Cluster(scope, "hangman-staging-cluster", {
    clusterName: "hangman-staging-cluster",
    vpc,
  });

const taskDefinition = (scope: Construct) => {
  const task = new TaskDefinition(scope, "task-ecs", {
    family: "task",
    compatibility: Compatibility.FARGATE,
    cpu: "256",
    memoryMiB: "512",
    networkMode: NetworkMode.AWS_VPC,
  });

  const repository = Repository.fromRepositoryName(
    scope,
    "hangman-repository",
    "hangman"
  );
  task.addContainer("container", {
    image: ContainerImage.fromEcrRepository(repository, "web"),
    memoryLimitMiB: 512,
    environment: {
      // @todo: add environments here
    },
    logging: LogDriver.awsLogs({ streamPrefix: "hangman-fe-logs" }),
    portMappings: [{ containerPort: 3000 }],
  });
  return task;
};

export const ecsFargateService = (scope: Construct, vpc: Vpc) => {
  const fullAccessSG = ecsSG(scope, vpc);
  const fargateService = new FargateService(scope, "service", {
    cluster: cluster(scope, vpc),
    desiredCount: 1,
    taskDefinition: taskDefinition(scope),
    securityGroups: [fullAccessSG],
    assignPublicIp: true,
  });

  return fargateService;
};
