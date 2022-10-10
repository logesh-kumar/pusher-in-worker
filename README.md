# pusher-in-worker - WIP
## A Realtime todo app built with react, react-query, nodejs, pusher, prisma and sqlite

## To run the app, you need to run server and client seperately
- Install pnpm to handle dependencies https://pnpm.io/installation
- Create and configure .env files in both server and ui folder. You can make use of the .env.example files. 

### To run the nodejs server, Run the following commands
 ```sh
  pnpm i #Installs all dependencies 
  pnpm db #Run db migrations
  pnpm start  #Start the server
 ```
 
 ### To run the react client, Run the following commands
 ```sh
  pnpm i #Installs all dependencies 
  pnpm dev #Start the client
 ```

### You can see the pusher websocket connected from within a web worker. The gear icon denotes its from worker.
<img width="1511" alt="Screen Shot 2022-10-09 at 11 56 13 PM" src="https://user-images.githubusercontent.com/1032318/194773364-26384d26-443b-4364-8c4b-f77384307a6a.png">

