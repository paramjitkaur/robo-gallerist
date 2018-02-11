export default {
  s3: {
    BUCKET: "notez-app-uploads"
  },
  apiGateway: {
    URL: "https://5jts0d2x3g.execute-api.us-east-1.amazonaws.com/prod",
    REGION: "us-east-1"
  },
  cognito: {
    USER_POOL_ID: "us-east-1_wD7hZ8LH1",
    APP_CLIENT_ID: "7pnne527h6quf5bvjditafaick",
    REGION: "us-east-1",
    IDENTITY_POOL_ID: "us-east-1:11702199-50da-42bf-a002-08c8d469c8cf",
  },
  MAX_ATTACHMENT_SIZE: 5000000
};
