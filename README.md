This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First run npm install
Then run npm run dev to run the project

## DOCUMENTATION

-- implemented jwt using nextAuth jwt strategy. After logged in user jwt will be valid for 5 minutes if user is inactive within that timeframe they will be logged out. If user interacts within 5 minutes token will be automatically refreshed.
-- As per requirement api/users routes are protected. The create new user api is also protected for that reason. Some apps need this strategy cause they will provide clients their user/password and no one outside admin is able to create user. Assuming this scenario i implemented my logic.
As i've used prisma with sqlite i'm created a workaround to create the admin user upon login with right credentials if it's not created yet.
-- Credentials:
email: admin@test.com
password: admin
-- How to verify jwt is working : remove next-auth.session-token value from browsers token and refresh the page you'll be loggedout. Insepct the page go to Application - here you'll find cookies. Inside that you'll find the token. I approach this strategy to store token in coookies and retrieve it as it's safe. No other 3rd party won't be able to access it where if you store it in localstorage there's a possibilty that someone can access this token.
-- Webhook is also cheking if the x-signature matches. You can access the webhook using postman. Add x-signature as a header in postman and put the value there. The HMAC is sha256.Please be careful and check that the provided json and the json you use for signature creation is same.Every space matters. The endpoint is /api/webhook(POST)

--IMPORTANT: RUN THE PROJECT IN PORT 3000

--put these value in .env
WEBHOOK_SECRET="b24a718b6a9fd9435969f9d0d90a6b849c12b15776850e27f65050860e256c65"
NODE_ENV="development"
JWT_SECRET="96bb93ee714439d9a8c4105751920406750c2ca74825e19a666130045539e377"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="96bb93ee714439d9a8c4105751920406750c2ca74825e19a666130045539e377"

## Happy Coding
