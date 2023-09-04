import { EventBridgeClient, PutRuleCommand, PutRuleCommandInput, PutTargetsCommand, PutTargetsCommandInput } from "@aws-sdk/client-eventbridge";
import * as moment from 'moment';

const REGION = process.env.REGION; //e.g. "us-east-1"

export const createRuleMakePost = async (userCampaignId: number, scheduledPostDate: Date) => {
    const ebClient = new EventBridgeClient({
        region: REGION, credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        }
    });

    const ruleName = `CHANGE_STATUS_TO_MAKE_POST_USERCAMPAIGN_${userCampaignId}`;
    const params: PutRuleCommandInput = {
        Name: ruleName,
        ScheduleExpression: `cron(${moment.utc(scheduledPostDate).format("mm HH DD M ? YYYY")})`,
        State: "ENABLED"
    };
    try {
        const newRule = new PutRuleCommand(params);
        const data = await ebClient.send(newRule);
        console.log("Success, scheduled rule created; Rule ARN:", data);

        const inputPutTargetsCommnand: PutTargetsCommandInput = {
            Rule: ruleName,
            Targets: [
                {
                    Arn: "arn:aws:events:us-east-1:668983805369:api-destination/Make-Post/1df220ca-38b8-4f99-9a25-f2010f667dc2",
                    Id: "Make-Post-Id",
                    RoleArn: "arn:aws:iam::668983805369:role/service-role/Amazon_EventBridge_Invoke_Api_Destination_482356070",
                    HttpParameters: {
                        QueryStringParameters: {
                            "id": userCampaignId.toString(),
                        }
                    },
                }
            ]
        }

        const command = new PutTargetsCommand(inputPutTargetsCommnand);
        const dataTarget = await ebClient.send(command);
        return dataTarget; // For unit tests.
    } catch (err) {
        console.log("Error", err);
        return err;
    }
}

export const createRuleUploadScreenshots = async (userCampaignId: number) => {
    const ebClient = new EventBridgeClient({
        region: REGION, credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        }
    });

    const ruleName = `CHANGE_STATUS_TO_UPLOAD_SCREENSHOTS_USERCAMPAIGN_${userCampaignId}`;
    const params: PutRuleCommandInput = {
        Name: ruleName,
        ScheduleExpression: `cron(${moment.utc().add(2, "minutes").format("mm HH DD M ? YYYY")})`,
        State: "ENABLED"
    };

    try {
        const newRule = new PutRuleCommand(params);
        const data = await ebClient.send(newRule);
        console.log("Success, scheduled rule created; Rule ARN:", data);

        const inputPutTargetsCommnand: PutTargetsCommandInput = {
            Rule: ruleName,
            Targets: [
                {
                    Arn: "arn:aws:events:us-east-1:668983805369:api-destination/Change-status-to-upload-screenshots/8f7f309b-b2db-474c-b284-66bb269d2ad1",
                    Id: "Change-status-to-upload-screenshots",
                    RoleArn: "arn:aws:iam::668983805369:role/service-role/Amazon_EventBridge_Invoke_Api_Destination_713598184",
                    HttpParameters: {
                        QueryStringParameters: {
                            "id": userCampaignId.toString(),
                        }
                    },
                }
            ]
        }

        const command = new PutTargetsCommand(inputPutTargetsCommnand);
        const dataTarget = await ebClient.send(command);
        return dataTarget; // For unit tests.
    } catch (err) {
        console.log("Error", err);
        return err;
    }
}

export const createRule24HReminder = async (userCampaignId: number) => {
    const ebClient = new EventBridgeClient({
        region: REGION, credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        }
    });

    const ruleName = `24H_REMINDER_TO_UPLOAD_SCREENSHOTS_USERCAMPAIGN_${userCampaignId}`;
    const params: PutRuleCommandInput = {
        Name: ruleName,
        // TODO Cambiar a 24 H despues
        ScheduleExpression: `cron(${moment.utc().add(2, "minutes").format("mm HH DD M ? YYYY")})`,
        State: "ENABLED"
    };

    try {
        const newRule = new PutRuleCommand(params);
        const data = await ebClient.send(newRule);
        console.log("Success, scheduled rule created; Rule ARN:", data);

        const inputPutTargetsCommnand: PutTargetsCommandInput = {
            Rule: ruleName,
            Targets: [
                {
                    Arn: "arn:aws:events:us-east-1:668983805369:api-destination/24H-reminder-to-upload-screenshots/859b03c9-2393-4b4d-b4f2-3a79fe0cf594",
                    Id: "24H-Reminder-To-Upload-Screenshots",
                    RoleArn: "arn:aws:iam::668983805369:role/service-role/Amazon_EventBridge_Invoke_Api_Destination_451716610",
                    HttpParameters: {
                        QueryStringParameters: {
                            "id": userCampaignId.toString(),
                        }
                    },
                }
            ]
        }

        const command = new PutTargetsCommand(inputPutTargetsCommnand);
        const dataTarget = await ebClient.send(command);
        return dataTarget; // For unit tests.
    } catch (err) {
        console.log("Error", err);
        return err;
    }
}

export const createRule72HReminder = async (userCampaignId: number) => {
    const ebClient = new EventBridgeClient({
        region: REGION, credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
        }
    });

    const ruleName = `72H_REMINDER_TO_UPLOAD_SCREENSHOTS_USERCAMPAIGN_${userCampaignId}`;
    const params: PutRuleCommandInput = {
        Name: ruleName,
        // TODO Cambiar a 48 H despues
        ScheduleExpression: `cron(${moment.utc().add(2, "minutes").format("mm HH DD M ? YYYY")})`,
        State: "ENABLED"
    };

    try {
        const newRule = new PutRuleCommand(params);
        const data = await ebClient.send(newRule);
        console.log("Success, scheduled rule created; Rule ARN:", data);

        const inputPutTargetsCommnand: PutTargetsCommandInput = {
            Rule: ruleName,
            Targets: [
                {
                    Arn: "arn:aws:events:us-east-1:668983805369:api-destination/72H-reminder-to-upload-screenshots/36091892-368b-46ec-87b0-681dcb93d01e",
                    Id: "72H-Reminder-To-Upload-Screenshots",
                    RoleArn: "arn:aws:iam::668983805369:role/service-role/Amazon_EventBridge_Invoke_Api_Destination_887477041",
                    HttpParameters: {
                        QueryStringParameters: {
                            "id": userCampaignId.toString(),
                        }
                    },
                }
            ]
        }

        const command = new PutTargetsCommand(inputPutTargetsCommnand);
        const dataTarget = await ebClient.send(command);
        return dataTarget; // For unit tests.
    } catch (err) {
        console.log("Error", err);
        return err;
    }
}