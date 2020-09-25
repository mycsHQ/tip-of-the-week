import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as s3 from '@aws-cdk/aws-s3';
import * as ecs from '@aws-cdk/aws-ecs';

export class TestCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const vpc = new ec2.Vpc(this, 'mycsVpc', {
      cidr: '10.0.0.0/16',
      maxAzs: 2
    });

    const bucket = new s3.Bucket(this, 'mycsBucket', {
      publicReadAccess: true,
    });

    const ecsCluster = new ecs.Cluster(this, 'mycsCluster', {})

    ecsCluster.addCapacity('DefaultCapacity', {
      instanceType: new ec2.InstanceType('t2.xlarge'),
      desiredCapacity: 3
    });

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'taskDef');

    taskDefinition.addContainer('container', {
      image: ecs.ContainerImage.fromRegistry('hello-world'),
      memoryLimitMiB: 512
    });

    new ecs.Ec2Service(this, 'service', {
      cluster: ecsCluster,
      taskDefinition: taskDefinition
    })

  }
}
