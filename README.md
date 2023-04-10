# AWS Application Composer Basic API

This project contains source code and supporting files for an example serverless application that you can deploy with the [AWS Serverless Application Model (AWS SAM) command line interface (CLI)](https://aws.amazon.com/serverless/sam/). It includes the following files and folders:

- [`src`](./src/) - Code for the application's Lambda function.
- [`template.yaml`](./template.yaml) - A template that defines the application's AWS resources.
- [`samconfig.toml`](./samconfig.toml) - A file that sets some default SAM CLI parameters to help you get started.

The application uses several AWS resources, including [AWS Lambda Functions](https://aws.amazon.com/lambda/), an [Amazon API Gateway REST API](https://aws.amazon.com/api-gateway/), and an [Amazon DynamoDB Table](https://aws.amazon.com/dynamodb/). These resources are defined in the [`template.yaml`](./template.yaml) file in this project. You can use the [SAM CLI](https://aws.amazon.com/serverless/sam/) to deploy and iterate on the Lambda function code and use AWS Application Composer to view and extend this application's architecture.

You can also use an integrated development environment (IDE) to develop your application with AWS IDE Toolkits. The AWS Toolkit is an open-source plugin for popular IDEs that uses the AWS SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds step-through debugging for Lambda function code. 

To get started with an IDE toolkit, see one of the following for your favorite IDE:

* [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
* [CLion](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [GoLand](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [WebStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [Rider](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [PhpStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [RubyMine](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [DataGrip](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

## Deploy the sample application

The [AWS SAM CLI](https://aws.amazon.com/serverless/sam/) provides functionality for building and testing serverless applications. It makes it easy to sync your changes to your deployment in AWS for rapid development.

To use the [AWS SAM CLI](https://aws.amazon.com/serverless/sam/), you need the following:

* An AWS Account - Create an account at https://aws.amazon.com
* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js](https://nodejs.org/en/), including the npm package management tool.

To build and deploy your application for the first time, run the following in your shell:

```bash
$ sam build
$ sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to your AWS account, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name. The default for this project is `aws-app-composer-basic-api`.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. This prompt acknowledges your permission to create IAM Roles as part of the deployment.
* **Disable rollback**: By default if a deployment fails all new changes as part of the deployment will be rolled back. You can change this behavior to leave the deployment in a partial state for debugging purposes.
* **\<Route\> may not have authorization defined, is this okay?**: Each route in this example is unauthorized for simplicity. To deploy, confirm it is ok that each route does not have authorization. Authorization can be added later at any time.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved / updated to the [`samconfig.toml`](./samconfig.toml) configuration file inside the project, so that in the future you can just re-run `sam deploy` and other commands without parameters to deploy changes to your application.

Open the [**Applications**](https://console.aws.amazon.com/lambda/home#/applications) page of the Lambda console, and choose your application. When the deployment completes, view the application resources at the bottom of the **Overview** tab to see the new resources. You can find the new API Gateway REST API endpoint by expanding the *Api* resource row and copying the *API endpoint* link in the *Physical ID* column of the resource table. Try clicking through each of the resource links to see details of each Lambda Function and to see explore items in the DynamoDB Table once you start creating them with the `POST /items` API route.

Here's a quick cURL command to get you started creating a few items:

```bash
$ curl -d '{"type": "Car", "color": "Blue"}' <endpoint URL>/items
$ curl -d '{"type": "Animal", "name": "Giraffe"}' <endpoint URL>/items
$ curl -d '{"type": "Product", "name": "AWS Application Composer", "favorite": true}' <endpoint URL>/items
```

After creating a few items go back to the [**Applications**](https://console.aws.amazon.com/lambda/home#/applications) overview, navigate to the *Items* DynamoDB Table, and explore the items you just created.

## Use the AWS SAM CLI to build and test locally

Build your application by using the `sam build` command.

```bash
$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

The AWS SAM CLI can emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```bash
$ sam local start-api
$ curl http://localhost:3000/items
```

## Add a resource to your application using AWS Application Composer
You can load this project in [AWS Application Composer](https://console.aws.amazon.com/composer/canvas) to continue architecting your application. Select this folder as the *Project Location*, then select the [`template.yaml`](./template.yaml) file. The architecture of this application will load into the canvas where you can modify the configuration of resources and add/remove resources and connections.

The application template uses AWS SAM to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources, such as functions, triggers, and APIs. If a resource you want to use is not available in the [AWS Application Composer](https://console.aws.amazon.com/composer/canvas) you can manually add it in its *Code* view or use your favorite local editor or IDE to modify the [`template.yaml`](./template.yaml) file. You can use resources that are included in the [AWS SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md) and the standard [AWS CloudFormation resource types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

After making changes to your application, deploy the updated application:

```bash
$ sam deploy
```

Once again, open the [**Applications**](https://console.aws.amazon.com/lambda/home#/applications) page of the Lambda console, and choose your application. When the deployment completes, view the application resources on the **Overview** tab to see the new resource.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, the AWS SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs that are generated by your Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

```bash
$ sam logs --name ListItems --tail
```

**NOTE:** The `name` argument refers to the *Logical ID* of a Lambda Function within the stack.

You can find more information and examples about filtering Lambda function logs in the [AWS SAM CLI documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Cleanup

You can run the following command to cleanup (delete) all the resources created for this application in your AWS Account:

```bash
$ sam delete
```