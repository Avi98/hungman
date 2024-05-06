# Infrastructure for AWS.

This is the basic app for creating AWS infra use AWS CDK

Important thing to note `AWS CLI` should be configured. Verify `AWS CLI` before making any api call using

```shell
aws --profile [profile-name] sts get-caller-identity --query "Account" --output json
```

If the `AWS CLI` is configured. Output should be returned

## AWS CDK

1. `CDK --profile [name] synth` will generate cloudformation template.
1. `CDK --profile [name] diff` will generate cloudformation template diff.
1. `CDK --profile [name] deploy` will push cloudformation template to aws cloud.
1. `CDK --profile [name] destroy` will delete cloudformation template.
